# offshore.cam

OFFSHORE — medio en español de estilo de vida de lujo, accesorios premium y piezas a medida, con presencia en todas
las redes. Servicios para marcas: sesión de fotos, contenido con IA y videografía, cotizados por servicio. «Match de
marcas»: unimos marcas afines en una misma producción y el costo de producción se divide entre ellas.

- HTML + CSS + JS estático, sin build. Rutas relativas: funciona con doble clic y en cualquier subcarpeta.
- `index.html` · `css/offshore.css` · `js/offshore.js` · `images/marca/offshore-emblema.jpg` (logo Gemini, fondo blanco;
  se integra con `mix-blend-mode: multiply`; los «detalles» editoriales son recortes CSS del mismo emblema).
- Cotiza: el formulario arma un correo (`mailto:`) a `CORREO` en `js/offshore.js`. Sin servidor ni datos guardados.

Pendiente: confirmar `hola@offshore.cam`, handles reales de redes (hoy @offshore.cam / offshorecam), fotos reales
de producciones, aviso de privacidad, logo vectorial/transparente.

## 1.3.0 · páginas por tema
- `index.html` = solo portada (cubierta N.º 01 Invierno 2026) + índice vertical.
- Un tema por carpeta: `editorial/ portafolio/ servicios/ colaboraciones/ a-medida/ premium/ canales/ cotiza/`
  (cada una con `index.html`, anterior/siguiente al pie). Enlaces a `…/index.html` para que funcione con doble clic.
- Menú: **Portadas ▾** (Invierno 2026) · **Nosotros ▾** (Editorial, Portafolio, Canales) · **Servicios ▾** (Filmación,
  Fotografía, Agentes → anclas `#filmacion #fotografia #agentes` en `servicios/`) · **Difusión ▾** (Producto premium,
  A medida) · **Colaboraciones** · **Cotizar**.
- Móvil (≤760 px): arriba fecha · Cotizar · OFFSHORE; al bajar (>80 px) solo una franja con botón cuadrado 26 px a la
  izquierda y OFFSHORE pequeño a la derecha. «Cotizar X →» abre `cotiza/index.html?servicio=X`.
- Cabecera/pie/menú se generan con `_interno/herramientas/paginas.py` (fuente: `_interno/index-1.2.4.html`); correrlo sobrescribe las páginas.
