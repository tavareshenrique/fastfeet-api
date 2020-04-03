<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="logo.png" width="300px" />
</h1>

<p align="center">
  <img alt="Last commit on GitHub" src="https://img.shields.io/github/last-commit/tavareshenrique/fastfeet-api?color=7D40E7">
  <img alt="Made by Henrique Tavares" src="https://img.shields.io/badge/made%20by-Henrique Tavares-%20?color=7D40E7">
  <img alt="Project top programing language" src="https://img.shields.io/github/languages/top/tavareshenrique/fastfeet-api?color=7D40E7">
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/tavareshenrique/fastfeet-api?color=7D40E7">
  <img alt="GitHub license" src="https://img.shields.io/github/license/tavareshenrique/fastfeet-api?color=7D40E7">
</p>

<p align="center">
  <a href="#information_source-content">ℹ️ Content</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies">🚀 Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#computer-author">💻 Author</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">📝 License</a>
</p>

<div align="center"><a href="https://insomnia.rest/run/?label=FastFeet%20API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Ftavareshenrique%2Ffastfeet-api%2Fmaster%2Finsomnia%2Fexport.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a></div>

<p align="center">
  FastFeet is an application for a fictional shipping company, FastFeet. This application is for Rocketseat Bootcamp certification and this Back-End was developed using NodeJS.
</p>

<h4 align="center">
  ⚠️ This project also has integration testing and unit testing. ⚠️
</h4>

---

# :information_source: Content

