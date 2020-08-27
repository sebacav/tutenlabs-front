# Prueba para entrar a TutenLabs
En este documento, explicare los archivos que se han cambiado respecto a la estructura original de un proyecto en Angular.
El proyecto esta orientados a consumo de una `API`, entregada por TutenLabs.
Este proyecto fue creado, para ser desplegado en Cloud Run, mediante CI/CD desde GCP, por lo cual no es necesario ningún archivo .yml en el, debido a que se proporciona en el mismo Cloud Run.


## Requisitos
Para instalar el proyecto localmente, se requiere tener instalado los siguientes componentes:
* Debes tener instalado `Node 14.5.0 ` o superior 
* `Angular 10 ` o superior 
* `Docker `, para poder correr el contendor.

## Instalacion

* Para poder hacer uso de la aplicacion, podemos arrancar el archivo mediante `Docker ` ejemplo:


``` sh
docker build -t tuten-lab .
docker run -p 5555:80 tuten-lab
```
Con esto, podremos ir a nuestro navegador, y abrir la direccion [localhost](https://localhost:5555/) y podremos navegar sobre la aplicacion.

## Uso de la Aplicacion

Para poder hacer inicio de sesion, solo basta con ir a la ruta de la aplicacion: [tuten-front.gcp.com](https://tuten-labs-smdxjsf3dq-uc.a.run.app/)

Si ya estas logueado, puedes dirigirte a ver los filtros de bookings : [tuten-front.gcp.com/booking](https://tuten-labs-smdxjsf3dq-uc.a.run.app/booking)


# Supuestos de la aplicacion

* Los campos `bookingId ` y `bookingPrice `, ambos son filtros, los cuales se eligen en un selector
* Dependiendo de los campos de filtro seleccionados, es posible filtrar basado en los operadores `<=`, `=` y `>=`
* Si no es posible filtrar, entonces se deben mantener los campos mostrados.






