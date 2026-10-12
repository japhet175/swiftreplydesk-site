(function(){var S=SRD,h=S.h,t=S.t,fmt=S.fmt,pill=S.pill;
S.reg('vat-ebm',function(root){
var rows=[
 {id:'V-101',ty:'s',n:'Hôtel Ubuzima (fictif)',ht:500000,tva:90000},{id:'V-102',ty:'s',n:'Kigali Fresh Market (fictif)',ht:200000,tva:36000},{id:'V-103',ty:'s',n:'Maison Gasore (fictif)',ht:150000,tva:27000},
 {id:'V-103',ty:'s',n:'Maison Gasore (fictif)',ht:150000,tva:27000,an:'dup',dup:true},
 {id:'A-201',ty:'p',n:'Imbuto Supplies (fictif)',ht:300000,tva:54000},{id:'A-202',ty:'p',n:'Papeterie Inzira (fictive)',ht:120000,tva:21600},
 {id:'A-203',ty:'p',n:'Garage Ikaze (fictif)',ht:80000,tva:10000,an:'rate'},
 {id:'A-204',ty:'p',n:t('Paiement sans facture : Nyabugogo Trading (fictif)','Payment without invoice: Nyabugogo Trading (fictional)'),ht:200000,tva:36000,an:'missing',absent:true}];
var info={dup:{m:t('Doublon : même numéro que V-103','Duplicate: same number as V-103'),f:t('Retirer le doublon','Remove duplicate')},
 rate:{m:t('TVA de 10 000 au lieu de 14 400 (18 % de 80 000)','VAT of 10,000 instead of 14,400 (18% of 80,000)'),f:t('Facture contrôlée : corriger à 14 400','Invoice checked: correct to 14,400')},
 missing:{m:t('Paiement trouvé sans facture EBM correspondante','Payment found with no matching EBM invoice'),f:t('Facture reçue du fournisseur','Invoice received from supplier')}};
var fixed={};var tb=h('tbody'),kp=h('div',{class:'dm-kpis'}),al=h('div',{style:'display:flex;flex-direction:column;gap:.5rem'});
function val(r){if(r.an&&!fixed[r.an])return null;if(r.dup)return null;var v={ht:r.ht,tva:r.tva};if(r.an==='rate')v.tva=14400;return v;}
function render(){S.clear(tb);S.clear(kp);S.clear(al);var c=0,d=0,open=0;
 rows.forEach(function(r){var v=val(r);var st;
  if(r.an&&!fixed[r.an]){st=pill('wn',t('À vérifier','To check'),'fa-solid fa-triangle-exclamation');open++;}else if(r.dup){st=pill('mu',t('Retirée','Removed'));}else st=pill('ok',t('Contrôlée','Checked'),'fa-solid fa-check');
  if(v){if(r.ty==='s')c+=v.tva;else d+=v.tva;}
  tb.appendChild(h('tr',{class:r.an&&!fixed[r.an]?'hl':''},h('td',null,r.id),h('td',null,r.n),h('td',null,r.ty==='s'?t('Vente','Sale'):t('Achat','Purchase')),h('td',{class:'n'},fmt(r.ht)),h('td',{class:'n'},v?fmt(v.tva):fmt(r.tva)),h('td',null,st)));
  if(r.an&&!fixed[r.an])al.appendChild(h('div',{class:'dm-ck',style:'justify-content:space-between;align-items:center;flex-wrap:wrap'},h('div',null,h('b',null,r.id+' · '),info[r.an].m),h('button',{class:'dm-btn pri',onclick:function(){fixed[r.an]=true;render();}},info[r.an].f)));});
 [[fmt(c),t('TVA sur ventes (RWF)','VAT on sales (RWF)')],[fmt(d),t('TVA sur achats (RWF)','VAT on purchases (RWF)')],[fmt(c-d),t('TVA nette à vérifier (RWF)','Net VAT to check (RWF)')],[open,t('Anomalies restantes','Remaining anomalies')]].forEach(function(x){kp.appendChild(h('div',{class:'dm-kpi'},h('b',null,String(x[0])),h('span',null,x[1])));});
 if(!open)al.appendChild(h('p',{class:'dm-mu'},t('Toutes les anomalies sont traitées : le tableau est prêt à être transmis à votre comptable.','All anomalies are handled: the table is ready to send to your accountant.')));}
var rs=h('button',{class:'dm-btn',onclick:function(){fixed={};render();}},t('Recommencer','Start over'));
root.appendChild(h('div',{class:'dm-bar'},h('b',null,t('Octobre (exemple) · factures EBM lues par l\'IA','October (example) · EBM invoices read by AI')),rs));
root.appendChild(kp);
root.appendChild(h('div',{class:'dm-grid wide-left',style:'margin-top:1.25rem'},
 h('div',{class:'dm-box'},h('h3',null,t('Factures du mois','Invoices of the month')),h('div',{class:'dm-scroll'},h('table',{class:'dm-tbl'},h('thead',null,h('tr',null,[t('N°','No.'),t('Tiers','Party'),'Type',t('HT','Excl. VAT'),'TVA',t('Statut','Status')].map(function(x,i){return h('th',{class:i===3||i===4?'n':''},x);}))),tb))),
 h('div',{class:'dm-box'},h('h3',null,t('Anomalies à traiter','Anomalies to handle')),al)));
root.appendChild(S.note(t('Données fictives. Cet outil prépare et contrôle des données : il ne donne pas de conseil fiscal et ne remplace pas votre comptable, qui reste le dernier relecteur avant toute déclaration.','Fictional data. This tool prepares and checks data: it does not give tax advice and does not replace your accountant, who remains the final reviewer before any filing.')));
render();});})();
