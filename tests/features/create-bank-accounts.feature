Feature: Create Bank Accounts

    Scenario Outline: Create a new Bank Accounts
        Given that the user is in the "Bank Accounts" page
        And the user clicks on the "Create" button
        When the user enters the data <Bank Name> <Routing Number> <Account Number>
        And the user clicks on the "Save" button
        Then the bank account is visible in the user's account list
        Examples:
          | Bank Name | Routing Number | Account Number |
          | "Bancamia"| "114398734"    | "0078890987"   |

    Scenario: Delete a Bank Account
        Given that the user is in the "Bank Accounts" page
        When the user clicks on the "Delete" button
        Then the bank account is deleted in the user's account list
