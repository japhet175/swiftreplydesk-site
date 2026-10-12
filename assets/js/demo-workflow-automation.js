(function(){var S=SRD,h=S.h,t=S.t,pill=S.pill;
S.reg('workflow-automation',function(root){
var scen='ok',busy=false,orders=20,mins=10;
var steps=function(){return [
 {ic:'fa-envelope',a:t('Email de commande reçu','Order email received'),d:t('« Bonjour, 40 cahiers A4 pour vendredi. — Mme Uwase, École Imena (fictive) »','"Hello, 40 A4 notebooks for Friday. — Ms Uwase, Imena School (fictional)"')},
 {ic:'fa-brain',a:t('L\'IA lit le message','AI reads the message'),d:t('Client : École Imena · Produit : cahiers A4 · Quantité : 40 · Date : vendredi','Customer: Imena School · Product: A4 notebooks · Quantity: 40 · Date: Friday')},
 {ic:'fa-table',a:t('Ajout au tableur des commandes','Added to the orders spreadsheet'),d:t('Ligne n° 128 créée','Row no. 128 created')},
 {ic:'fa-boxes-stacked',a:t('Vérification du stock','Stock check'),d:scen==='ok'?t('Stock disponible : 120 · OK','Stock available: 120 · OK'):t('Stock disponible : 25 · insuffisant','Stock available: 25 · not enough'),bad:scen!=='ok'},
 scen==='ok'?{ic:'fa-file-invoice',a:t('Facture en brouillon créée','Draft invoice created'),d:t('Brouillon prêt à valider','Draft ready to approve')}:{ic:'fa-bell',a:t('Alerte au responsable','Alert to the manager'),d:t('« Commande de 40 cahiers : stock insuffisant, à réapprovisionner »','"Order for 40 notebooks: not enough stock, restock needed"')},
 {ic:'fa-whatsapp fa-brands',a:t('Message au client','Message to the customer'),d:scen==='ok'?t('« Commande reçue. Livraison prévue vendredi. »','"Order received. Delivery planned for Friday."'):t('« Commande reçue. Nous confirmons la date dès que possible. »','"Order received. We will confirm the date as soon as possible."')}];};
var list=h('div'),lg=h('div',{class:'dm-log'}),sav=h('div'),btn=h('button',{class:'dm-btn pri'},t('Lancer le workflow','Run the workflow'));
function draw(states){S.clear(list);steps().forEach(function(s,i){var st=states[i]||'';var c='dm-step'+(st==='act'?' act':st==='done'?' done':'');
 list.appendChild(h('div',{class:c},h('b',{class:'ic'},h('i',{class:s.ic.indexOf('brands')>-1?s.ic:'fa-solid '+s.ic})),h('div',{style:'flex:1'},h('b',null,(i+1)+' · '+s.a),h('div',{class:'dm-sm dm-mu'},st?s.d:'')),st==='done'?pill(s.bad?'wn':'ok',s.bad?t('Attention','Warning'):'OK'):st==='act'?h('span',{class:'dm-pulse'},'…'):''));
 if(i<5)list.appendChild(h('div',{class:'dm-arrow'},h('i',{class:'fa-solid fa-arrow-down'})));});}
async function run(){if(busy)return;busy=true;btn.disabled=true;S.clear(lg);var st=[];
 for(var i=0;i<6;i++){st[i]='act';draw(st);await S.sleep(800);st[i]='done';draw(st);lg.appendChild(h('div',null,'00:0'+i+' · '+steps()[i].a));}
 lg.appendChild(h('div',{style:'font-weight:700'},t('Terminé en quelques secondes, sans intervention humaine (sauf validation du brouillon).','Done in a few seconds, with no human involvement (except approving the draft).')));busy=false;btn.disabled=false;}
function calc(){var hrs=orders*4.3*mins/60;S.clear(sav);sav.appendChild(h('div',{class:'dm-kpi'},h('b',null,hrs.toFixed(1).replace('.',t(',','.'))+' h'),h('span',null,t('Heures gagnées par mois (hypothèse ci-contre)','Hours saved per month (assumption beside)'))));}
btn.addEventListener('click',run);
var sel=h('select',{class:'dm-input',style:'width:auto'},h('option',{value:'ok'},t('Scénario : stock disponible','Scenario: stock available')),h('option',{value:'low'},t('Scénario : stock insuffisant','Scenario: not enough stock')));sel.onchange=function(){scen=sel.value;draw([]);};
var o1=h('input',{type:'number',min:1,value:orders,class:'dm-input',style:'width:6rem'}),o2=h('input',{type:'number',min:1,value:mins,class:'dm-input',style:'width:6rem'});
o1.oninput=function(){orders=Math.max(0,+o1.value||0);calc();};o2.oninput=function(){mins=Math.max(0,+o2.value||0);calc();};
draw([]);calc();
root.appendChild(h('div',{class:'dm-bar'},btn,sel));
root.appendChild(h('div',{class:'dm-grid two'},h('div',{class:'dm-box'},h('h3',null,t('Le workflow','The workflow')),list),h('div',null,h('div',{class:'dm-box'},h('h3',null,t('Journal d\'exécution','Run log')),lg),
 h('div',{class:'dm-box',style:'margin-top:1.25rem'},h('h3',null,t('Estimez le temps libéré','Estimate the time freed')),h('div',{style:'display:flex;gap:.8rem;flex-wrap:wrap;align-items:center;margin-bottom:.8rem'},h('label',{class:'dm-sm'},t('Commandes par semaine ','Orders per week '),o1),h('label',{class:'dm-sm'},t('Minutes par commande (à la main) ','Minutes per order (by hand) '),o2)),sav,h('p',{class:'dm-sm dm-mu',style:'margin-top:.6rem'},t('Calcul simple : commandes × 4,3 semaines × minutes. Entrez vos propres chiffres.','Simple calculation: orders × 4.3 weeks × minutes. Enter your own figures.'))))));
root.appendChild(S.note(t('Simulation avec une entreprise fictive. Les outils réels (email, tableur, WhatsApp, logiciel de facturation) sont choisis avec vous.','Simulation with a fictional company. The real tools (email, spreadsheet, WhatsApp, invoicing software) are chosen with you.')));
});})();
