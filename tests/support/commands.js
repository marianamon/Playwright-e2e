import { LoginApi } from "../services/api-login";

Cypress.Commands.add('login' , () =>{
  
      const loginApi = new LoginApi(); 
      loginApi.login();
      Cypress.log({
        displayName: "AUTH0 LOGIN",
        message: [`🔐 Authenticating ...`],
      });
  });