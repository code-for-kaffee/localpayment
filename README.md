# Api Localpayment

## Test para LocalPayment, se utilizan tecnologias como Javascript, Python, MySQL, MongoDb, Docker con Docker compose

### Descripción

Se solicita crear un CRUD para el servicio User y Trx,
los mismos deberan estar comunicados para poder realizar las diferentes operaciones.

[Link al test](https://github.com/FedeGA93/localpayment/blob/860b99bda507aee7b30465dae45755425c22c514/test_lp.pdf)

El proyecto esta implementado en Docker utilizando docker-compose para su ejecucion.

### Requisitos

Docker

### Pasos a seguir para ejecutar el proyecto:

#### Clonar el repositorio

Lo primero que debemos hacer es clonar el repositorio de manera local,
para realizarlo contamos con dos opciones:

La primera es utilizando la terminal con el siguiente comando:

> git clone https://github.com/FedeGA93/localpayment.git

La segunda es descargando un archivo .zip del repositorio:

> [Link de descarga](https://github.com/FedeGA93/localpayment/archive/refs/heads/main.zip)

### Preparar el ambiente

Para poder utilizar las API's vamos a necesitar Docker, se puede descargar desde el [Link a la pagina de Docker](https://www.docker.com/)

Una vez que tengamos docker instalado vamos a poder utilizar la app.

### Inicializar Docker

Para eso vamos a utilizar el siguiente comando en la terminal

> docker-compose up

Ese comando nos va a instalar las dependencias necesarias, en este caso vamos a utilizar:

- Node
- Python
- MySQL
- MongoDb

> En este caso la aplicación va a correr en dos puertos diferentes ellos son
> `http://localhost:3000/` para **Users**
> donde vamos a encontrar los diferentes endpoints:
>
> - `POST` -> http://localhost:3000/api/v1/register
> - `GET` -> http://localhost:3000/api/v1/users/
> - `GET` -> http://localhost:3000/api/v1/user/:doc_number
> - `PUT` -> http://localhost:3000/api/v1/user/:doc_number
> - `DELETE` -> http://localhost:3000/api/v1/user/:doc_number

#### Utilizar los endpoints.

El endpoint `/register` recibe una peticion del tipo `POST` es utilizado para crear un nuevo usuario.
Espera recibir un nombre y un numero de documento en caso de que falte uno de los dos datos se recibira un mensaje de error indicando que falta completar datos.

```

Body JSON:

{
    "name": "Anakin Skywalker",
    "doc_number": 12345678
}

Response:

Status: 201
{
    "code": "OK",
    "message": "user sucesfully registered"
}

```

Este endpoint

El endpoint `/users` espera recibir una peticion tipo `GET` para devolver todos los usuarios registrados en la base de datos.

    ```
    Response:

    Status: 200
    [
        {
            "name": "Anakin Skywalker",
            "doc_number": 12345678,
            "createdAt": "2021-07-29T00:00:00.000Z",
            "updatedAt": "2021-07-29T00:00:00.000Z"
        },
        {
            "name": "Luke Skywalker",
            "doc_number": 87654321,
            "createdAt": "2021-07-29T00:00:00.000Z",
            "updatedAt": "2021-07-29T00:00:00.000Z"
        }
    ]
    ```

En el endpoint `/user/:doc_number` tenemos 3 peticiones diferentes

1.  `GET` nos devuelve un json con los datos de un usuario

        Response:

        Status: 200
        ```
        [
            {
                "name": "Anakin Skywalker",
                "doc_number": 12345678,
                "createdAt": "2021-07-29T00:00:00.000Z",
                "updatedAt": "2021-07-29T00:00:00.000Z"
            }
        ]
        ```

2.  `PUT` es el metodo que utilizamos para modificar el nombre de un usuario

            ```
            Body Json:

            {
                "name":"Princess Leia"
            }

            Response:
            Status: 200

            {
               "message": "User sucesfully updated"
            }

            ```

3.  `DELETE` Es el endpoint que vamos a utilizar para eliminar un usuario

            ```
            Response:
            Status: 200

            {
                "message": "User sucessfully deleted"
            }

            ```

> `http://localhost:5000/` para **Trx**
> donde vamos a encontrar los diferentes endpoints:
>
> - `POST` -> http://localhost:3000/api/v1/trx/newtrx
> - `GET` -> http://localhost:3000/api/v1/trx/
> - `GET` -> http://localhost:3000/api/v1/trx/balance/:doc_number
> - `DELETE` -> http://localhost:3000/api/v1/trx/:doc_number

El endpoint `/trx/newtrx` recibe una peticion del tipo `POST` es utilizado para crear una nueva transaccion para eso se comunica con el servicio de `http://localhost:3000/api/v1/user/:doc_number` para verificar que exista el usuario a cargar la transaccion

{
    "user": 87654321,
    "feature": "PAYIN",
    "amount": 1234
}