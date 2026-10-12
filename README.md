# LUMO · Historias de bolsillo

**Juego NUEVO e independiente**, diseñado para evocar la sensación de los plataformas J2ME de los Nokia de botones. **No es Bounce Tales ni un port**, no incluye personajes, música, fuentes, código, niveles o gráficos recuperados de Bounce Tales ni está afiliado a Nokia o Rovio. El nombre, guion, sprites generados por Canvas y las ocho composiciones MIDI son originales de este paquete.

## JUGAR EN iPHONE Y PUBLICAR (solo archivos sueltos)

1. Descomprime `LUMO_Historias_de_Bolsillo.zip` en la app Archivos del iPhone.
2. Abre el repositorio nuevo en GitHub en Safari. En la raíz pulsa **Add file > Upload files**, selecciona **TODOS los archivos que están directamente dentro de la carpeta descomprimida**. NO subas el archivo .zip ni la carpeta contenedora.
3. Confirma **Commit changes**.
4. Ve a **Settings > Pages**, en **Build and deployment** elige **Deploy from a branch**, `main` y `/(root)` y pulsa **Save**.
5. Tu página quedará normalmente como `https://TU-USUARIO.github.io/TU-REPOSITORIO/` al finalizar el despliegue.
6. En iPhone abre ese enlace y toca **ACEPTAR** en el teclado de la página. Los navegadores requieren un toque antes de activar el audio. Puedes usar **Compartir > Añadir a pantalla de inicio** para jugar como web app. Tras cargar una vez con conexión, el service worker puede permitir uso sin conexión si Safari ha almacenado los recursos.

**No necesitas servidor de pago, PC, Node, compiladores, npm, bibliotecas ni carpetas.** Los archivos `.mid` son materiales de música editables y se pueden descargar individualmente, mientras `scores.js` reproduce sus notas con síntesis WebAudio para evitar depender del sintetizador MIDI del navegador.

## CONTROLES

- Botones `◀` / `▶`: moverse.
- Botón `↑`: saltar; con forma BRISA, mantenerlo permite caer despacio.
- Botón `◈`: cambiar entre LUMO (equilibrado), BRISA (ligera) y PIEDRA (rompe cajas al correr).
- ACEPTAR: entrar a niveles / leer cartel / pasar al siguiente.
- VOLVER: pausa / menú.
- Teclado externo: flechas o A/D, Espacio para saltar, X para cambiar, Enter y Escape. También teclas 4/6/2/5.
- Música: botón `♫` arriba de la consola, o en Ajustes.

## CONTENIDO

- 15 niveles originales divididos en tres capítulos, con comienzo, objetivo, historia y final.
- Escenarios 2D con desplazamiento, paralaje, plataformas, polen/semillas, banderines de checkpoint, saltadores, pinchos, cajas y enemigos.
- Tres formas físicas con distintas aceleraciones, radios, velocidad máxima y gravedad.
- Ocho temas musicales originales construidos en formato Standard MIDI y sintetizados en el navegador: menú, bosque, minas, carnaval, tensión, bonus, derrota y victoria.
- Música en bucle por estado, una pieza principal a la vez, breve fanfarria al ganar/perder; adaptación al patrón de diseño retro.
- HUD, guardado automático de niveles abiertos, estrellas, mejores puntuaciones y logros vía localStorage.
- Optimizado para ejecutarse sin Internet una vez almacenado, usando gráficos Canvas en resolución 384×256 y pocos objetos.

## ARCHIVOS RAÍZ

| Archivo | Uso |
|---|---|
| `index.html` | Página de entrada |
| `style.css` | Consola visual y botones para iPhone |
| `game.js` | Estados, motor de físicas, dibujo, controles y progreso |
| `levels.js` | Progresión, escenarios y narrativa |
| `audio.js` | Síntesis de audio y eventos |
| `scores.js` | Partituras originales de ocho pistas |
| `musica_*.mid` | 8 archivos MIDI originales, editables |
| `icon.png` | Icono original |
| `manifest.webmanifest` | Web app instalable |
| `sw.js` | Caché offline |

## NOTAS TÉCNICAS / DIFERENCIAS RESPECTO A LA REFERENCIA

El paquete es una **versión 1 jugable**, no una reconstrucción 1:1 de Bounce Tales. El menú, mapa, personajes y niveles son propios; los fondos, los enemigos y las canciones son nuevos. La fidelidad buscada es de *experiencia* y arquitectura técnica: imágenes compactas, botones físicos simulados, Java ME como inspiración, capas bidimensionales, tres temas de acto, tres secciones intensas y tres de recompensa. Esta versión **no** contiene batallas de jefe complejas ni el diseño de niveles original.

La investigación histórica apunta al repositorio de preservación/decompilación [HelloOO7/BounceTales](https://github.com/HelloOO7/BounceTales), que aclara que los recursos del juego se obtienen a partir de un JAR del usuario y **no se distribuyen en su repositorio**. El código decompilado no es el proyecto original del desarrollador. Referencias de estudio: [MIDI Association](https://midi.org/standard-midi-files) y [Java ME MMAPI](https://docs.oracle.com/javame/config/cldc/opt-pkgs/api/mm/jsr135/javax/microedition/media/Manager.html).

> Para distribuir tu propio juego, usa el material original incluido aquí o materiales cuya licencia permita su distribución. Encontrar un archivo en la web no autoriza a redistribuirlo.

## AJUSTES / MANTENIMIENTO

- Para cambiar historias: modifica `LEVEL_DESIGNS` en `levels.js`.
- Para personalizar la música: edita `scores.js`; si cambias la partitura, regenera los `.mid` para que ambas versiones coincidan.
- Para cambiar física: matrices `ax/max/gravity/jump` de `game.js`.
- El progreso se guarda por navegador y por dirección web, no en la nube.
- Si editas archivos después de publicar y parece que el navegador sigue con la versión anterior, cambia `CACHE='lumo-pocket-v1'` en `sw.js` a `v2`, para forzar actualizar la caché offline.

Copyright 2026. Archivos creados para este prototipo y entregados para uso y modificación del proyecto. No se concede ninguna licencia sobre marcas o materiales externos de Nokia, Rovio o Bounce Tales.
