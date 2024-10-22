import { Given, When, Then } from '@cucumber/cucumber';
import { CreateBankAccountsActions } from '../actions/create-bank-accounts.actions';
import { BaseActions } from '../actions/base.action';

const { chromium, expect } = require("@playwright/test");
const { Page } = require("playwright");
let page, browser;
const createBankAccountActions = new CreateBankAccountsActions(page);
const baseActions = new BaseActions(page);


Given(/^that the user is in the "(Home|My Account|Bank Accounts|Notifications)" page$/, async (option: string) => {
    await baseActions.generateTokenAndAuthentication();
    // await baseActions.clickOnButton('Next'); // Elimina o adapta según necesidad
    await baseActions.goToThePage(option);
});

Given(/^the user clicks on the "(Create|Delete|Save|Dismiss|New|Pay|Request)" button$/, async (option: string) => {
    await baseActions.clickOnButton(option);
});

When(/^the user enters the data "(.*?)" "(.*?)" "(.*?)"$/, async (accountName: string, routingNumber: string, accountNumber: string) => {
    await createBankAccountActions.createBankAccount(accountName, routingNumber, accountNumber);
});

Then(/^the bank account is visible in the user's account list$/, async () => {
    await createBankAccountActions.verifyBankAccountCreated();
});

Then(/^the bank account is deleted in the user's account list$/, async () => {
    await createBankAccountActions.verifyBankAccountDeleted();
});
