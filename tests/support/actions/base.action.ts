import { BasePage } from "../../pages/base.page";
import { AppPagesEnum } from "../../shared/app-pages.enum";
import { ButtonTextEnum } from "../../shared/button-text.enum";
import { LoginApi } from "../../services/api-login";
import { Page } from 'playwright'; // Importar Page para manejar la página

export class BaseActions extends BasePage {
    private page: Page;
    private loginApi: LoginApi;

    constructor(page: Page) {
        super();
        this.page = page;
        this.loginApi = new LoginApi(page); // Pasar el objeto 'page' al crear LoginApi
    }

    async generateTokenAndAuthentication() {
        await this.loginApi.login();
        await this.loginApi.visitAuthenticated(process.env.AUTH_BASE_URL as string); // Playwright usa process.env para variables de entorno
    }

    // El resto de los métodos quedan iguales
    async goToThePage(option: string) {
        await this.page.waitForTimeout(1000); // Espera de 1 segundo (opcional)
        switch (option) {
            case AppPagesEnum.HOME:
                await this.page.locator(this.menuOptions).getByText('Home').click();
                break;
            case AppPagesEnum.MYACCOUNT:
                await this.page.locator(this.menuOptions).getByText('My Account').click();
                break;
            case AppPagesEnum.BANKACCOUNTS:
                await this.page.locator(this.menuOptions).getByText('Bank Accounts').click();
                break;
            case AppPagesEnum.NOTIFICATIONS:
                await this.page.locator(this.menuOptions).getByText('Notifications').click();
                break;
            default:
                throw new Error(`Wrong page option: ${option}`);
        }
    }

    async clickOnButton(option: string) {
        await this.page.waitForTimeout(1000); // Espera de 1 segundo (opcional)
        switch (option) {
            case ButtonTextEnum.NEXT:
                await this.page.locator(this.buttonOptions).getByText('Next').click({ force: true });
                break;
            case ButtonTextEnum.CREATE:
                await this.page.locator(this.buttonOptions).getByText('Create').click({ force: true });
                break;
            case ButtonTextEnum.DELETE:
                await this.page.locator(this.buttonOptions).getByText('Delete').click({ force: true });
                break;
            case ButtonTextEnum.SAVE:
                await this.page.locator(this.buttonOptions).getByText('Save').click({ force: true });
                break;
            case ButtonTextEnum.DISMISS:
                await this.page.locator(this.labelOptions).getByText('Notifications').click();
                break;
            case ButtonTextEnum.NEW:
                await this.page.locator(this.buttonOptions).getByText('New').click({ force: true });
                break;
            case ButtonTextEnum.PAY:
                await this.page.locator(this.buttonOptions).getByText('Pay').click({ force: true });
                break;
            case ButtonTextEnum.REQUEST:
                await this.page.locator(this.buttonOptions).getByText('Request').click({ force: true });
                break;
            default:
                throw new Error(`Wrong button option: ${option}`);
        }
    }
}