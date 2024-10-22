import { PaymentsManagmentPage } from "../../pages/payments-managment.page";


export class PaymentsManagmentActions extends PaymentsManagmentPage {
    selectContact(){
        cy.wait(3000);
        cy.get(this.contactOption).should('be.visible').first().click();
    }

    enterPaymentData(amount: string, note: string){
        cy.wait(1000);
        cy.get(this.amountInput).type(amount);
        cy.get(this.notesInput).type(note);
    }

    verifyPayment(){
        cy.wait(3000);
        cy.get(this.paymentsList).should('be.visible');
    }
    

}