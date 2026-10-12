# LUMO · Edición de bolsillo retro (V2, 2026)

Reconstrucción visual **original e independiente**, inspirada en las técnicas gráficas estudiadas de *Bounce Tales* (Rovio, Nokia, 2008). **No contiene el juego de Nokia** ni su código fuente, mapas originales, gráficos, música o texturas extraídas. Este proyecto sigue siendo **LUMO**: un homenaje jugable con estética mucho más próxima, no una conversión 1:1 ni un port.

## Qué cambió respecto a tu repositorio

- **Suelo y plataformas:** dejan de ser bloques rectangulares rígidos. El dibujado usa polígonos, contornos oscuros, franja de hierba viva y curvas suaves; la curva de colisión del suelo concuerda con su contorno visual.
- **Paleta similar a los móviles S40:** cielo azul fuerte, capas de árboles y nubes, suelos muy oscuros, vegetación verde brillante y flores blancas grandes en el primer acto. Los actos posteriores conservan gamas violetas/doradas diferenciadas.
- **Personaje:** pelota roja de contorno oscuro, volumen, brillo blanco, ojos expresivos; variantes ligeras y pesadas con aspecto propio.
- **Elementos:** huevos con sombreado, plantas, hongos, plataformas flotantes, letrero de dirección, obstáculos, checkpoint, portales, enemigos y partículas. Ilustrados mediante Canvas, sin recursos ajenos.
- **HUD:** contador de huevos, reloj compacto y vidas; menú ilustrado menos moderno, con opciones al estilo teléfono clásico.
- **Se conservan:** 15 niveles originales de LUMO, teclado táctil, controles externos, música de ocho temas originales en MIDI/WebAudio, progresión y guardado local.

## Instalación desde iPhone / GitHub Pages

1. Descomprime el ZIP con **Archivos**.
2. En el repositorio GitHub, ve a **Add file > Upload files**.
3. Selecciona **todos los archivos sueltos** de la carpeta descomprimida. No subas el ZIP ni la carpeta.
4. Pulsa **Commit changes**.
5. En **Settings > Pages**, elige **Deploy from a branch**, `main`, `/(root)` y **Save**.
6. Espera a que la publicación termine. Abre `https://IzayTO.github.io/Bounce-Tales/`.

El juego no necesita servidor de pago, librerías ni compilación. Al actualizar puede ser necesario recargar la página por la caché del navegador.

## Archivos principales

- `index.html`: entrada GitHub Pages y estructura de los botones.
- `style.css`: marco de teléfono responsivo y controles.
- `game.js`: física, colisiones, cámara, progresión, controles y conexión al nuevo dibujado.
- **`retro_art.js`**: nuevo motor de arte 2D, polígonos, plantas, personaje, enemigos, HUD y menú; contiene todos los dibujos de esta versión.
- `levels.js`: los 15 niveles originales del prototipo, no los de Bounce Tales.
- `scores.js`, `audio.js`, `musica_*.mid`: partituras, sintetizador y ocho archivos MIDI originales.
- `icon.png`, `manifest.webmanifest`, `sw.js`: instalación y caché offline.

## Referencia forense usada

[HelloOO7/BounceTales](https://github.com/HelloOO7/BounceTales), proyecto de decompilación de un juego Java ME. En concreto:

- `BounceTales/src/bouncetales/GeometryObject.java`: representación del terreno y otros objetos con vértices, índices y `Graphics.fillTriangle(...)`.
- `BounceTales/src/bouncetales/SpriteObject.java`: uso de imágenes y selección de cuadros según temporizadores.
- `BounceTales/src/bouncetales/BounceGame.java`: desplazamiento de fondos por capas, dibujo de recursos, HUD y menús.
- `BounceTales/src/bouncetales/ResourceID.java`: catálogo de sprites, imágenes, niveles y música.

Ese proyecto explica expresamente que **no incluye los recursos originales listos para utilizar**, que requieren un JAR del juego y una herramienta de extracción (`BounceComposer`). Este ZIP no los contiene ni implementa un emulador J2ME. Para lograr fidelidad total a la edición original habría que estudiar con autorización la versión exacta del JAR, su animación y sus mapas. No deben publicarse los materiales protegidos sin la licencia correspondiente.

## Limitaciones y pruebas

Probado sintácticamente con Node y renderizado en Chromium en un entorno aislado, tanto en menú como en nivel 1. La ejecución en un iPhone físico y la reproducción completa de los 15 niveles todavía deben validarse. La lógica de LUMO se conserva, pero el diseño y las físicas de sus niveles **no son idénticos** a *Bounce Tales*.

© 2026. Código de la recreación visual elaborado para este prototipo. Ninguna marca ni obra original de Rovio/Nokia está incluida.
