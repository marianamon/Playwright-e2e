import { NotificationsPage } from "../../pages/notifications.page";

export class NotificationsActions extends NotificationsPage {
    
    verifyNotificationstDeleted(){
        cy.wait(3000);
        cy.get(this.notificationsDeletedlabel).should('not.exist');
    }
}