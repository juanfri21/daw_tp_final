Autor: Juan Francisco Tentor - 2020

# Introduccion

Proyecto final realizado para la asignatura Desarrollo de Aplicaciones Wed de la Carrera de Especialización en Internet de las Cosas de la Facultad de Ingeniería de la Universidad de Buenos Aires.



# Correr la aplicación

Para correr la aplicación es necesario tener instalado Docker y Docker Compose.
Primero se debera clonar el repositorio:

```sh

git clone https://github.com/juanfri21/daw_tp_final.git

```
Luego posicionarse en la raiz del proyecto y correr el siguiente comando para ejecutar la app:

```sh

docker-compose up

``` 
Esto pondra a correr los contenedores de Mysql, phpMyAdmin y nodejs.
Una vez ejecutado ingrese a la siguiente direccion para acceder a la app:
```sh

http://localhost:8000

``` 
Para detener la aplicacion ejecutar el siguiente comando:
```sh

docker-compose down

```
En caso de que no se cargue la lista de dispositivos detenga la aplicacion y vuelva a levantarla.
Esto se debe a que el contenedor de nodejs se ejecuta antes de que la base de datos este totalmente cargada.

# Tecnologias utilizadas

-   TypeScript
-   Node JS
-   Express JS
-   MySql
-   PhpMyAdmin

# Contribuir

Para contribuir realizar un pull request con las sugerencias.

# Licencia

GPL
