# Generador de Paletas de Colores

**Proyecto Integrador — Módulo 1 | Full Stack**  
**Autor:** Nahuel Ramirez  
**Demo:** [https://nahuel-mram.github.io/proyecto-m1/](https://nahuel-mram.github.io/proyecto-m1/)

---

## ¿Qué es esta aplicación?

Un generador de paletas de colores aleatorias. El usuario puede elegir cuántos colores quiere ver (6, 8 o 9), generar la paleta con un botón, alternar entre los formatos HEX y HSL, y copiar cualquier código al portapapeles con un solo clic.

---

## Instrucciones de uso

1. Seleccioná la cantidad de colores desde el desplegable (6, 8 o 9).
2. Hacé clic en **Generar Paleta**.
3. Usá el toggle **HEX / HSL** para cambiar el formato de los códigos.
4. Hacé clic sobre cualquier tarjeta para copiar su código al portapapeles.
5. Un mensaje de confirmación (toast) aparece cada vez que se copia un color o se genera una paleta nueva.

---

## Cómo ejecutar el proyecto localmente

No requiere instalación ni servidor. Solo:

1. Cloná o descargá el repositorio.
2. Abrí el archivo `index.html` directamente en tu navegador.

---

## Cómo deployar en GitHub Pages

1. Subí los archivos al repositorio en la rama `main`.
2. Entrá a **Settings → Pages**.
3. En la sección **Branch**, seleccioná `main` y guardá.
4. Después de unos minutos, la app queda disponible en `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

---

## Estructura del proyecto

```
Proyecto-M1/
├── index.html     → Estructura y semántica de la página
├── styles.css     → Estilos visuales
└── app.js         → Lógica de la aplicación
```

---

## Decisiones técnicas

**Separación en tres archivos**  
Se separó el HTML, CSS y JS en archivos distintos para respetar el principio de separación de responsabilidades y facilitar la lectura y el mantenimiento del código.

**Generación dinámica del DOM**  
Las tarjetas de colores no están en el HTML — se crean desde JavaScript con `createElement` y se insertan en el DOM cada vez que el usuario genera una paleta. Esto permite que la cantidad de tarjetas sea flexible sin tocar el HTML.

**Dos formatos de color**  
Se implementaron HEX y HSL porque cada uno tiene utilidad distinta: HEX es el más usado en diseño web, HSL es más intuitivo para ajustar tonos manualmente. Un toggle permite cambiar entre ellos sin regenerar la paleta.

**Toast como microfeedback**  
Se eligió un toast en lugar de un `alert()` porque no interrumpe al usuario y es más apropiado para una experiencia de uso fluida.

**CSS sin estilos inline**  
Todos los estilos están en `styles.css`. El único uso de estilos aplicados desde JS es `style.backgroundColor` en el bloque de color de cada tarjeta, lo cual es necesario porque el color es dinámico y no puede definirse en el CSS estático.

---

## Tech stack

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (DOM, eventos, Clipboard API)
- Git / GitHub
- GitHub Pages
