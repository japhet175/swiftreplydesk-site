/* ============================================================
   SwiftReplyDesk — main.js
   Menu mobile, accordéon FAQ, pré-remplissage du sujet de contact,
   année dynamique, animation d'apparition au scroll.
   ============================================================ */
(function () {
  'use strict';

  /* ---- Menu mobile ---- */
  var btn = document.getElementById('menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (btn && menu) {
    btn.addEventListener('click', function () {
      var hidden = menu.classList.toggle('hidden');
      var open = !hidden;
      btn.setAttribute('aria-expanded', String(open));
      var icon = btn.querySelector('i');
      if (icon) {
        icon.className = open ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
      }
    });
  }

  /* ---- Accordéon FAQ ---- */
  document.querySelectorAll('.accordion-btn').forEach(function (b) {
    b.addEventListener('click', function () {
      var item = b.closest('.accordion-item');
      if (!item) return;
      var wasOpen = item.classList.contains('open');
      // Ferme les autres items du même accordéon
      var parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.accordion-item.open').forEach(function (i) {
          if (i !== item) i.classList.remove('open');
        });
      }
      item.classList.toggle('open', !wasOpen);
    });
  });

  /* ---- Pré-remplissage du sujet de contact via ?subject=... ou ?service=... ---- */
  var params = new URLSearchParams(window.location.search);
  var subject = params.get('subject') || params.get('service');
  if (subject) {
    var sel = document.getElementById('subject');
    if (sel) {
      var found = false;
      for (var i = 0; i < sel.options.length; i++) {
        if (sel.options[i].value === subject) { sel.selectedIndex = i; found = true; break; }
      }
      if (!found) {
        // Ajoute une option temporaire si le sujet n'existe pas
        var opt = document.createElement('option');
        opt.value = subject; opt.textContent = subject; opt.selected = true;
        sel.appendChild(opt);
      }
    }
  }

  /* ---- Année dynamique ---- */
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();

  /* ---- Apparition au scroll ---- */
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();


/* ---- Bascule thème clair / sombre ---- */
(function () {
  var btn = document.createElement('button');
  btn.className = 'theme-toggle';
  btn.setAttribute('aria-label', 'Basculer le thème clair / sombre');
  btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
  document.body.appendChild(btn);

  function apply(dark) {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
    btn.innerHTML = dark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
  }
  var saved = null;
  try { saved = localStorage.getItem('srd-theme'); } catch (e) {}
  apply(saved === 'dark');
  btn.addEventListener('click', function () {
    var dark = document.documentElement.getAttribute('data-theme') !== 'dark';
    apply(dark);
    try { localStorage.setItem('srd-theme', dark ? 'dark' : 'light'); } catch (e) {}
  });
})();


/* ---- Formulaires : envoi direct dans la boîte mail (via FormSubmit, sans serveur) ---- */
(function () {
  function show(el, on) { if (el) el.hidden = !on; }
  document.querySelectorAll('input[type="date"][data-min-today]').forEach(function (i) {
    i.min = new Date().toISOString().slice(0, 10);
  });
  document.querySelectorAll('form[data-srd-form]').forEach(function (form) {
    var ok = form.querySelector('[data-form-success]');
    var err = form.querySelector('[data-form-error]');
    var btn = form.querySelector('button[type="submit"]');
    var label = btn ? btn.innerHTML : '';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var honey = form.querySelector('[name="_honey"]');
      if (honey && honey.value) return;
      var data = {};
      new FormData(form).forEach(function (v, k) { if (k !== '_honey') data[k] = v; });
      data._subject = (form.getAttribute('data-subject-prefix') || '[SwiftReplyDesk] ') + (data.subject || '');
      data._template = 'table';
      data._captcha = 'false';
      var ar = form.getAttribute('data-autoresponse');
      if (ar) data._autoresponse = ar;
      show(ok, false); show(err, false);
      if (btn) { btn.disabled = true; btn.innerHTML = btn.getAttribute('data-sending') || '…'; }
      fetch(form.getAttribute('data-endpoint'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (res) {
          if (res.ok && (res.j.success === true || res.j.success === 'true')) { show(ok, true); form.reset(); }
          else { show(err, true); }
        })
        .catch(function () { show(err, true); })
        .then(function () { if (btn) { btn.disabled = false; btn.innerHTML = label; } });
    });
  });
})();

/* ---- Bouton WhatsApp flottant ---- */
(function () {
  var fr = (document.documentElement.lang || 'en').slice(0, 2) === 'fr';
  var a = document.createElement('a');
  a.className = 'wa-float';
  a.href = 'https://wa.me/250798980113?text=' + encodeURIComponent('Hello! 👋 Welcome to SwiftReplyDesk. Which service are you interested in? (UnlockBill, SomaGuide, training, custom development, or other)');
  a.target = '_blank';
  a.rel = 'noopener';
  a.setAttribute('aria-label', fr ? 'Discuter sur WhatsApp' : 'Chat on WhatsApp');
  a.innerHTML = '<i class="fa-brands fa-whatsapp"></i>';
  document.body.appendChild(a);
})();

/* ---- Statistiques de visites (Vercel Web Analytics, sans cookies) ---- */
(function () {
  var h = location.hostname;
  if (h === 'localhost' || h === '127.0.0.1') return;
  window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };
  var s = document.createElement('script');
  s.defer = true;
  s.src = '/_vercel/insights/script.js';
  document.head.appendChild(s);
})();
