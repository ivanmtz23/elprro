#  auth-api-microservice

Api de autenticacion usando contenedores en docker para microservicios

### Instalacion
Despues de clonar el repositorio, correr el comando siguiente para instalar la aplicacion en nuestra maquina local

	$ npm install
			 
### Variables
Hay que crear nuestro archivo de variables de entorno que requiere nuestra aplicacion para eso usamos el siguiente comando

	$ touch .env

Las variables se encuentran en el archivo .env.example

### Build
Para construir nuestra aplicacion para produccion es necesario correr el siguiente comando

	$ npm run build

Webpack se encargara de crear nuestra carbeta /dist con nuestro archivo main.js que sera nuestra aplicacion para produccion
		
### Start
Para correr la aplicacion una vez instalada en nuestra maquina local puede ser de dos maneras

  Modo desarrollo 
	$ npm run start:dev

	Modo produccion es necesario correr el comando build para correr en produccion
	$ npm start

## Routes

### Auth

### sign-in 
Para iniciar sesion es necesario un apiKeyToken que debe venir en el cuerpo de nuestra peticion, esto debera ser por parte del cliente que consume nuestra api, sera en la siguiente ruta.

	/auth/sign-in

### sign-up 
Para registrar nuestro usuario es necesario dos parametros como a continuacion

	{
	 "email": "some@example.com",
	 "password": "something"
	}

En la siguiente ruta, el cual devolvera el id del usuario creado

	/auth/sign-in

## Docker

### Build
Para crear nuestra imagen de docker usaremos el siguiente comando

    $ docker build --tag <image-docker-name> . 


Despues checamos si se creo correctamente

    $ docker images


### Run
Una vez construida nuestra imagen en docker usaremos el siguiente comando

	$ docker run -it -p 4000:8080 -d <image-docker-name> 

Veremos si nuestro contenedor esta corriendo correctamente

	$ docker ps

Para ver si hay algun error podemos usar el siguiente comando o para mostrar si hay algun log de nuestra aplicacion

	$ docker ps <id-image>

En caso de que nuestro log sea

  listen on port <some-port>

Nuestra aplicacion estara corriendo correctamente