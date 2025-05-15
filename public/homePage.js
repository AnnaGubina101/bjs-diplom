"use strict"

const { response } = require("express");

const logOutButton = new LogoutButton();
logOutButton.action = () => {
    const responseToLogOut = response => {
        if (response.success) {
            location.reload();
        }
    }
    ApiConnector.logout(responseToLogOut)
}


currentUser = response => {
    if(response.success) {
        ProfileWidget.showProfile(response.data)
    }
}
ApiConnector.current(currentUser);


const ratesBoard = new RatesBoard();
const toGetCurrentRate = () => {
    const responseToGetStocks = response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    }
    ApiConnector.getStocks(responseToGetStocks)
}
toGetCurrentRate();
setInterval(toGetCurrentRate, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, message)
        } else {
            moneyManager.setMessage(false, console.error(masage));
        }
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, message)
        } else {
            moneyManager.setMessage(false, console.error(masage));
        }
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, message)
        } else {
            moneyManager.setMessage(false, console.error(masage));
        }
    })
}

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if(response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, response => {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);

        if(response.success) {
            moneyManager.setMessage(true, message)
        } else {
            moneyManager.setMessage(false, console.error(masage));
        }
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);

        if(response.success) {
            moneyManager.setMessage(true, message)
        } else {
            moneyManager.setMessage(false, console.error(masage));
        }
    })
}








