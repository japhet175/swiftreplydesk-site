(function(){var S=SRD,h=S.h,t=S.t,fmt=S.fmt,pill=S.pill;
S.reg('payment-reminders',function(root){
var inv=[{id:1,c:'Kigali Fresh Market (fictif)',a:240000,due:5},{id:2,c:'Hôtel Ubuzima (fictif)',a:480000,due:8},{id:3,c:'Maison Gasore (fictif)',a:95000,due:3},{id:4,c:'Pharmacie Amani (fictive)',a:130000,due:12}];
var rules=[{o:-3,k:'pre'},{o:3,k:'r1'},{o:10,k:'r2'},{o:20,k:'esc'}];
var day=0,paid={},sel=1;
var kind={pre:t('Rappel aimable','Friendly reminder'),r1:t('1re relance','1st reminder'),r2:t('2e relance (plus ferme)','2nd reminder (firmer)'),esc:t('Alerte au responsable','Alert to the manager')};
function msg(i,k){var a=fmt(i.a)+' RWF',c=i.c.split(' (')[0];
 if(k==='pre')return t('Bonjour '+c+', petit rappel : la facture de '+a+' arrive à échéance dans 3 jours. Vous pouvez payer par Mobile Money ou virement. Merci !','Hello '+c+', a quick reminder: the invoice of '+a+' falls due in 3 days. You can pay by Mobile Money or bank transfer. Thank you!');
 if(k==='r1')return t('Bonjour '+c+', sauf erreur de notre part, la facture de '+a+' n\'est pas encore réglée. Pouvez-vous nous confirmer la date de paiement ?','Hello '+c+', unless we are mistaken, the invoice of '+a+' has not been paid yet. Could you confirm the payment date?');
 if(k==='r2')return t('Bonjour '+c+', la facture de '+a+' est en retard de 10 jours. Merci de la régler cette semaine ou de nous écrire si un problème existe.','Hello '+c+', the invoice of '+a+' is 10 days overdue. Please pay it this week or write to us if there is an issue.');
 return t('Message interne : '+c+' n\'a pas payé '+a+' après 20 jours. Un appel personnel est recommandé.','Internal message: '+c+' has not paid '+a+' after 20 days. A personal call is recommended.');}
var sl=h('input',{type:'range',min:0,max:35,value:0,class:'dm-range','aria-label':t('Jour','Day')});
var dl=h('b',null,'0'),tb=h('tbody'),chat=h('div',{class:'dm-chat'}),who=h('span'),kp=h('div',{class:'dm-kpis'}),lg=h('div',{class:'dm-log'});
function sent(i){var a=[];rules.forEach(function(r){var d=i.due+r.o;if(d<=day&&(paid[i.id]===undefined||d<paid[i.id]))a.push({d:d,k:r.k});});return a;}
function status(i){if(paid[i.id]!==undefined&&paid[i.id]<=day)return pill('ok',t('Payée','Paid'),'fa-solid fa-check');
 if(day>i.due)return pill('bad',t('En retard de '+(day-i.due)+' j','Overdue by '+(day-i.due)+' d'),'fa-solid fa-clock');
 return pill('mu',t('Échéance J'+i.due,'Due day '+i.due));}
function render(){dl.textContent=day;S.clear(tb);var out=0,n=0,all=[];
 inv.forEach(function(i){var s=sent(i);n+=s.length;var p=paid[i.id]!==undefined&&paid[i.id]<=day;if(!p&&day>i.due)out+=i.a;s.forEach(function(x){all.push({d:x.d,i:i,k:x.k});});
  tb.appendChild(h('tr',{class:i.id===sel?'hl':'',style:'cursor:pointer',onclick:function(){sel=i.id;render();}},h('td',null,i.c),h('td',{class:'n'},fmt(i.a)),h('td',null,status(i)),h('td',{class:'n'},String(s.length)),
   h('td',null,p?'':h('button',{class:'dm-btn',onclick:function(e){e.stopPropagation();paid[i.id]=day;render();}},t('Marquer payée','Mark as paid')))));});
 S.clear(kp);[[fmt(out),t('Impayé en retard (RWF)','Overdue amount (RWF)')],[n,t('Messages envoyés','Messages sent')],[Object.keys(paid).length,t('Factures réglées','Invoices paid')]].forEach(function(x){kp.appendChild(h('div',{class:'dm-kpi'},h('b',null,String(x[0])),h('span',null,x[1])));});
 var i=inv.filter(function(x){return x.id===sel;})[0],s=sent(i);who.textContent=i.c;S.clear(chat);
 if(!s.length)chat.appendChild(h('div',{class:'dm-msg bot'},t('Aucun message envoyé pour l\'instant. Avancez dans le temps.','No message sent yet. Move forward in time.')));
 s.forEach(function(x){chat.appendChild(h('div',{class:'dm-msg me'},msg(i,x.k),h('small',null,kind[x.k]+' · J'+x.d)));});
 if(paid[i.id]!==undefined&&paid[i.id]<=day)chat.appendChild(h('div',{class:'dm-msg bot'},t('Paiement reçu, merci ! Les relances sont arrêtées.','Payment received, thank you! Reminders are stopped.')));
 chat.scrollTop=chat.scrollHeight;
 S.clear(lg);all.sort(function(a,b){return a.d-b.d;}).forEach(function(x){lg.appendChild(h('div',null,'J'+x.d+' · '+x.i.c.split(' (')[0]+' → '+kind[x.k]));});if(!all.length)lg.appendChild(h('div',{class:'dm-mu'},t('Le journal des envois apparaîtra ici.','The send log will appear here.')));}
sl.addEventListener('input',function(){day=+sl.value;render();});
root.appendChild(h('div',{class:'dm-box'},h('div',{class:'dm-sm dm-mu'},t('Calendrier : rappel 3 jours avant l\'échéance, relance à +3 jours, relance ferme à +10 jours, alerte au responsable à +20 jours.','Schedule: reminder 3 days before the due date, reminder at +3 days, firmer reminder at +10 days, manager alert at +20 days.')),
 h('div',{style:'margin-top:.8rem'},h('b',null,t('Nous sommes au jour ','Today is day '),dl),sl)));
root.appendChild(h('div',{style:'margin-top:1.25rem'},kp));
root.appendChild(h('div',{class:'dm-grid wide-left',style:'margin-top:1.25rem'},
 h('div',{class:'dm-box'},h('h3',null,t('Factures impayées (cliquez une ligne)','Unpaid invoices (click a row)')),h('div',{class:'dm-scroll'},h('table',{class:'dm-tbl'},h('thead',null,h('tr',null,[t('Client','Customer'),t('Montant','Amount'),t('Statut','Status'),t('Envois','Sent'),''].map(function(x,i){return h('th',{class:i===1||i===3?'n':''},x);}))),tb)),h('h3',{style:'margin-top:1rem'},t('Journal des envois','Send log')),lg),
 h('div',{class:'dm-phone'},h('div',{class:'dm-phone-h'},h('i',{class:'fa-brands fa-whatsapp'}),who),chat)));
root.appendChild(S.note(t('Simulation avec des clients fictifs. L\'envoi automatique sur WhatsApp suit les règles de Meta (modèles approuvés, clients ayant accepté d\'être contactés) ; SMS et email sont possibles.','Simulation with fictional customers. Automatic WhatsApp sending follows Meta\'s rules (approved templates, customers who agreed to be contacted); SMS and email are possible.')));
render();});})();
