(function(){var S=SRD,h=S.h,t=S.t,fmt=S.fmt,pill=S.pill;
S.reg('quickbooks-training',function(root){
var acc={bank:t('Banque / Caisse','Bank / Cash'),sales:t('Ventes (produit)','Sales (income)'),ar:t('Clients (à recevoir)','Customers (receivable)'),ap:t('Fournisseurs (à payer)','Suppliers (payable)'),sup:t('Fournitures (charge)','Supplies (expense)'),rent:t('Loyer (charge)','Rent (expense)'),cap:t('Capital','Capital')};
var X=[{d:t('Vente au comptant de 100 000 RWF, payée en espèces (hors TVA).','Cash sale of 100,000 RWF paid in cash (excluding VAT).'),a:100000,dr:'bank',cr:'sales',why:t('La caisse augmente (débit) et le produit des ventes augmente (crédit).','Cash goes up (debit) and sales income goes up (credit).')},
 {d:t('Achat de fournitures de bureau de 50 000 RWF, à payer plus tard au fournisseur.','Purchase of office supplies for 50,000 RWF, to be paid later to the supplier.'),a:50000,dr:'sup',cr:'ap',why:t('La charge augmente (débit) et la dette envers le fournisseur augmente (crédit).','The expense goes up (debit) and what you owe the supplier goes up (credit).')},
 {d:t('Paiement du loyer de 200 000 RWF par virement bancaire.','Payment of 200,000 RWF rent by bank transfer.'),a:200000,dr:'rent',cr:'bank',why:t('La charge de loyer augmente (débit) et la banque diminue (crédit).','Rent expense goes up (debit) and the bank goes down (credit).')}];
var cur=0,score=0,box=h('div',{class:'dm-box'});
function opts(){return Object.keys(acc).map(function(k){return h('option',{value:k},acc[k]);});}
function ask(){S.clear(box);if(cur>=X.length){box.appendChild(h('div',{style:'text-align:center'},h('div',{style:'font-size:2.2rem;font-weight:800'},score+' / '+X.length),h('p',{class:'dm-mu'},t('En formation, nous continuons avec des cas réels de votre entreprise.','In training, we continue with real cases from your own business.')),h('button',{class:'dm-btn',onclick:function(){cur=0;score=0;ask();}},t('Recommencer','Start over'))));return;}
 var x=X[cur];box.appendChild(h('div',{class:'dm-progress',style:'margin-bottom:1rem'},h('i',{style:'width:'+(cur/X.length*100)+'%'})));
 box.appendChild(h('div',{class:'dm-sm dm-mu'},t('Opération ','Transaction ')+(cur+1)+' / '+X.length));box.appendChild(h('div',{class:'dm-q',style:'margin-top:.3rem'},x.d));
 var dr=h('select',{class:'dm-input'},opts()),cr=h('select',{class:'dm-input'},opts());cr.value='sales';
 box.appendChild(h('div',{class:'dm-scroll'},h('table',{class:'dm-tbl'},h('thead',null,h('tr',null,[t('Compte','Account'),t('Débit','Debit'),t('Crédit','Credit')].map(function(z,i){return h('th',{class:i?'n':''},z);}))),h('tbody',null,
  h('tr',null,h('td',null,dr),h('td',{class:'n'},fmt(x.a)),h('td',{class:'n'},'')),h('tr',null,h('td',null,cr),h('td',{class:'n'},''),h('td',{class:'n'},fmt(x.a)))))));
 var fb=h('div');var go=h('button',{class:'dm-btn pri',style:'margin-top:.8rem',onclick:function(){go.disabled=true;var ok=dr.value===x.dr&&cr.value===x.cr;if(ok)score++;S.clear(fb);
  fb.appendChild(h('div',{class:'dm-ck',style:'margin-top:.8rem'},ok?pill('ok',t('Correct','Correct')):pill('bad',t('Pas tout à fait','Not quite')),h('div',null,ok?x.why:t('Bonne réponse : débit « '+acc[x.dr]+' », crédit « '+acc[x.cr]+' ». ','Right answer: debit "'+acc[x.dr]+'", credit "'+acc[x.cr]+'". ')+x.why)));
  fb.appendChild(h('div',{class:'dm-sm',style:'margin-top:.5rem;color:var(--dm-ok);font-weight:600'},h('i',{class:'fa-solid fa-circle-check'}),' '+t('Écriture équilibrée : débit = crédit = ','Balanced entry: debit = credit = ')+fmt(x.a)));
  fb.appendChild(h('button',{class:'dm-btn',style:'margin-top:.7rem',onclick:function(){cur++;ask();}},cur+1<X.length?t('Opération suivante →','Next transaction →'):t('Voir mon score','See my score')));}},t('Valider','Check'));
 box.appendChild(go);box.appendChild(fb);}
ask();root.appendChild(h('div',{style:'max-width:46rem;margin-inline:auto'},box));
root.appendChild(S.note(t('Exercice simplifié, entreprise et chiffres fictifs, sans TVA. En formation, nous travaillons dans QuickBooks Online avec votre plan comptable.','Simplified exercise, fictional company and figures, no VAT. In training, we work in QuickBooks Online with your chart of accounts.')));
});})();
