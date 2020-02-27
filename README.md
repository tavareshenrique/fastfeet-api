<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src="logo.png" width="300px" />
</h1>

<h3 align="center">
  FastFeet is an app for a fictional shipping company, FastFeet. This application is for Rocketseat Bootcamp certification.
</h3>

**Store User**
----
  Create a single user.

* **URL**

  /users

* **Method:**

  `POST`

*  **URL Params**

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
    `
  {
    "name": "FastFeet",
    "email": "admin@fastfeet.com",
	  "password": "123456"
  }
  `

**Update User**
----
  Update a user.

* **URL**

  /users

* **Method:**

  `PUT`

*  **URL Params**

   **Required:**

    Bearer Token

* **Data Params**

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
    `
  {
    "id": 1,
    "name": "Henrique Tavares",
    "email": "ihenrits@gmail.com"
  }
  `
