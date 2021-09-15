
# react native test

La prueba tiene como objetivo el diseño y desarrollo de una app con React Native. La aplicación es una guía de cócteles en la que se puede hacer lo siguiente:

- Mostrar un listado de cócteles con el nombre y la imagen de cada bebida en cada item en el que se pueda hacer scroll para seguir viendo más.
- Cuando un item es pulsado, se tiene que abrir el detalle de cada cóctel. Siéntete libre de mostrar la info que quieras dentro del detalle!
Los datos para realizar la prueba se encuentran en la siguiente api pública sin autenticación:
[https://www.thecocktaildb.com/api.php](https://www.thecocktaildb.com/api.php)

*Bonus point: agregar una barra de búsqueda para poder filtrar los items en la pantalla principal por las variables que se consideren oportunas.

Objetivo

- No hay límite para la realización del ejercicio. Estimamos que la aplicación se puede hacer en 2 horas.
- No hay límite para el uso de librerías o recursos de terceros
- Se recomienda usar [Expo](https://docs.expo.dev/)
- No se entrega un diseño ni una guía de estilos para la interfaz de usuarios, queda a
elección del desarrollador.
- Se valorará: estructura del código, calidad del código, buenas prácticas y explicación
del código y/o cómo ejecutarlo.

## requisites

check the React native enviroment is [properly configured](https://reactnative.dev/docs/environment-setup).

## run project

- install dependencies with `yarn` or `npm i`
  - run yarn pod to install pods if running on mac
- create and filla `.env` file in root folder:
  - required a `token` key, with value `1` for develop
- run `yarn android` or `yarn iOS` to test the project

## Other details

- Expo was not used because some difficulties with common libraries that require native code
- Because the API documentation was abiguous, because of that, I had to redo all api-related logic and didn't do everything I wanted to do.
- a package.json is located in src folder to use absolute paths so if a file is moved will work anyway

## credits

starting code is from `react-native init` script

All code made by me

some icons are made by `Vectors Market` from [www.flaticon.com](https://www.flaticon.com)
