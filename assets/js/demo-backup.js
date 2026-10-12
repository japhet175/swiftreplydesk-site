(function(){var S=SRD,h=S.h,t=S.t,pill=S.pill;
S.reg('backup',function(root){
var files=[{n:'Dossier_Habimana.pdf',f:t('Clients','Clients'),ic:'fa-file-pdf',s:'ok'},{n:'Bilan_2025.xlsx',f:t('Comptabilité','Accounting'),ic:'fa-file-excel',s:'ok'},{n:'Contrat_Bail.docx',f:'Contrats',ic:'fa-file-word',s:'ok'},{n:'Liste_Clients.xlsx',f:t('Clients','Clients'),ic:'fa-file-excel',s:'ok'}];
var vers=[{l:t('Aujourd\'hui 02:00','Today 02:00'),k:'v0'},{l:t('Hier 02:00','Yesterday 02:00'),k:'v1'},{l:t('Il y a 3 jours','3 days ago'),k:'v2'},{l:t('Il y a 1 semaine','1 week ago'),k:'v3'}];
var sel={},log=h('div',{class:'dm-log'}),tl=h('div'),checks=h('div');
function say(m){log.insertBefore(h('div',null,new Date().toLocaleTimeString().slice(0,5)+' · '+m),log.firstChild);}
function render(){S.clear(tl);files.forEach(function(f,i){
 var st=f.s==='ok'?pill('ok',t('Présent','Present'),'fa-solid fa-check'):f.s==='del'?pill('bad',t('Supprimé !','Deleted!'),'fa-solid fa-trash'):pill('wn',t('Écrasé par erreur','Overwritten'),'fa-solid fa-pen');
 var row=h('div',{class:'dm-doc',style:'flex-wrap:wrap;align-items:center'},h('i',{class:'fa-solid '+f.ic,style:'font-size:1.2rem;margin-top:0'}),h('div',{style:'flex:1;min-width:10rem'},h('b',null,f.n),h('div',{class:'dm-sm dm-mu'},f.f)),st);
 if(f.s==='ok'){row.appendChild(h('button',{class:'dm-btn',onclick:function(){f.s='del';say(t(f.n+' supprimé par erreur.',f.n+' deleted by mistake.'));render();}},t('Supprimer','Delete')));row.appendChild(h('button',{class:'dm-btn',onclick:function(){f.s='ow';say(t(f.n+' écrasé par une mauvaise version.',f.n+' overwritten by a wrong version.'));render();}},t('Écraser','Overwrite')));}
 else{var s=h('select',{class:'dm-input',style:'width:auto','aria-label':t('Version','Version')},vers.map(function(v,j){return h('option',{value:j},v.l);}));s.value=sel[i]===undefined?0:sel[i];s.onchange=function(){sel[i]=+s.value;};
  row.appendChild(s);row.appendChild(h('button',{class:'dm-btn pri',onclick:function(){f.s='ok';say(t(f.n+' restauré depuis « '+vers[+s.value].l+' ».',f.n+' restored from "'+vers[+s.value].l+'".'));render();}},t('Restaurer','Restore')));}
 tl.appendChild(row);tl.appendChild(h('div',{style:'height:.5rem'}));});}
function chk(ic,tx,ok,sub){return h('div',{class:'dm-ck'},h('i',{class:'fa-solid '+ic,style:'margin-top:.2rem;color:'+(ok?'var(--dm-ok)':'var(--dm-wn)')}),h('div',null,h('b',null,tx),h('div',{class:'dm-sm dm-mu'},sub)));}
render();
checks.appendChild(h('div',{style:'display:flex;flex-direction:column;gap:.5rem'},
 chk('fa-hard-drive',t('Copie 1 : l\'ordinateur du cabinet','Copy 1: the firm\'s computer'),true,t('Vos fichiers de travail','Your working files')),
 chk('fa-usb',t('Copie 2 : disque externe','Copy 2: external disk'),true,t('Copie locale, restauration rapide','Local copy, fast restore')),
 chk('fa-cloud',t('Copie 3 : stockage en ligne','Copy 3: online storage'),true,t('Hors des locaux : protège d\'un vol ou d\'un incendie','Off-site: protects against theft or fire')),
 chk('fa-vial-circle-check',t('Test de restauration','Restore test'),true,t('Vérifié chaque mois (exemple) : les copies fonctionnent vraiment','Checked every month (example): the copies really work'))));
root.appendChild(h('div',{class:'dm-grid two'},
 h('div',{class:'dm-box'},h('h3',null,t('Dossiers du Cabinet Ubwiza (fictif)','Files of Cabinet Ubwiza (fictional)')),h('p',{class:'dm-sm dm-mu',style:'margin-bottom:.8rem'},t('Essayez : supprimez ou écrasez un fichier, puis choisissez une version et restaurez.','Try it: delete or overwrite a file, then pick a version and restore.')),tl,h('h3',{style:'margin-top:1rem'},t('Journal','Log')),log),
 h('div',{class:'dm-box'},h('h3',null,t('La règle des trois copies','The rule of three copies')),checks)));
root.appendChild(S.note(t('Simulation illustrative avec des fichiers fictifs.','Illustrative simulation with fictional files.')));
});})();
