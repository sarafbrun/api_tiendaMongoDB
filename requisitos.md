# API

## Modelo de productos

- Recuperar todos los productos
    - GET /api/products
    PRUEBAS (creamos carpeta con tests):
        - Que la URL funcione (que el status sea 200)
        - Que la respuesta sea en formato JSON
        - Que la respuesta sea un array con productos
        - EJEMPLO:
            - FUNCIÓN Sumar
                - función se ejecuta
                - comprobaria que si le paso 3 y 5 me devuelve 8
                - si le paso 0 y 0 devuelve 0 

- Crear un producto
    - POST /api/products
    - En el body de la petición recibimos todos los datos del nuevo producto
    PRUEBAS: 
        - Que la URL funcione y nos devuelva un JSON
        - Que la respuesta disponga de la propiedad _id

- Editar un producto
    - PUT /api/products/PRODUCTID
    - En el body recibimos todos los datos a editar
    PRUEBAS:
    - Que la url funcione y devuelva un JSON
    - Comprobar que en la respuesta se vean reflejados los cambios
    (Como buena practica no editemos lo q ya tenemos en la base de datos, creamos uno especifico para las pruebas y cuando terminen las pruebas lo borro)

- Borrar un producto

- Recuperar un único producto
    GET /api/products/IDPRODUCTO (findById)

- Url para registrar usuarios
    - POST /api/users/register
    - Dentro del body recibimos todos los datos del usuario
    - Insertamos un documento nuevo por cada petición (create)

