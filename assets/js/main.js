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
