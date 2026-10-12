# Bounce Tales · Reconstrucción web PERSONAL v0.1

Código HTML/JavaScript propio, creado a partir de la comparación del JAR **Bounce Tales 2.0.28** proporcionado por el propietario y de información técnica del proyecto de decompilación [HelloOO7/BounceTales](https://github.com/HelloOO7/BounceTales). Se contrastó el enfoque con la metodología del proyecto [morluto/rea](https://github.com/morluto/rea). **REA no se ejecutó como herramienta en este entorno ni se integró en el juego**; el análisis se hizo con herramientas de inspección ZIP y un parser binario propio.

## PUBLICAR EN GITHUB PAGES SIN COMPARTIR LOS GRÁFICOS ORIGINALES

1. Descomprime `BounceTales_Web_MOTOR_Publicable.zip` en tu iPhone.
2. Sube sus archivos sueltos (`index.html`, `style.css`, `game.js`, `manifest.webmanifest` y este README) a la raíz de tu repositorio.
3. Activa **Settings → Pages → Deploy from a branch → main → /(root)**.
4. Abre la web desde Safari.
5. Toca **IMPORTAR PAQUETE .BTPACK** y elige `BounceTales_PERSONAL.btpack`, que se entrega en una descarga SEPARADA, **solo para guardar en tu iPhone**.
6. El paquete se lee y guarda exclusivamente en el navegador mediante IndexedDB. Ninguna imagen o dato del juego se envía a GitHub ni a ningún servidor.

> **No subas el `.jar` ni el `.btpack` a un repositorio público.** Los materiales extraídos del juego original podrían estar protegidos por derechos de autor, aunque tu propósito sea jugar tú mismo. Un repositorio privado y un hospedaje privado son opciones adicionales, pero GitHub Pages de un repositorio público no protege los archivos.

## Funcionalidad real incluida

- Lee un `.btpack` generado a partir del JAR que subiste.
- Carga los PNG originales localmente y recorta 259 entradas de atlas, con otras 210 definiciones de sprite (simples, compuestos y animados).
- Dibuja geometría triangulada **real** de los 15 archivos RLEF de niveles jugables; un 16.º archivo contiene objetos compartidos, no es una fase.
- Recupera desde los datos RLEF la posición de jugador, 3D-free 2D geometría, huevos y diversos sprites; hace desplazamiento de cámara.
- Implementa colisión aproximada mediante las aristas externas de triángulos, salto, movimiento, recolección de huevos, menú y selector de nivel, teclado Nokia virtual, soporte iPhone y progreso guardado.
- El juego se ejecuta sin emulador J2ME, mediante Canvas y JavaScript.

## Límites que debes conocer

Esta es **una primera reconstrucción funcional**, NO una conversión fiel 1:1 del motor Java ME: los eventos de scripts por nivel, jefes, interacciones complejas, plataformas móviles, agua, todas las transformaciones, afinación de físicas y secuencias finales **no están traducidos todavía**. El paso al nivel siguiente por desplazamiento al final es provisional. La reconstrucción permite **inspeccionar los escenarios auténticos, moverse y recoger objetos**; no garantiza completarlos tal como en el juego antiguo. Tampoco se ha ejecutado en un iPhone real todavía.

**Música:** el índice de tu JAR contiene referencias a ocho `.mid`, pero esos ocho archivos **no están presentes** en el ZIP aportado. Por eso no hemos añadido ninguna canción inventada y no puede sonar la OST original. Solo se sintetizan sonidos originales simples en algunos eventos (interacción, salto, recolección).

## Licencias y referencias

- El runtime JavaScript y los estilos incluidos son creación nueva para esta reconstrucción de uso personal.
- Los sprites y niveles importados desde el paquete `.btpack` se derivan del JAR proporcionado, no se redistribuyen junto con los archivos destinados a GitHub.
- Repositorio de ingeniería inversa: https://github.com/HelloOO7/BounceTales
- REA (metodología de inspección): https://github.com/morluto/rea

## Conservación y mantenimiento

- El `.btpack` personal es JSON codificado en UTF-8 con extensión específica, no un instalador. El código revisa la firma de formato antes de importarlo.
- Puedes borrar datos locales del sitio en la configuración de Safari si deseas quitar el archivo privado almacenado allí.
- Para recargarlo, usa «Cambiar paquete» debajo del juego.
