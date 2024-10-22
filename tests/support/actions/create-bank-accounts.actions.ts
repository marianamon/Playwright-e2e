import { CreateBankAccountsPage } from "../../pages/create-bank-accounts.page";
import { Page } from 'playwright'; // Importar Page para manejar la página en Playwright

export class CreateBankAccountsActions extends CreateBankAccountsPage {
    private page: Page;

    constructor(page: Page) {
        super();
        this.page = page;
    }

    async createBankAccount(accountName: string, routingNumber: string, accountNumber: string) {
        await this.page.waitForTimeout(1000); // Espera de 1 segundo
        await this.page.locator(this.bankNameInput).fill(accountName); // Ingresar el nombre de la cuenta
        await this.page.locator(this.routingNumberInput).fill(routingNumber); // Ingresar el routing number
        await this.page.locator(this.accountNumberInput).fill(accountNumber); // Ingresar el número de cuenta
    }

    async verifyBankAccountCreated() {
        await this.page.waitForTimeout(3000); // Espera de 3 segundos
        await this.page.locator(this.bankAccountsList).waitFor({ state: 'visible' }); // Verificar que la lista de cuentas bancarias es visible
    }

    async verifyBankAccountDeleted() {
        await this.page.waitForTimeout(3000); // Espera de 3 segundos
        await this.page.locator(this.bankAccountDeletedLabel).waitFor({ state: 'visible' }); // Verificar que la cuenta eliminada es visible
    }
}