- [User](#user)
  - [Store](#store-user)
  - [Update](#update-user)
- [Session](#session)
  - [Store](#store-session)
- [Deliveymen](#deliverymen)
  - [List All](#list-all-deliverymen)
  - [Orders By Deliveyman](#orders-by-deliveryman)
  - [Store](#store-deliveryman)
  - [Update](#update-deliveryman)
  - [Delete](#delete-deliveryman)
- [Delivery Problems](#delivery-problems)
  - [List All](#list-all-delivery-problems)
  - [List Delivery Problem By Order Id](#list-delivery-problems-by-order-id)
  - [Store](#store-delivery-problem)
  - [Delete](#delete-delivery-problem)
- [Recipient](#recipient)
  - [List All](#list-all-recipients)
  - [Store](#store-recipient)
  - [Update](#update-recipient)
  - [Delete](#delete-recipient)
- [Order](#recipient)
  - [List All](#list-all-orders)
  - [Store](#store-order)
  - [Update](#update-order)
  - [Delete](#delete-order)
- [Order Status](#order-status)
  - [Update](#upate-order-status)
- [File](#file)
  - [Store](#store-file)
- [Signature](#file)
  - [Store](#store-signature)

---

# User

## **Store** User

Create a single user.

* **URL**

  `/users`

* **Method:**

  `POST`

* **URL Params**

   **Required:**

    None

* **Data Params**

    ```json
    {
      "name": "FastFeet",
      "email": "admin@fastfeet.com",
      "password": "123456"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "name": "FastFeet",
      "email": "admin@fastfeet.com",
    }
    ```

---

## **Update** User

Update a user.

* **URL**

  `/users`

* **Method:**

  `PUT`

* **URL Params**

   **Required:**

    None

* **Data Params**

  `* Need Authorization - Bearer Token`

  ```json
  {
    "name": "Henrique Tavares",
    "email": "ihenrits@gmail.com",
  }
  ```

  - If you inform that you want to change the password, you must confirm the password and inform the old password, like this:

  ```json
  {
    "name": "Henrique Tavares",
    "email": "ihenrits@gmail.com",
    "oldPassword": "123456",
    "password": "654321",
    "confirmPassword": "654321"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": 1,
      "name": "Henrique Tavares",
      "email": "ihenrits@gmail.com"
    }
    ```

---

# Session

## **Store** Session

Start a session.

* **URL**

  `/sessions`

* **Method:**

  `POST`

* **URL Params**

   **Required:**

    None

* **Data Params**

  ```json
  {
    "email": "admin@fastfeet.com",
    "password": "123456"
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "user": {
        "id": 1,
        "name": "FastFeet",
        "email": "admin@fastfeet.com"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJpZCI6MSwiaWF0IjoxNTgyODA2OTYyLCJleHAiOjE1ODM0MTE3NjJ9.nfadyR3In1javb1nqjjzIcK3k9ffFDQTcTkat3l8_D0"
    }
    ```

---

# Deliveryman

## **List All** Deliverymen

ListAll Deliverymen.

* **URL**

  `/deliverymen`

* **Method:**

  `GET`

* **URL Params**

   **Required:**

    None

    **Optional:**

    name=[string]
    id=[number]

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "id": 1,
        "name": "Henrique Tavares",
        "email": "ihenrits@gmail.com",
        "avatar_id": null,
        "avatar": null
      }
    ]
    ```

---

## **Orders by** Deliveryman

List orders assigned to the delivery person that are not delivered or canceled. Also list orders already delivered by the deliveryman.

* **URL**

  `/deliverymen/:id/deliveries`

* **Method:**

  `GET`

* **URL Params**

   **Required:**

    None

    **Optional**

  * For list orders already delivered by the deliveryman

      delivered=[boolean]
      page=[number][default = 1]

      **Ex:**  `/deliverymen/:id/deliveries?delivered=true`

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "id": 1,
        "product": "Any Product",
        "start_date": "2020-02-27T17:20:00.000Z",
        "recipient": {
          "name": "José da Silva",
          "street": "Rua Doze 11 Quadra 8 Conjunto Vinhais",
          "number": "629",
          "complement": "Vinhais",
          "state": "MA",
          "city": "São Luís",
          "zipcode": "65071970"
        },
        "signature": {
          "url": "http://localhost:3333/signatures/b54719a89ab55cde8e1a9b61b85c88c3.png",
          "name": "2018-06-09-saida-marca-simbolozaal.png",
          "path": "b54719a89ab55cde8e1a9b61b85c88c3.png"
        }
      }
    ]
    ```

---

## **Store** Deliveryman

Store Deliveryman.

* **URL**

  `/deliverymen`

* **Method:**

  `POST`

* **URL Params**

   **Required:**

    None

* **Data Params**

  `* Need Authorization - Bearer Token`

  ```json
  {
    "name": "Henrique Tavares",
    "email": "ihenrits@gmail.com",
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "name": "Henrique Tavares",
      "email": "ihenrits@gmail.com",
    }
    ```

---

## **Update** Deliveryman

Update Deliveryman.

* **URL**

  `/deliverymen/:id`

* **Method:**

  `PUT`

* **URL Params**

   **Required:**

    None

* **Data Params**

  `* Need Authorization - Bearer Token`

  ```json
  {
    "name": "Henrique Tavares",
    "email": "ihenrits@gmail.com",
    "avatar_id": 1
  }
  ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": "1",
      "name": "Henrique Tavares",
      "email": "ihenrits@gmail.com",
      "avatar": {
        "url": "http://localhost:3333/files/0d28a7b2bd2696d65dc9f1fa86e7b501.jpg",
        "id": 1,
        "path": "0d28a7b2bd2696d65dc9f1fa86e7b501.jpg"
      }
    }
    ```

---

## **Delete** Deliveryman

Delete Deliveryman.

* **URL**

  `/deliverymen/:id`

* **Method:**

  `DELETE`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** No body returned for response

---

# Delivery Problems

## **List All** Delivery Problems

List All Delivery Problems.

* **URL**

  `/delivery/problems`

* **Method:**

  `GET`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "id": 1,
        "description": "The recipient was not at home.",
        "delivery": {
          "id": 1,
          "product": "Any Product",
          "start_date": "2020-02-27T17:20:00.000Z",
          "end_date": "2020-02-27T22:20:00.000Z",
          "canceled_at": null
        }
      }
    ]
    ```

---

## **List** Delivery Problems By **Order ID**

List Delivery Problems by Order Id.

* **URL**

  `/delivery/:id/problems`

* **Method:**

  `GET`

* **URL Params**

   **Required:**

    None

* **Data Params**

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "id": 1,
        "description": "The recipient was not at home.",
        "delivery": {
          "id": 1,
          "product": "Any Product",
          "start_date": "2020-02-27T17:20:00.000Z",
          "end_date": "2020-02-27T22:20:00.000Z",
          "canceled_at": null
        }
      }
    ]
    ```

---

## **Store** Delivery Problem

Store Delivery Problem.

* **URL**

  `/delivery/:id/problems`

* **Method:**

  `POST`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    ```json
    {
     "description": "The recipient was not at home."
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": "1",
      "description": "The recipient was not at home."
    }
    ```

---

## **Delete** Delivery Problem

Delete Delivery Problem for Cancel Delivery.

* **URL**

  `/delivery/:id/cancel-delivery`

* **Method:**

  `DELETE`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** No body returned for response

---

# Recipient

## **List All** Recipients

List All Recipients.

* **URL**

  `/recipients`

* **Method:**

  `GET`

* **URL Params**

   **Required:**

    None

    **Required:**
    name=[string]
    id=[number]

* **Data Params**

    `* Need Authorization - Bearer Token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "id": 2,
        "name": "Bobbs",
        "street": "Rua Doze 11 Quadra 8 Conjunto Vinhais",
        "number": "629",
        "complement": "Vinhais",
        "state": "MA",
        "city": "São Luís",
        "zipcode": "65071970",
        "createdAt": "2020-02-21T00:25:36.844Z",
        "updatedAt": "2020-02-21T00:25:36.844Z"
      }
    ]
    ```

---

## **Store** Recipient

Store Recipient.

* **URL**

  `/recipients`

* **Method:**

  `POST`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    ```json
    {
      "name": "José da Silva",
      "street": "Rua Doze 11 Quadra 8 Conjunto Vinhais",
      "number": "629",
      "complement": "Vinhais",
      "state": "MA",
      "city": "São Luís",
      "zipcode": "65071970"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": 1,
      "name": "José da Silva",
      "street": "Rua Doze 11 Quadra 8 Conjunto Vinhais",
      "number": "629",
      "complement": "Vinhais",
      "state": "MA",
      "city": "São Luís",
      "zipcode": "65071970"
    }
    ```

---

## **Update** Recipient

Update Recipient.

* **URL**

  `/recipients/:id`

* **Method:**

  `PUT`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    ```json
    {
      "name": "José da Silva Jr.",
      "street": "Rua Doze 11 Quadra 8 Conjunto Vinhais",
      "number": "640",
      "complement": "Não Tem",
      "state": "MA",
      "city": "São Luís",
      "zipcode": "65071970"
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": 1,
      "name": "José da Silva Jr.",
      "street": "Rua Doze 11 Quadra 8 Conjunto Vinhais",
      "number": "640",
      "complement": "Não Tem",
      "state": "MA",
      "city": "São Luís",
      "zipcode": "65071970"
    }
    ```

---

## **Delete** Recipient

Delete Recipient.

* **URL**

  `/recipients/:id`

* **Method:**

  `DELETE`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** No body returned for response

---

# Order

## **List All** Orders

List All Orders.

* **URL**

  `/orders`

* **Method:**

  `GET`

* **URL Params**

   **Required:**

    None

   **Optional:**

   product=[string]

* **Data Params**

    `* Need Authorization - Bearer Token`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    [
      {
        "id": 1,
        "product": "Any Product",
        "canceled_at": null,
        "start_date": "2020-02-27T17:20:00.000Z",
        "end_date": "2020-02-27T22:20:00.000Z",
        "recipient": {
          "name": "José da Silva Jr.",
          "street": "Rua Doze 11 Quadra 8 Conjunto Vinhais",
          "number": "640",
          "complement": "Não Tem",
          "state": "MA",
          "city": "São Luís",
          "zipcode": "65071970"
        },
        "deliveryman": {
          "name": "Henrique Tavares",
          "email": "ihenrits@gmail.com"
        },
        "signature": {
          "url": "http://localhost:3333/signatures/b54719a89ab55cde8e1a9b61b85c88c3.png",
          "name": "2018-06-09-saida-marca-simbolozaal.png",
          "path": "b54719a89ab55cde8e1a9b61b85c88c3.png"
        }
      }
    ]
    ```

---

## **Store** Order

Store Order.

* **URL**

  `/orders`

* **Method:**

  `POST`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    ```json
    {
      "product": "New Any Product",
      "recipient_id": 1,
      "deliveryman_id": 1
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "recipient_id": 1,
      "deliveryman_id": 1,
      "product": "New Any Product"
    }
    ```

---

## **Update** Order

Update Order.

* **URL**

  `/orders`

* **Method:**

  `PUT`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    ```json
    {
      "product": "Any Product 2",
      "recipient_id": 1,
      "deliveryman_id": 1
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "recipient_id": 1,
      "deliveryman_id": 1,
      "signature_id": 1,
      "product": "Any Product 2",
      "canceled_at": null,
      "end_date": null
    }
    ```

---

## **Delete** Order

Delete Order.

* **URL**

  `/order/:id`

* **Method:**

  `DELETE`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** No body returned for response

# Order Status

## **Update** Order Status

Update Order Status.

* **URL**

  `/deliverymen/:idDeliverymen/orders/:idOrders/status`

* **Method:**

  `PUT`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    ```json
    {
      "start_date": "2020-02-27T14:20:00-03:00",
      "end_date": "2020-02-27T19:20:00-03:00",
      "signature_id": 1
    }
    ```

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "id": 1,
      "product": "Any Product",
      "start_date": "2020-02-27T17:20:00.000Z",
      "end_date": "2020-02-27T22:20:00.000Z",
      "recipient": {
        "name": "José da Silva",
        "street": "Rua Doze 11 Quadra 8 Conjunto Vinhais",
        "number": "629",
        "complement": "Vinhais",
        "state": "MA",
        "city": "São Luís",
        "zipcode": "65071970"
      },
      "deliveryman": {
        "name": "Henrique Tavares",
        "email": "ihenrits@gmail.com"
      },
      "signature": {
        "url": "http://localhost:3333/signatures/b54719a89ab55cde8e1a9b61b85c88c3.png",
        "name": "2018-06-09-saida-marca-simbolozaal.png",
        "path": "b54719a89ab55cde8e1a9b61b85c88c3.png"
      }
    }
    ```

---

# File

## **Store** File

Store File.

* **URL**

  `/files`

* **Method:**

  `POST`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    **Select:** `Multipart Form`

    `file - YOUR FILE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "url": "http://localhost:3333/files/0d28a7b2bd2696d65dc9f1fa86e7b501.jpg",
      "id": 1,
      "name": "E58C073E-A75D-4A58-B96E-D6495C5AB1D8.jpg",
      "path": "0d28a7b2bd2696d65dc9f1fa86e7b501.jpg",
      "updatedAt": "2020-02-27T13:12:19.125Z",
      "createdAt": "2020-02-27T13:12:19.125Z"
    }
    ```

---

# Signature

## **Store** Signature

Signature File.

* **URL**

  `/signatures`

* **Method:**

  `POST`

* **URL Params**

   **Required:**

    None

* **Data Params**

    `* Need Authorization - Bearer Token`

    **Select:** `Multipart Form`

    `signature - YOUR SIGNATURE IMAGE`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**

    ```json
    {
      "url": "http://localhost:3333/signatures/b54719a89ab55cde8e1a9b61b85c88c3.png",
      "id": 1,
      "name": "2018-06-09-some-name.png",
      "path": "b54719a89ab55cde8e1a9b61b85c88c3.png",
      "updatedAt": "2020-02-27T12:58:10.459Z",
      "createdAt": "2020-02-27T12:58:10.459Z"
    }
    ```

---

## :rocket: Technologies

- [Express](https://expressjs.com/pt-br/)
- [Nodemon](https://nodemon.io/)
- [Sucrase](https://github.com/alangpierce/sucrase)
- [Sentry](https://sentry.io/)
- [bcryptjs](https://github.com/dcodeIO/bcrypt.js#readme)
- [bee-queue](https://github.com/bee-queue/bee-queue)
- [cors](https://expressjs.com/en/resources/middleware/cors.html)
- [date-fns](https://date-fns.org/)
- [dotenv](https://github.com/motdotla/dotenv#readme)
- [express-async-errors](https://github.com/davidbanham/express-async-errors#readme)
- [express-handlebars](https://github.com/ericf/express-handlebars)
- [JWT Auth](https://github.com/auth0/node-jsonwebtoken)
- [multer](https://github.com/expressjs/multer)
- [nodemailer](https://nodemailer.com/about/)
- [nodemailer-express-handlebars](https://github.com/yads/nodemailer-express-handlebars)
- [youch](https://github.com/pradel/react-responsive-modal#readme)
- [yup](https://github.com/davidhu2000/react-spinners)
- [sequelize](https://sequelize.org/)
- [pg](https://github.com/brianc/node-postgres)
- [pg-hstore](https://github.com/scarney81/pg-hstore)
- [Postgres](https://www.postgresql.org/)
- [Redis](https://redis.io/)
- [SQLite](https://www.sqlite.org/index.html)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [JEST](https://jestjs.io/)
- [supertest](https://github.com/visionmedia/supertest)
- [factory-girl](https://github.com/simonexmachina/factory-girl#readme)
- [Faker](https://github.com/marak/Faker.js/)

---

## :computer: Author

<table>
  <tr>
    <td align="center">
      <a href="http://github.com/tavareshenrique/">
        <img src="https://avatars1.githubusercontent.com/u/27022914?v=4" width="100px;" alt="Henrique Tavares"/>
        <br />
        <sub>
          <b>Henrique Tavares</b>
        </sub>
       </a>
       <br />
       <a href="https://www.linkedin.com/in/tavareshenrique/" title="Linkedin">@tavareshenrique</a>
       <br />
       <a href="https://github.com/tavareshenrique/fastfeet-api/commits?author=tavareshenrique" title="Code">💻</a>
    </td>
  </tr>
</table>

## :memo: License

This project is licensed under the MIT license - see the archive [LICENSE.md](https://github.com/tavareshenrique/fastfeet-api/blob/master/LICENSE.md) for details.
