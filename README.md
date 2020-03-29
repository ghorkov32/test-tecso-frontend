# TestTecsoFrontend

Proyecto de frontend realizado en Angular 8, para la challenge de Tecso. 

## Acerca del proyecto

El proyecto se desarrolló usando Angular 8, Angular Material y NGXS (librería de state-management). Tiene incluida la configuración de server Node Express, con routeo al ambiente de producción, ubicado en https://sb-tecso-examen.herokuapp.com/api.

## Build y deploy

Para desarrollo local se precisa una instancia del backend, subido a [este repositorio](https://github.com/ghorkov32/-test-spring-boot-level-1).
Una vez levantada la instancia local, ejecutando `ng serve` ya se puede desarrollar localmente.
Para el deploy, una vez aprobada la Pull Request, este se hace automáticamente vía Heroku.

## Deploy de producción

El deploy de producción está ubicado en [https://sb-tecso-examen-front.herokuapp.com/](https://sb-tecso-examen-front.herokuapp.com/). Usa la api deployada también en Heroku.
