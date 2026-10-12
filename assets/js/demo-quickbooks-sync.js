(function(){var S=SRD,h=S.h,t=S.t,fmt=S.fmt,pill=S.pill;
S.reg('quickbooks-sync',function(root){
var inv=[{s:'Kigali Papeterie Démo SARL',n:'EX-2026-0147',ht:115000,tva:20700,ok:true},{s:'Imbuto Fresh Ltd (fictif)',n:'EX-2026-0148',ht:300000,tva:54000,ok:true},{s:'Nyabugogo Trading (fictif)',n:'EX-2026-0149',ht:200000,tva:36000,ok:false}];
var map=[[t('Fournisseur','Supplier'),t('Fournisseur (Vendor)','Vendor')],[t('N° de facture','Invoice no.'),'Bill no.'],[t('Date','Date'),'Bill date'],[t('Montant HT','Amount excl. VAT'),t('Montant de ligne','Line amount')],['TVA',t('Taxe','Tax')],[t('Total TTC','Total incl. VAT'),'Total']];
var tb=h('tbody'),out=h('div'),stt={},btn=h('button',{class:'dm-btn pri'},t('Envoyer vers QuickBooks','Send to QuickBooks')),busy=false,created=false;
function draw(){S.clear(tb);var sent=0;inv.forEach(function(i,k){var s=stt[k];var st=!s?pill('mu',t('Prête','Ready')):s==='sending'?pill('in',t('Envoi…','Sending…')):s==='ok'?pill('ok',t('Envoyée','Sent'),'fa-solid fa-check'):pill('wn',t('À relire : fournisseur inconnu','Review: unknown supplier'),'fa-solid fa-triangle-exclamation');if(s==='ok')sent+=i.ht+i.tva;
 var extra=s==='review'?h('button',{class:'dm-btn',onclick:function(){created=true;stt[k]='ok';draw();}},t('Créer le fournisseur et envoyer','Create supplier and send')):'';
 tb.appendChild(h('tr',{class:s==='review'?'hl':''},h('td',null,i.s),h('td',null,i.n),h('td',{class:'n'},fmt(i.ht+i.tva)),h('td',null,st),h('td',null,extra)));});
 S.clear(out);var tot=inv.reduce(function(a,i){return a+i.ht+i.tva;},0);var all=Object.keys(stt).length===3&&Object.keys(stt).every(function(k){return stt[k]==='ok';});
 out.appendChild(h('div',{class:'dm-kpis'},[[fmt(tot),t('Total UnlockBill (RWF)','UnlockBill total (RWF)')],[fmt(sent),t('Total envoyé à QuickBooks (RWF)','Total sent to QuickBooks (RWF)')],[all?t('Équilibré ✓','Balanced ✓'):fmt(tot-sent),t('Différence à contrôler','Difference to check')]].map(function(x){return h('div',{class:'dm-kpi'},h('b',null,String(x[0])),h('span',null,x[1]));})));}
async function run(){if(busy)return;busy=true;btn.disabled=true;stt={};
 for(var k=0;k<inv.length;k++){stt[k]='sending';draw();await S.sleep(800);stt[k]=inv[k].ok||created?'ok':'review';draw();}busy=false;btn.disabled=false;}
btn.onclick=run;draw();
root.appendChild(h('div',{class:'dm-grid wide-left'},
 h('div',{class:'dm-box'},h('div',{class:'dm-bar'},h('b',null,t('Factures lues par UnlockBill','Invoices read by UnlockBill')),btn),h('div',{class:'dm-scroll'},h('table',{class:'dm-tbl'},h('thead',null,h('tr',null,[t('Fournisseur','Supplier'),t('N°','No.'),'Total',t('État','Status'),''].map(function(x,i){return h('th',{class:i===2?'n':''},x);}))),tb))),
 h('div',{class:'dm-box'},h('h3',null,t('Correspondance des champs','Field mapping')),h('table',{class:'dm-tbl'},h('thead',null,h('tr',null,h('th',null,'UnlockBill'),h('th',null,'QuickBooks'))),h('tbody',null,map.map(function(m){return h('tr',null,h('td',null,m[0]),h('td',null,m[1]));}))))));
root.appendChild(h('div',{style:'margin-top:1.25rem'},out));
root.appendChild(S.note(t('Données fictives. Les cas inhabituels (fournisseur inconnu, écart de total) sont mis de côté pour relecture au lieu d\'être envoyés à l\'aveugle.','Fictional data. Unusual cases (unknown supplier, total mismatch) are set aside for review rather than sent blindly.')));
});})();
