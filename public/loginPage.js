"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    const responseToLogIn = response => {
        if (!response.success) {
            userForm.setLoginErrorMessage(response.error);
            return
        }

        location.reload();
    }

    ApiConnector.login(data, responseToLogIn)
}

userForm.registerFormCallback = data => {
    const responseToRegister = response => {
        if (!response.success) {
            userForm.setRegisterErrorMessage(response.error);
            return
        }

        location.reload();
    }

    ApiConnector.login(data, responseToRegister);
}