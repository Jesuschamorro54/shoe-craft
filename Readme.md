# Shoe Craft - Proyecto Flask

Bienvenido al repositorio de Shoe Craft, un proyecto Flask para la venta de zapatos artesanales. Este README te guiará a través de los pasos necesarios para ejecutar la aplicación tanto en entornos de desarrollo como en producción.

## Configuración Inicial

Antes de ejecutar la aplicación, asegúrate de tener instalado Python y pip en tu máquina.

1. **Instalar Dependencias:**

   Ejecuta el siguiente comando para instalar las dependencias del proyecto:

   ```bash
   pip install -r requirements.txt
   ```

## Ejecutar en Entorno de Local

Para ejecutar la aplicación en un entorno de desarrollo, sigue estos pasos:

1. **Configurar Variable de Entorno:**

   Antes de ejecutar la aplicación en modo de desarrollo, asegúrate de configurar la variable de entorno en 'develop':

   ```bash
   export FLASK_ENV=develop  # Linux/Mac
   set FLASK_ENV=develop  # Windows
   ```

2. **Ejecutar el Servidor de Desarrollo:**

   ```bash
   python shoe-craft/server/dev.py
   ```

   Esto iniciará el servidor de desarrollo en `http://localhost:5000/`.

## Producción

Para ejecutar la aplicación en un entorno de producción, sigue estos pasos:

1. **Configurar Variable de Entorno:**

   Asegúrate de configurar la variable de entorno en 'production':

   ```bash
   export FLASK_ENV=production  # Linux/Mac
   set FLASK_ENV=production  # Windows
   ```

2. **Ejecutar el Servidor de Producción:**

   ```bash
   python shoe-craft/server/app.py
   ```

   La aplicación estará disponible en `www.tudominio.com`.

Este comando ejecutará el servidor en modo de producción, optimizado para rendimiento. Asegúrate de configurar apropiadamente tu entorno de producción antes de desplegar la aplicación.

## Configuración

Puedes configurar la aplicación mediante la modificación de archivos de configuración o mediante variables de entorno. Asegúrate de revisar y ajustar la configuración según tus necesidades antes de desplegar la aplicación en producción.

## Documentación de la API

La documentación de la API está disponible en [https://documenter.getpostman.com/view/20872963/2s9YXfaNrW](https://documenter.getpostman.com/view/20872963/2s9YXfaNrW). Consulta esta documentación para obtener detalles sobre los endpoints y cómo interactuar con la API.


## Contribuciones

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Realiza un fork del repositorio.
2. Crea una nueva rama para tu función o corrección de error: `git checkout -b nombre-de-la-rama`
3. Realiza tus cambios y haz commit: `git commit -m "Descripción de los cambios"`
4. Haz push a tu rama: `git push origin nombre-de-la-rama`
5. Crea un pull request en GitHub.

## Problemas y Sugerencias

Si encuentras algún problema o tienes sugerencias para mejorar el proyecto, por favor [crea un issue](https://github.com/tu-usuario/shoe-craft/issues).

¡Gracias por contribuir!