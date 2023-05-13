
# Proyecto Portafolio Bootcamp Javascript Trainee: QRestaurant

Qrestaurant es una aplicacion para solicitar pedidos a traves del QR de una mesa en un restaurant, en vez de utilizar el QR para descargar un pdf con la carta y luego solicitarla al mesero.


## Consideraciones

 - Para probar la aplicacion, lo mas recomendable es hacerle un fork a los repositorios [PortafolioTDAPI](<https://github.com/bryanjv/portafolioTDAPI_final>) y [PortafolioTD](<https://github.com/bryanjv/portafolioTD_final>).

 - Utilizar en la raiz de la carpeta /server en PortafolioTD el comando <npm i>, para que se instalen todas las dependencias necesarias y se pueda correr el proyecto. Realizar lo mismo para PortafolioTDAPI, primero dirigirse a la raiz del proyecto y ejecutar <npm i> para que se instalen las dependencias necearias.

 - Para la seccion de la base de datos, se utilizo PostgreSQL, por lo tanto utilizar la extension de VS Code de PostgreSQL, o utilizar PGadmin 4 y ejecutar Query.SQL incluida en la raiz de PortafolioTDAPI.

 - Para efectos practicos, se recomienda utilizar internet para que los icons se vean, de lo contrario apareceran en blanco.
 - Para efectos practicos, se incluira el .env en TDAPI, para usarlo de acuerdo a lo solicitado.


## Correcto uso de la Aplicacion

Pasos para el funcionamiento de la aplicacion:

1.-Utilizar el comando <node .> en la carpeta /server de portafolioTD y utilizar en otra terminal el comando <node .> en la carpeta /portafolioTDAPI. Cada uno estara corriendo en el puerto 3000 y 4000 respectivamente.

2.-Crear un restaurant en el registro, un cliente y un empleado del restaurant (Si bien en el registro del empleado aparece un codigo de autorizacion, para efectos practicos no se incluyo la comprobacion de dicho valor, por tanto basta con escribir "1234").

3.-Logearse con el empleado creado, ir al perfil del restaurant en la URL *informacion del restaurant* contenida dentro de la ruta *Busca tu QRestaurant*, y luego crear un nuevo menu en el boton +. Posteriormente, y una vez se vea reflejado el menu en la ruta *inventario*, cerrar sesion con el empleado.
 
4.-Logearse con el cliente y entrar al restaurant creado, seleccionar intituitivamente un platillo, luego seleccionar ordenar y en la siguiente vista seleccionar ordenar pedido o revelar resumen para que se muestre el pedido creado y luego clickear ordenar pedido.

5.-Cerrar sesion con el cliente y entrar nuevamente con el empleado, dirigirse al perfil del restaurant y luego entrar a ordenes activas, y una vez ahi, aparecera el pedido realizado por el cliente.

5.-Si se presiona Completar pedido, inmediatamente el pedido pasara a estado completado y se movera a la tabla inferior de la vista ordenes. De esta manera el pedido estara completado y el funcionamiento de la aplicacion estara demostrado

A tener en cuenta que el resto de funcionalidades van de acuerdo a la rubrica de evaluacion y seran mencionadas en las secciones posteriores.


## Rubrica de Evaluacion

- Consulta a la base de datos

Selección de columnas requeridas para presentar la información solicitada: [Todo el documento](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

Uso de JOIN para relacionar la información de distintas tablas: [Linea 71](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

Uso de WHERE para filtrar la información requerida: [Linea 19](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

Uso de cláusulas de ordenamiento para presentar la información: [Linea 191](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

Uso de cláusulas de agrupación de información para obtener datos agregados: [Linea 191](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

- Algorítmo de cálculo y manipulación de archivos de texto

Uso general del lenguaje, sintáxis, selección de tipos de dato, sentencias lógicas, expresiones, operaciones y comparaciones: [Funcion Linea 33](https://github.com/bryanjv/portafolioTD_final/blob/master/client/public/js/main.js)

Uso de sentencias repetitivas: [linea 46](https://github.com/bryanjv/portafolioTD_final/blob/master/client/public/js/main.js)

Convenciones y estilos de programación: [Todo el documento](https://github.com/bryanjv/portafolioTD_final/blob/master/server/routes/routes.js)

Utilización correcta de estructuras de Datos: [Linea 53](https://github.com/bryanjv/portafolioTD_final/blob/master/client/public/js/main.js)

Manipulación de archivos: [Funcion Linea 104](https://github.com/bryanjv/portafolioTD_final/blob/master/client/public/js/main.js)

- Página Web y HTML

Uso de tags html, estilos y responsividad - Uso de Bootstrap:[Inclusion de Bootstrap y estilos](https://github.com/bryanjv/portafolioTD_final/blob/master/server/views/partials/template.hbs) / [Tags html y uso de bootstrap](https://github.com/bryanjv/portafolioTD_final/blob/master/server/views/register.hbs)

- Lenguaje Node

Inclusión de paquetes y librerías de usuario:[Linea 1-7](https://github.com/bryanjv/portafolioTD_final/blob/master/server/index.js)

Agrupación del código y separación por funcionalidad: [Cada funcion de la clase Connection.js](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

Utilización de funciones asíncronas: [Funcion Linea 9](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

Lectura de parámetros de entrada: [Funcion Linea 126](https://github.com/bryanjv/portafolioTD_final/blob/master/server/routes/routes.js)

- Conexión a Base de Datos

Manejo de conexión a base de datos desde Node: [Todo el documento](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

Manejo y ejecución de consultas desde Node: [Todo el documento](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/class/Connection.js)

- Uso de Express

Creación servicio Rest con Express: [Todo el documento](https://github.com/bryanjv/portafolioTDAPI_final/blob/master/server.js)



