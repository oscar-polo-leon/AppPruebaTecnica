# App-prueba-tecnica

Este proyecto es una aplicacion en Angular 18. La siguiente guía te ayudará a configurar y ejecutar el proyecto en tu entorno local.

## Pasos para Configurar y Ejecutar el Proyecto

### 1. Clonar el Repositorio
Primero, clona el repositorio en tu máquina local usando el siguiente comando:

```bash
git https://github.com/oscar-polo-leon/AppPruebaTecnica.git
```

### 2. Abrir el proyecto en Visual Studio Code
```bash
code .
```

### 3. Instalar las dependencias
Navega a la carpeta del proyecto y ejecuta el siguiente comando para instalar todas las dependencias necesarias:

```bash
npm install
```

### 4. Verificar la URL de la API
Abre el archivo src/environments/environment.ts y verifica que la propiedad apiUrl esté configurada correctamente:

```bash
export const environment = {
  production: false,
  apiUrl: 'https://localhost:7253'
};
```

### 5. Ejecutar la aplicación
La aplicación estará disponible en http://localhost:4200.

```bash
ng serve
```
