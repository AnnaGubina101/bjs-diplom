"use strict"

const logOutButton = new LogoutButton();

logOutButton.action = () => {
    const responseToLogOut = response => {
        if (response.success) {
            location.reload();
        }
    }

    ApiConnector.logout(responseToLogOut)

}