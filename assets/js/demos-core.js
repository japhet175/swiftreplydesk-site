/* SwiftReplyDesk — noyau des démos interactives (données fictives) */
(function () {
  var L = (document.documentElement.lang || 'fr').slice(0, 2) === 'en' ? 'en' : 'fr';
  var reg = {};
  function h(tag, props) {
    var e = document.createElement(tag);
    props = props || {};
    for (var k in props) {
      var v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'html') e.innerHTML = v;
      else if (k === 'style') e.style.cssText = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (var i = 2; i < arguments.length; i++) add(e, arguments[i]);
    return e;
  }
  function add(e, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) c.forEach(function (x) { add(e, x); });
    else e.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
  }
  function T(o) { return o && typeof o === 'object' && !Array.isArray(o) && (o[L] !== undefined) ? o[L] : o; }
  function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function clear(e) { while (e.firstChild) e.removeChild(e.firstChild); return e; }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  function pill(kind, text, icon) { return h('span', { class: 'dm-pill ' + kind }, icon ? h('i', { class: icon }) : null, text); }
  function note(text) { return h('p', { class: 'dm-note' }, text); }
  window.SRD = { t: function (fr, en) { return L === 'fr' ? fr : en; }, L: L, h: h, T: T, fmt: fmt, esc: esc, clear: clear, sleep: sleep, pill: pill, note: note, reg: function (k, f) { reg[k] = f; } };
  document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('demo-root');
    if (!root) return;
    var f = reg[root.getAttribute('data-demo')];
    if (!f) return;
    root.classList.add('dm');
    try { f(root); } catch (e) { console.error(e); }
  });
})();
