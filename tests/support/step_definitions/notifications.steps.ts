import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BaseActions } from '../actions/base.action';
import { NotificationsActions } from '../actions/notifications.actions';

const notificationsActions = new NotificationsActions();
const baseActions = new BaseActions();

When(/^the notificacion is successfully deleted$/, ()=> {
    notificationsActions.verifyNotificationstDeleted();
});
