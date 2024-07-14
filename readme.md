# Setup geyser 
1. ubicate en index.js (la que esta en source) y escribir en la consola

npm init --yes

2. como segundo paso hay que escribir en la terminal y escribir 

    npm i express morgan

3. como tercer paso hay que instalar nodemon, en la terminal escribir 

    npm i nodemon -D

4. por ultimo instalar axios

    npm i axios
# con esto listo, ahora cada que se quiera ver el servidor en funcionamiento hay que escribir en la consola npm run dev

## para crear esta app
    coloque en la terminal: 
    cordova create Hanami

## para instalar android en el proyecto
    luego debo ubicarme con cd o aqui en VSC con Open in integrated terminal en la carpeta www y poner:
    cordova platform add android

## con el emulador de Android Studio abierto nos situamos en la carpeta del proyecto
    escribir en la terminal:
    cordova build android
    cordova emulate android

# 9 posiciones clave en flex (usar en los items de un contenedor)

# Superior izquierda
.superior-izquierda {
    align-items: flex-start; 
    justify-content: flex-start; 
}

# Superior centro
.superior-centro {
    align-items: flex-start;
    justify-content: center; 
}

# Superior derecha
.superior-derecha {
    align-items: flex-start;
    justify-content: flex-end; 
}

# Centro izquierda
.centro-izquierda {
    align-items: center; 
    justify-content: flex-start;
}

# Centro
.centro {
    align-items: center;
    justify-content: center;
}

# Centro derecha
.centro-derecha {
    align-items: center;
    justify-content: flex-end;
}

# Inferior izquierda
.inferior-izquierda {
    align-items: flex-end; 
    justify-content: flex-start;
}

# Inferior centro
.inferior-centro {
    align-items: flex-end;
    justify-content: center;
}

# Inferior derecha
.inferior-derecha {
    align-items: flex-end;
    justify-content: flex-end;
}
