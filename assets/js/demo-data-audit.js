(function(){var S=SRD,h=S.h,t=S.t,pill=S.pill;
S.reg('data-audit',function(root){
var Q=[
 {q:t('Vos fichiers importants sont-ils sauvegardés automatiquement, hors de votre ordinateur ?','Are your important files backed up automatically, away from your computer?'),w:3,a:t('Mettre en place une sauvegarde automatique avec une copie hors des locaux','Set up an automatic backup with an off-site copy')},
 {q:t('Chaque employé a-t-il son propre compte (pas de mot de passe partagé) ?','Does each employee have their own account (no shared password)?'),w:3,a:t('Créer un compte par personne et supprimer les mots de passe partagés','Create one account per person and remove shared passwords')},
 {q:t('Utilisez-vous une double vérification (code par SMS ou application) sur l\'email et la banque ?','Do you use two-step verification (SMS or app code) on email and banking?'),w:3,a:t('Activer la double vérification sur l\'email et les comptes financiers','Turn on two-step verification on email and financial accounts')},
 {q:t('Savez-vous qui a accès à quels dossiers partagés ?','Do you know who has access to which shared folders?'),w:2,a:t('Faire l\'inventaire des accès et retirer ceux qui ne sont plus utiles','List access rights and remove those no longer needed')},
 {q:t('Les ordinateurs et téléphones sont-ils protégés par un mot de passe et mis à jour ?','Are computers and phones password-protected and kept up to date?'),w:2,a:t('Imposer un verrouillage et planifier les mises à jour','Require a lock and schedule updates')},
 {q:t('Quand un employé part, ses accès sont-ils fermés le jour même ?','When an employee leaves, are their accesses closed the same day?'),w:2,a:t('Écrire une procédure de départ avec une liste d\'accès à fermer','Write a leaving procedure with a list of accesses to close')},
 {q:t('Avez-vous déjà testé la restauration d\'une sauvegarde ?','Have you ever tested restoring a backup?'),w:2,a:t('Planifier un test de restauration chaque trimestre','Schedule a restore test every quarter')},
 {q:t('Vos employés ont-ils été sensibilisés aux arnaques (faux messages, faux paiements) ?','Have your employees been made aware of scams (fake messages, fake payments)?'),w:1,a:t('Organiser une courte sensibilisation à la sécurité','Run a short security awareness session')}];
var ans=[],i=0,box=h('div',{class:'dm-box'});
function ask(){S.clear(box);if(i>=Q.length)return result();var q=Q[i];
 box.appendChild(h('div',{class:'dm-progress',style:'margin-bottom:1rem'},h('i',{style:'width:'+(i/Q.length*100)+'%'})));
 box.appendChild(h('div',{class:'dm-sm dm-mu'},t('Question ','Question ')+(i+1)+' / '+Q.length));box.appendChild(h('div',{class:'dm-q',style:'margin-top:.3rem'},q.q));
 [[true,t('Oui','Yes')],[false,t('Non','No')],[null,t('Je ne sais pas','I don\'t know')]].forEach(function(o){box.appendChild(h('button',{class:'dm-opt',onclick:function(){ans[i]=o[0];i++;ask();}},o[1]));});}
function result(){var max=0,got=0,gaps=[];Q.forEach(function(q,k){max+=q.w;if(ans[k]===true)got+=q.w;else gaps.push({q:q,k:k});});
 gaps.sort(function(a,b){return b.q.w-a.q.w||a.k-b.k;});var pc=Math.round(got/max*100);var lvl=pc>=75?['ok',t('Risque faible','Low risk')]:pc>=45?['wn',t('Risque moyen','Medium risk')]:['bad',t('Risque élevé','High risk')];
 box.appendChild(h('div',{style:'text-align:center;margin-bottom:1rem'},h('div',{style:'font-size:2.4rem;font-weight:800'},pc+' %'),pill(lvl[0],lvl[1]),h('div',{class:'dm-sm dm-mu',style:'margin-top:.5rem'},t('Part des bonnes pratiques en place (sur 8 points de contrôle)','Share of good practices in place (out of 8 checks)'))));
 box.appendChild(h('h3',null,gaps.length?t('Les actions à mener en premier','Actions to take first'):t('Aucune lacune détectée sur ces 8 points','No gap found on these 8 points')));
 gaps.slice(0,3).forEach(function(g,n){box.appendChild(h('div',{class:'dm-ck',style:'margin-top:.5rem'},h('b',null,(n+1)+'.'),h('div',null,g.q.a,h('div',{class:'dm-sm dm-mu'},ans[g.k]===null?t('Vous ne saviez pas : à vérifier en priorité','You were not sure: check first'):t('Pratique absente','Practice missing')))));});
 box.appendChild(h('div',{style:'margin-top:1rem'},h('button',{class:'dm-btn',onclick:function(){ans=[];i=0;ask();}},t('Recommencer','Start over'))));}
ask();
root.appendChild(h('div',{style:'max-width:44rem;margin-inline:auto'},box));
root.appendChild(S.note(t('Mini-diagnostic indicatif en 8 questions. Un audit réel examine vos pratiques en détail et ne promet aucune « conformité » : il produit un rapport et un plan d\'action priorisé.','Indicative 8-question mini check. A real audit examines your practices in detail and promises no "compliance": it produces a report and a prioritised action plan.')));
});})();
