/* OFFSHORE · offshore.cam · 1.3.0 — sin dependencias; una página por tema */
(function () {
  "use strict";
  var CORREO = "hola@offshore.cam"; // [[pendiente: confirmar buzón]]

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // Fecha de la barra y año
  var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
  var hoy = new Date();
  $("#fecha").textContent = meses[hoy.getMonth()] + " " + hoy.getFullYear();
  $("#anio").textContent = hoy.getFullYear();
  if ($("#correoDestino")) $("#correoDestino").textContent = CORREO;

  // Cabecera compacta al bajar
  var cab = $("#cabecera");
  var compactar = function () { var y = window.scrollY; if (y > 80) cab.classList.add("compacta"); else if (y < 20) cab.classList.remove("compacta"); };
  window.addEventListener("scroll", compactar, { passive: true });
  compactar();

  // Menú móvil
  var btn = $("#menuBtn"), menu = $("#menu");
  btn.addEventListener("click", function () {
    var abierto = menu.classList.toggle("abierto");
    btn.setAttribute("aria-expanded", abierto);
  });
  $$("a", menu).forEach(function (a) {
    a.addEventListener("click", function () { menu.classList.remove("abierto"); btn.setAttribute("aria-expanded", "false"); });
  });

  // Desplegables: Portadas y Servicios (clic o teclado; en escritorio también al pasar el ratón)
  var abres = $$(".menu__abre", menu);
  function cerrar(excepto) {
    abres.forEach(function (b) { if (b !== excepto) b.setAttribute("aria-expanded", "false"); });
  }
  abres.forEach(function (b) {
    b.addEventListener("click", function (e) {
      e.stopPropagation();
      var abrir = b.getAttribute("aria-expanded") !== "true";
      cerrar(b);
      b.setAttribute("aria-expanded", String(abrir));
    });
  });
  document.addEventListener("click", function (e) { if (!menu.contains(e.target)) cerrar(); });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var abierto = abres.filter(function (b) { return b.getAttribute("aria-expanded") === "true"; })[0];
    cerrar(); if (abierto) abierto.focus();
  });

  // ¿Cómo se divide? Marca principal + colaboradoras
  var barra = $("#repartoBarra"), cuantas = $("#repartoCuantas");
  if (barra) {
  function repartir(n) {
    barra.innerHTML = "";
    var p = document.createElement("div");
    p.className = "principal"; p.textContent = "Principal";
    barra.appendChild(p);
    for (var i = 1; i <= n; i++) {
      var d = document.createElement("div");
      d.textContent = (n > 2 || window.innerWidth < 600) ? "Colab. " + i : "Colaboradora " + i;
      d.style.animationDelay = (i * 60) + "ms";
      barra.appendChild(d);
    }
    cuantas.textContent = "(" + n + ")";
    $$(".reparto__control button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(Number(b.dataset.colab) === n));
    });
  }
  $$(".reparto__control button").forEach(function (b) {
    b.addEventListener("click", function () { repartir(Number(b.dataset.colab)); });
  });
  repartir(1);
  }

  // «Cotizar X →» llega como cotiza/index.html?servicio=X y marca el servicio
  var pedido = /[?&]servicio=(\w+)/.exec(window.location.search);
  if (pedido) {
    var c = $('input[data-clave="' + pedido[1] + '"]');
    if (c) c.checked = true;
  }

  // Cotización → correo prellenado (sin servidor)
  var form = $("#cotizaForm"), aviso = $("#cotizaAviso");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var servicios = $$('input[name="servicio"]:checked', form).map(function (i) { return i.value; });
    var f = form.elements;
    if (!servicios.length) { aviso.textContent = "Elige al menos un servicio."; return; }
    if (!f.marca.value.trim() || !f.nombre.value.trim() || !f.correo.checkValidity() || !f.correo.value) {
      aviso.textContent = "Completa marca, nombre y un correo válido."; return;
    }
    var cuerpo = [
      "Marca: " + f.marca.value.trim(),
      "Nombre: " + f.nombre.value.trim(),
      "Correo: " + f.correo.value.trim(),
      "Instagram / web: " + (f.web.value.trim() || "—"),
      "",
      "Servicios (cotización por servicio):",
      servicios.map(function (s) { return "  · " + s; }).join("\n"),
      "",
      "Colaboración: " + f.colab.value,
      "",
      "Proyecto:",
      f.mensaje.value.trim() || "—"
    ].join("\n");
    var asunto = "Cotización OFFSHORE · " + f.marca.value.trim();
    aviso.textContent = "Abriendo tu correo…";
    window.location.href = "mailto:" + CORREO + "?subject=" + encodeURIComponent(asunto) + "&body=" + encodeURIComponent(cuerpo);
  });

  // Aparición suave
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("visible"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".seccion__cabeza, .nota, .servicio, .portafolio .foto, .equipo .foto, .pasos li, .reparto, .medida > *, .canales li, .cita").forEach(function (el) {
      el.classList.add("revela"); io.observe(el);
    });
  }
})();
