# Proyecto 7 API REST AUTH 

## Descripción:

En este proyecto se debe de demostrar el aprendizaje de la parte inicial del Backend, 
creando un servidor y conectando a la BBDD para posteriormente realizar un CRUD completo.

[![N|Solid](https://moonlay.com/wp-content/uploads/2023/01/mongoDB.png)](https://nodesource.com/products/nsolid)[![N|Solid](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkucnJUfKnyTgCTQ-XEp_CbYIDzXJ_1b4BafS7alYn8v8duI9DMcv3zQvb_WF11dX-95M&usqp=CAU)](https://nodesource.com/products/nsolid)[![N|Solid](https://moonlay.com/wp-content/uploads/2023/01/node-JS.png)](https://nodesource.com/products/nsolid)

### Requisitos mínimos:

- Realizar el README.md con la documentación del proyecto.
- Servidor con express.
- Conexión a una base de datos de Mongo Atlas mediante mongoose.
- Creación de tres modelos, uno de ellos el de users.
- Una semilla que suba datos a una de las colecciones.
- Dos relaciones entre colecciones, la idea es que los usuarios tengan un dato relacionado también.
- CRUD completo de todas colecciones.
- Los usuarios sólo pueden ser creados con rol user.
- Crearemos nuestro primer admin cambiando su rol directamente en la BBDD.
- Los admins pueden modificar a un usuario normal para cambiar su rol y hacerlo admin también.
- Los admins pueden eliminar usuarios, pero un usuario se puede eliminar a si mismo.
- Existe un middleware que compruebe el token que se aporta en la petición para dejar pasar o mostrar un mensaje de error.

## Clonación del Proyecto:

```sh
git clone https://github.com/DanielSalvatierraSanchez/Proyecto-6-Backend-API-REST.git
```

- Entrega del .env:

```
DB_URL=mongodb+srv://dani:<password>@cluster0.a9lsjqe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

- Middlewares:
> isAuth (Verifica si el usuario tiene creado el Token)
> isAdmin (Verifica si el usuario tiene el "role" de "admin")

- Dependencias del proyecto:

```
npm i -D nodemon
npm i express mongoose dotenv bcrypt jsonwebtoken
```

- Scripts del proyecto:

```
npm run start ("node index.js")
npm run dev ("nodemon index.js")
npm run seeds ("node ./src/utils/seeds/seeds.js")
```

### Endpoints Users

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| REGISTER USER | POST | /api/v1/users/register | { **userName**, **email**, **password**, role, atms } |
| LOGIN USER | POST | /api/v1/users/login | { **email**, **password** } |
| ALL USERS | GET | /api/v1/users/ | --- | isAuth |
| UPDATE USER | PUT | /api/v1/users/update/:id | { **users data** } | isAuth |
| DELETE USER | DELETE | /api/v1/users/delete/:id | --- | isAuth |

## Resumen de los Endpoints Users

##### POST /api/v1/users/register
- Para la creación de los usuarios se crea un Schema, en el que requerimos 3 campos obligatorios, "userName", "email" y "password", también tendremos otros extra que serán "role" (por defecto será "user") y "atms".  
```
    {      
        userName: { type: String, required: true, minLength: 1, maxLength: 25 },
        email: { type: String, required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
        password: { type: String, required: true, minLength: 8, maxLength: 16 },
        role: { type: String, enum: ["admin", "user"], default: "user" },
        atms: [{ type: mongoose.Types.ObjectId, ref: "atms" }]
    }
```
> No se permitirá a ningún usuario crear el "role" de "admin".

##### POST /api/v1/users/login
- Para hacer el Login de los usuarios se realizará mediante el "email" y la "password".

##### GET /api/v1/users/
-  Para obtener un listado de todos lo usuarios será necesario haber realizado el Login.

> Dependiendo del "role" mostrará un listado más o menos detallado de los usuarios.

##### PUT /api/v1/users/update/:id
- Para la actualización de los usuarios será necesario haber realizado el Login.

> Únicamente los usuarios con "role" de "admin" podrán actualizar cualquier usuario y su "role", el resto de usuarios sólo podrán actualizarse a sí mismos.

##### DELETE /api/v1/users/delete/:id
-  Para eliminar un usuario será necesario haber realizado el Login.

## Endpoints ATMs

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| POST ATM | POST | /api/v1/atms/register | { **type**, **model**, **ubication**, image, cassettes } | isAdmin |
| GET ATM BY UBICATION | GET | /api/v1/atms/getBy/:ubication | { **ubication** } | isAuth |
| ALL ATMs | GET | /api/v1/atms/ | --- | isAuth |
| UPDATE ATM | PUT | /api/v1/atms/update/:id | { **atms data** } | isAdmin |
| DELETE ATM | DELETE | /api/v1/atms/delete/:id | --- | isAdmin |

## Resumen de los Endpoints ATMs

##### POST /api/v1/atms/register
- Para la creación de un ATM se crea un Schema, en el que requerimos 3 campos obligatorios, "type", "model" y "ubication", también tendremos otros extra que serán "image" y "cassettes". Será necesario haber realizado el Login como "admin".  
```
    {
        type: { type: String, required: true, enum: [ 'PersonaS', 'SelfServ' ] },
        model: { type: Number, required: true, enum: [ 5870, 5875, 5885, 5886, 5877, 6622, 6626, 6627,     6632, 6634, 6682, 6684 ] },
        ubication: { type: String, required: true, enum: [ 'Front Access', 'Rear Access'] },
        image: { type: String, default: '/assets/Atms.jpeg'},
        cassettes: [{ type: mongoose.Types.ObjectId, ref: 'cassettes' }]
    }
```

##### GET /api/v1/atms/getBy/:ubication
-  Para obtener un listado de ATMs por "ubication" será necesario haber realizado el Login.

##### GET /api/v1/atms/
-  Para obtener un listado de todos los ATMs será necesario haber realizado el Login.

##### PUT /api/v1/atms/update/:id
- Para la actualización de un ATM será necesario haber realizado el Login como "admin".

##### DELETE /api/v1/atms/delete/:id
-  Para eliminar un ATM será necesario haber realizado el Login como "admin".

## Endpoints Cassettes

| NAME | METHOD | ENDPOINT | BODY | MIDDLEWARE |
| --- | --- | --- | --- | --- |
| POST CASSETTE | POST | /api/v1/cassettes/register | { **type**, **model**, **ubication**, image, cassettes } | isAdmin |
| GET CASSETTE BY DENOMINATION | GET | /api/v1/cassettes/getBy/:denomination | { **ubication** } | isAuth |
| ALL CASSETTES | GET | /api/v1/cassettes/ | --- | isAuth |
| UPDATE CASSETTE | PUT | /api/v1/cassettes/update/:id | { **atms data** } | isAuth |
| DELETE CASSETTE | DELETE | /api/v1/cassettes/delete/:id | --- | isAdmin |


## Resumen de los Endpoints Cassettes

##### POST /api/v1/cassettes/register
- Para la creación de un Cassette se crea un Schema, en el que requerimos 2 campos obligatorios, "denomination" y "count", también tendremos otro extra que será "image". Será necesario haber realizado el Login como "admin".  
```
    {
        denomination: { type: Number, required: true, enum: [ 5, 10, 20, 50, 100, 200, 500 ] },
        count: { type: Number, required: true },
        image: { type: String, default: '/assets/Cassette.jpg' }
    }
```

##### GET /api/v1/cassettes/getBy/:denomination
-  Para obtener un listado de Cassettes por "denomination" será necesario haber realizado el Login.

##### GET /api/v1/cassettes/
-  Para obtener un listado de todos los Cassettes será necesario haber realizado el Login.

##### PUT /api/v1/cassettes/update/:id
- Para la actualización de un Cassette será necesario haber realizado el Login.

##### DELETE /api/v1/cassettes/delete/:id
-  Para eliminar un Cassette será necesario haber realizado el Login como "admin".
-  

