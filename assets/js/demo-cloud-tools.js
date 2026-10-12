(function(){var S=SRD,h=S.h,t=S.t;
S.reg('cloud-tools',function(root){
var a={size:null,need:{},hab:null};var box=h('div',{class:'dm-box'}),out=h('div',{style:'margin-top:1.25rem'});
var sizes=[['s',t('1 à 5 personnes','1 to 5 people')],['m',t('6 à 20 personnes','6 to 20 people')],['l',t('Plus de 20','More than 20')]];
var needs=[['mail',t('Email professionnel et documents partagés','Business email and shared documents')],['files',t('Stocker et partager des fichiers','Store and share files')],['acc',t('Comptabilité et factures','Accounting and invoices')],['cust',t('Parler à mes clients (WhatsApp)','Talk to my customers (WhatsApp)')],['meet',t('Réunions à distance','Remote meetings')]];
var habs=[['g',t('Plutôt Google (Gmail, Drive)','Mostly Google (Gmail, Drive)')],['m',t('Plutôt Microsoft (Outlook, Word, Excel)','Mostly Microsoft (Outlook, Word, Excel)')],['n',t('Aucune habitude particulière','No particular habit')]];
function btn(txt,on,fn){return h('button',{class:'dm-btn'+(on?' on':''),'aria-pressed':on?'true':'false',onclick:fn},txt);}
function form(){S.clear(box);
 box.appendChild(h('h3',null,t('1 · Taille de votre équipe','1 · Your team size')));box.appendChild(h('div',{class:'dm-bar'},sizes.map(function(x){return btn(x[1],a.size===x[0],function(){a.size=x[0];form();show();});})));
 box.appendChild(h('h3',null,t('2 · Vos besoins (plusieurs choix)','2 · Your needs (several choices)')));box.appendChild(h('div',{class:'dm-bar'},needs.map(function(x){return btn(x[1],!!a.need[x[0]],function(){a.need[x[0]]=!a.need[x[0]];form();show();});})));
 box.appendChild(h('h3',null,t('3 · Vos habitudes','3 · Your habits')));box.appendChild(h('div',{class:'dm-bar'},habs.map(function(x){return btn(x[1],a.hab===x[0],function(){a.hab=x[0];form();show();});})));}
function card(ic,name,why){return h('div',{class:'dm-ck'},h('i',{class:ic,style:'margin-top:.2rem;color:var(--dm-in)'}),h('div',null,h('b',null,name),h('div',{class:'dm-sm dm-mu'},why)));}
function show(){S.clear(out);if(!a.size||!a.hab||!Object.keys(a.need).some(function(k){return a.need[k];})){out.appendChild(h('p',{class:'dm-mu',style:'text-align:center'},t('Répondez aux trois questions pour voir une combinaison suggérée.','Answer the three questions to see a suggested toolset.')));return;}
 var r=[];var g=a.hab==='g'||a.hab==='n';
 if(a.need.mail)r.push(g?card('fa-brands fa-google','Google Workspace',t('Email au nom de votre entreprise, documents partagés en temps réel. Simple à prendre en main.','Email on your own business name, documents shared in real time. Easy to pick up.')):card('fa-brands fa-microsoft','Microsoft 365',t('Email professionnel et Word/Excel en ligne, adapté si vous utilisez déjà Office.','Business email and online Word/Excel, a good fit if you already use Office.')));
 if(a.need.files)r.push(card('fa-solid fa-folder-open',g?'Google Drive':'OneDrive / SharePoint',t(a.size==='l'?'Dossiers partagés par équipe avec droits d\'accès clairs.':'Un espace partagé simple, accessible depuis le téléphone.',a.size==='l'?'Shared folders per team with clear access rights.':'A simple shared space, reachable from a phone.')));
 if(a.need.acc)r.push(card('fa-solid fa-file-invoice-dollar','QuickBooks Online / UnlockBill',t('Comptabilité en ligne ; UnlockBill lit vos factures EBM pour éviter la ressaisie.','Online accounting; UnlockBill reads your EBM invoices to avoid re-typing.')));
 if(a.need.cust)r.push(card('fa-brands fa-whatsapp','WhatsApp Business',t('Profil pro, catalogue, réponses rapides ; un chatbot peut s\'y ajouter plus tard.','Business profile, catalogue, quick replies; a chatbot can be added later.')));
 if(a.need.meet)r.push(card('fa-solid fa-video',g?'Google Meet':'Microsoft Teams',t('Réunions à distance incluses dans votre suite : un outil de moins à gérer.','Remote meetings included in your suite: one less tool to manage.')));
 r.push(card('fa-solid fa-cloud-arrow-up',t('Sauvegarde et accès','Backup and access'),t('Double vérification sur tous les comptes et sauvegarde hors des locaux, quel que soit l\'outil.','Two-step verification on all accounts and off-site backup, whichever tool you pick.')));
 out.appendChild(h('div',{class:'dm-box'},h('h3',null,t('Combinaison suggérée','Suggested toolset')),h('div',{style:'display:flex;flex-direction:column;gap:.5rem'},r),h('p',{class:'dm-sm dm-mu',style:'margin-top:.8rem'},t('Pour une équipe de ','For a team of ')+sizes.filter(function(x){return x[0]===a.size;})[0][1].toLowerCase()+t('. Nous choisissons les offres gratuites ou payantes les plus adaptées à votre budget.','. We choose the free or paid plans that best fit your budget.'))));}
form();show();
root.appendChild(box);root.appendChild(out);
root.appendChild(S.note(t('Suggestions illustratives. Le choix final dépend de votre situation, de votre connexion et de votre budget : nous le faisons avec vous.','Illustrative suggestions. The final choice depends on your situation, your connection and your budget: we make it with you.')));
});})();
