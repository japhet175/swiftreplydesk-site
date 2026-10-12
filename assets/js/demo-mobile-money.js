(function(){var S=SRD,h=S.h,T=S.T,fmt=S.fmt,pill=S.pill;
S.reg('mobile-money',function(root){
var tx={
 sales:{fr:'Ventes enregistrées (caisse)',en:'Recorded sales (cash book)'},pays:{fr:'Relevé Mobile Money (importé)',en:'Mobile Money statement (imported)'},
 run:{fr:'Lancer le rapprochement',en:'Run the reconciliation'},reset:{fr:'Recommencer',en:'Start over'},
 cust:{fr:'Client',en:'Customer'},amt:{fr:'Montant',en:'Amount'},st:{fr:'Statut',en:'Status'},ref:{fr:'Réf.',en:'Ref.'},who:{fr:'Expéditeur',en:'Sender'},
 rw:{fr:'Réf. / Expéditeur',en:'Ref. / Sender'},ok:{fr:'Rapproché',en:'Matched'},short:{fr:'Écart de 500',en:'500 short'},nopay:{fr:'Sans paiement',en:'No payment'},unk:{fr:'Paiement inconnu',en:'Unknown payment'},dup:{fr:'Doublon probable',en:'Likely duplicate'},wait:{fr:'En attente',en:'Pending'},
 k1:{fr:'Rapprochés',en:'Matched'},k2:{fr:'Écarts à traiter',en:'To review'},k3:{fr:'Ventes impayées',en:'Unpaid sales'},k4:{fr:'Différence totale (RWF)',en:'Total difference (RWF)'},
 rep:{fr:'Rapport pour votre comptable',en:'Report for your accountant'},
 r1:{fr:'Ventes : 180 800 RWF · Encaissements Mobile Money : 145 500 RWF',en:'Sales: 180,800 RWF · Mobile Money receipts: 145,500 RWF'},
 r2:{fr:'Explication de la différence de 35 300 RWF : 2 ventes sans paiement (69 800), 1 paiement incomplet (500), 2 encaissements à identifier (−35 000).',en:'Explaining the 35,300 RWF difference: 2 sales without payment (69,800), 1 short payment (500), 2 receipts to identify (−35,000).'},
 foot:{fr:'Simulation avec une boutique et des clients fictifs. Sur vos vrais relevés, nous adaptons l\'outil à vos formats (Excel, CSV, PDF).',en:'Simulation with a fictional shop and customers. On your real statements, we adapt the tool to your formats (Excel, CSV, PDF).'}};
var sales=[['S1','Mukamana',12500],['S2','Habimana',8000],['S3','Uwase',45000],['S4','Niyonzima',3500],['S5','Ingabire',27000],['S6','Mugisha',15000],['S7','Uwimana',9800],['S8','Kamanzi',60000]];
var pays=[['P1','MP26-1041','Mukamana',12500],['P2','MP26-1042','Habimana',8000],['P3','MP26-1043','Uwase',45000],['P4','MP26-1044','Niyonzima',3500],['P5','MP26-1045','Ingabire',26500],['P6','MP26-1046','Mugisha',15000],['P7','MP26-1047','Ndayisaba',20000],['P8','MP26-1048','Mugisha',15000]];
var pairs=[['S1','P1'],['S2','P2'],['S3','P3'],['S4','P4'],['S6','P6'],['S5','P5']];
var sT=h('tbody'),pT=h('tbody'),out=h('div'),btn=h('button',{class:'dm-btn pri'},T(tx.run)),rs=h('button',{class:'dm-btn'},T(tx.reset)),busy=false;
function cell(id){return root.querySelector('[data-id="'+id+'"]');}
function build(){S.clear(sT);S.clear(pT);S.clear(out);
 sales.forEach(function(r){sT.appendChild(h('tr',{'data-id':r[0]},h('td',null,r[1]),h('td',{class:'n'},fmt(r[2])),h('td',{'data-s':1},pill('mu',T(tx.wait)))));});
 pays.forEach(function(r){pT.appendChild(h('tr',{'data-id':r[0]},h('td',null,r[1]+' · '+r[2]),h('td',{class:'n'},fmt(r[3])),h('td',{'data-s':1},pill('mu',T(tx.wait)))));});}
function set(id,kind,text,icon){var c=cell(id);c.querySelector('[data-s]').replaceChildren(pill(kind,text,icon));}
async function run(){if(busy)return;busy=true;btn.disabled=true;build();
 for(var i=0;i<pairs.length;i++){var a=pairs[i][0],b=pairs[i][1];cell(a).classList.add('hl');cell(b).classList.add('hl');await S.sleep(600);
  if(a==='S5'){set(a,'wn',T(tx.short),'fa-solid fa-triangle-exclamation');set(b,'wn',T(tx.short),'fa-solid fa-triangle-exclamation');}
  else{set(a,'ok',T(tx.ok),'fa-solid fa-check');set(b,'ok',T(tx.ok),'fa-solid fa-check');}
  cell(a).classList.remove('hl');cell(b).classList.remove('hl');}
 await S.sleep(400);set('P7','bad',T(tx.unk),'fa-solid fa-circle-question');set('P8','bad',T(tx.dup),'fa-solid fa-clone');await S.sleep(500);
 set('S7','bad',T(tx.nopay),'fa-solid fa-xmark');set('S8','bad',T(tx.nopay),'fa-solid fa-xmark');await S.sleep(400);
 out.appendChild(h('div',{class:'dm-kpis',style:'margin-top:1.25rem'},
  kp('5',tx.k1),kp('5',tx.k2),kp('2',tx.k3),kp('35 300',tx.k4)));
 out.appendChild(h('div',{class:'dm-box',style:'margin-top:1rem'},h('h3',null,h('i',{class:'fa-solid fa-file-lines'}),' '+T(tx.rep)),h('p',null,T(tx.r1)),h('p',{style:'margin-top:.4rem'},T(tx.r2))));
 busy=false;btn.disabled=false;}
function kp(v,l){return h('div',{class:'dm-kpi'},h('b',null,v),h('span',null,T(l)));}
btn.addEventListener('click',run);rs.addEventListener('click',function(){if(!busy)build();});
function tbl(title,head,body){return h('div',{class:'dm-box'},h('h3',null,T(title)),h('div',{class:'dm-scroll'},h('table',{class:'dm-tbl'},h('thead',null,h('tr',null,head.map(function(x){return h('th',{class:x[1]||''},T(x[0]));}))),body)));}
build();
root.appendChild(h('div',{class:'dm-bar'},btn,rs));
root.appendChild(h('div',{class:'dm-grid two'},
 tbl(tx.sales,[[tx.cust],[tx.amt,'n'],[tx.st]],sT),tbl(tx.pays,[[tx.rw],[tx.amt,'n'],[tx.st]],pT)));
root.appendChild(out);root.appendChild(S.note(T(tx.foot)));
});})();
