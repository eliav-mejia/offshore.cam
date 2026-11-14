/* OFFSHORE · offshore.cam · 1.0.0 — sin dependencias */
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
  $("#correoDestino").textContent = CORREO;

  // Cabecera compacta al bajar
  var cab = $("#cabecera");
  var compactar = function () { cab.classList.toggle("compacta", window.scrollY > 80); };
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

  // Reparto del costo de producción
  var barra = $("#repartoBarra"), pct = $("#repartoPct");
  function repartir(n) {
    barra.innerHTML = "";
    for (var i = 1; i <= n; i++) {
      var d = document.createElement("div");
      d.textContent = n === 1 ? "Tu marca" : "Marca " + i;
      d.style.animationDelay = (i * 60) + "ms";
      barra.appendChild(d);
    }
    var v = Math.round(1000 / n) / 10;
    pct.textContent = String(v).replace(".", ",") + " %";
    $$(".reparto__control button").forEach(function (b) {
      b.setAttribute("aria-pressed", String(Number(b.dataset.marcas) === n));
    });
  }
  $$(".reparto__control button").forEach(function (b) {
    b.addEventListener("click", function () { repartir(Number(b.dataset.marcas)); });
  });
  repartir(2);

  // Enlaces «Cotizar X» marcan el servicio en el formulario
  $$("[data-servicio]").forEach(function (a) {
    a.addEventListener("click", function () {
      var c = $('input[data-clave="' + a.dataset.servicio + '"]');
      if (c) c.checked = true;
    });
  });

  // Cotización → correo prellenado (sin servidor)
  var form = $("#cotizaForm"), aviso = $("#cotizaAviso");
  form.addEventListener("submit", function (e) {
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
    $$(".seccion__cabeza, .nota, .servicio, .pasos li, .reparto, .medida > *, .canales li, .cita").forEach(function (el) {
      el.classList.add("revela"); io.observe(el);
    });
  }
})();
