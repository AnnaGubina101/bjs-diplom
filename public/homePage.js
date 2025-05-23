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

const currentUser = response => {
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
            moneyManager.setMessage(true, "Пополнение счёта прошло успешно!")
        } else {
            moneyManager.setMessage(false, "Произошла ошибка в пополнении счета");
        }
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертирование валюты прошло успешно!")
        } else {
            moneyManager.setMessage(false, "Произошла ошибка в конвертировании валюты");
        }
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, response => {
        if(response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод денежных средств пошла успешно!")
        } else {
            moneyManager.setMessage(false, "Произошла ошибка в переводе денежных средств");
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
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь успешно добавлен в список избранных!")
        } else {
            favoritesWidget.setMessage(false, "Произошла ошибка при добавлении в список избранных");
        }
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if(response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь успешно удален из списка избранных!")
        } else {
            favoritesWidget.setMessage(false, "Произошла ошибка в удалении пользователя из списка избранных");
        }
    })
}








