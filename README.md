# lampa-test-back

## API link

https://products-api-umhe.onrender.com - лінка на апі розміщеному на рендері.

**Роут щоб отримати документацію свагеру** __/api-docs__

Для **_POST, DELETE, PUT_** запитів потрібно авторизуватись. **_GET_** запити
можна отримати без авторизації

## Instalation

Для запуску проекту локально на комп'ютері потрібно ввести команду:

```sh
npm start
```

## Auth Route

**_POST_** **/api/auth/register** - реєстрація нового користувача, треба
передати {name, email, password}.

**_POST_** **/api/auth/login** - щоб увійти в аккаунт, треба передати {email,
password}.

**_POST_** **/api/auth/logout** - щоб вийти з аккаунту, нічого не передаємо.

## Category Route

**_GET_** **/api/category**: Цей маршрут призначений для отримання списку всіх
категорій. Цей запит приймає такі query параметри limit(скільки продуктів прийде
у відповідь), currency(валюта якою покупецб хоче бачити ціну[UAH, USD, EUR]),
page(сторінка з продуктами)

**_GET_** **/api/category/:id** Цей маршрут призначений для отримання інформації
про категорію товарів за її унікальним ідентифікатором (id).

**_POST_** **/api/category**: Цей маршрут призначений для створення нової
категорії. Приймає поле { title }.

**_DELETE_** **/api/category/:id** Цей маршрут призначений для видалення
категорії товарів за її унікальним ідентифікатором (id).

**_PUT_** **/api/category/:id** Цей маршрут призначений для оновлення інформації
про категорію товарів за її унікальним ідентифікатором (id).

**_GET_** **/api/category/:id/product**: Цей маршрут призначений для отримання
всіх товарів у певній категорії. Цей запит приймає такі query параметри
limit(скільки продуктів прийде у відповідь), currency(валюта якою покупецб хоче
бачити ціну[UAH, USD, EUR]), page(сторінка з продуктами)

## Products Route

**_GET_** **/api/products**: Цей маршрут призначений для отримання списку всіх
продуктів. Цей запит приймає такі query параметри limit(скільки продуктів прийде
у відповідь), currency(валюта якою покупецб хоче бачити ціну[UAH, USD, EUR]),
page(сторінка з продуктами).

**_GET_** **/api/products/:id** Цей маршрут призначений для отримання інформації
про продукт за його унікальним ідентифікатором (id).

**_DELETE_** **/api/products/** Цей маршрут призначений для видалення продукту
за його унікальним ідентифікатором (id).

**_POST_** **/api/products**: Цей маршрут призначений для створення нового
продукту. Приймає поля {price, title, description, mainPhoto, photos, currency,
categoryId}.

**_PUT_** **/api/products/:id** Цей маршрут призначений для оновлення інформації
про продукт за його унікальним ідентифікатором (id). Приймає поля {price, title,
description, mainPhoto, photos, currency, categoryId}.

## .env

- **DB_HOST**: лінка до MongoDB бази
- **SECRET_KEY**: секретний ключ для хешування паролю
- **PORT**: порт на якому запущений сервер
- **ACCESS_TOKEN_EXPIRE**: через скільки аксес токен стане недійсним
- **REFRESH_TOKEN_EXPIRE**: через скільки рефреш токен стане недійсним
