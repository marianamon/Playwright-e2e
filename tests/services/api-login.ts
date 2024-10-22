import { Page } from 'playwright';

export class LoginApi {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async login() {
        console.log("🔐 Authenticating ...");

        const response = await this.page.request.post(process.env.AUTH_URL as string, {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                audience: process.env.AUTH_AUDIENCE,
                grant_type: 'password',
                client_id: process.env.AUTH_CLIENT_ID,
                client_secret: process.env.AUTH_CLIENT_SECRET,
                scope: 'openid profile email',
                username: process.env.AUTH_USERNAME,
                password: process.env.AUTH_PASSWORD
            }
        });

        const responseBody = await response.json();
        const { access_token } = responseBody;

        const tokenData = {
            body: {
                access_token: access_token,
                scope: 'openid email profile',
                expires_in: 86400,
                token_type: 'Bearer',
                audience: 'playwright',
                oauthTokenScope: 'openid profile email',
                client_id: process.env.AUTH_CLIENT_ID
            },
            expiresAt: Math.floor(Date.now() / 1000) + 86400
        };

        await this.page.evaluate((tokenData) => {
            localStorage.setItem('auth_token', JSON.stringify(tokenData));
            window.dispatchEvent(new Event('storage'));
        }, tokenData);

        console.log('Access token received and stored in local storage:', tokenData);
    }

    public async visitAuthenticated(url: string) {
        // Obtener el token desde el localStorage
        const tokenString = await this.page.evaluate(() => localStorage.getItem('auth_token'));

        if (tokenString) {
            const tokenData = JSON.parse(tokenString);

            if (tokenData && tokenData.body && tokenData.body.access_token) {
                console.log('Access token found in local storage:', tokenData.body.access_token);

                await this.page.goto(url, {
                    waitUntil: 'networkidle'
                });

                await this.page.evaluate((tokenData) => {
                    localStorage.setItem('auth_token', JSON.stringify(tokenData));
                    window.dispatchEvent(new Event('storage'));
                }, tokenData);

            } else {
                console.log('No valid access token found, redirecting to login.');
            }
        } else {
            console.log('No access token found in local storage.');
        }

        // Simulación de autenticación manual si no hay token
        await this.page.fill('.auth0-lock-input:first-of-type', process.env.AUTH_USERNAME as string);
        await this.page.fill('.auth0-lock-input:last-of-type', process.env.AUTH_PASSWORD as string);
        await this.page.click('.auth0-lock-submit');

        // Esperar a que la URL sea la esperada después de autenticarse
        await this.page.waitForURL(url);
    }
}

