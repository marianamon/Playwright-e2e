import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { BaseActions } from '../actions/base.action';
import { PaymentsManagmentActions } from '../actions/payments-managment.actions';

const paymentsManagmentActions = new PaymentsManagmentActions();
const baseActions = new BaseActions();

When(/^the user select a contact$/, ()=> {
    paymentsManagmentActions.selectContact();
});
When(/^the user enters the data "(.*?)" "(.*?)"$/, (amount: string, note: string)=> {
    paymentsManagmentActions.enterPaymentData(amount,note);
});
Then(/^the payment is successfully executed$/, ()=> {
    paymentsManagmentActions.verifyPayment();
});

