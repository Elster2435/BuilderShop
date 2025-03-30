
# BuilderShop - онлайн-магазин по продаже строительных товаров

BuilderShop – это удобная и современная платформа для поиска, выбора и заказа строительных материалов. Проект создан с использованием современных технологий и обеспечивает быстрый поиск, удобную навигацию по категориям, возможность добавления товаров в корзину и оформления заказа.

## 🚀 Функциональность

### 🔎 Поиск и фильтрация товаров
Мгновенный поиск товаров по названию

Фильтрация товаров по категориям

Вывод списка товаров с изображением, описанием и ценой

### 📂 Каталог товаров
Просмотр доступных категорий товаров

Переход в категорию для просмотра ассортимента

Детальные страницы товаров с описанием и изображением

### 🛍️ Корзина и оформление заказов
Добавление товаров в корзину

Изменение количества товаров в корзине

### 👤 Пользовательский профиль
Регистрация и авторизация
## Run Locally

Чтобы развернуть проект клонируем этот репозиторий к себе на компьютер, в директорию BuilderShop

```bash
    git clone git@github.com:Elster2435/BuilderShop.git BuilderShop
```
Создаем базу данных Mysql c помощью shell либо Workbench(как вам удобно)

```bash
    mysql -u root -p
    `ваш пароль`
    CREATE DATABASE online_shop;
```
Название БД и логин-пароль прописываем в файле `src/data-source.st`

```bach
    type: "mysql",
  host: "localhost",
  port: 3306,
  username: "-", // Ваш логин
  password: "-", // Ваш пароль
  database: "online_shop", // Название базы данных
  synchronize: true,
  logging: true,
  entities: [User, Product, Category, Order, OrderItem],
```
Далее переходим в папку `BuilderShop`, запускаем `cmd` и прописываем

```bash
    npm install
    npm run dev
```
Переходим в папку `frontend`, запускаем `cmd` и прописываем

```bash
    npm install
    npm run dev
```

Примечание: сущности в базе данных будут созданы пустыми. Для добавления товаров, категорий и тд можно использовать плагин Thunder Client в Visual Studio Code.

