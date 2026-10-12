(function(){var S=SRD,h=S.h,t=S.t,fmt=S.fmt;
S.reg('dashboards',function(root){
var months=['Mai','Juin','Juil','Août','Sept','Oct'].map(function(m,i){return t(m,['May','Jun','Jul','Aug','Sep','Oct'][i]);});
var shops={kgl:{n:'Kigali Centre',v:[5200,5600,6100,5900,6800,7400],tx:[310,330,350,340,390,420]},huy:{n:'Huye',v:[2100,2300,2200,2600,2700,3000],tx:[150,160,155,180,185,205]},mus:{n:'Musanze',v:[1800,1700,2100,2300,2200,2600],tx:[120,115,140,150,148,170]}};
var prod={kgl:[t('Riz 5 kg','Rice 5 kg'),t('Huile 1 L','Oil 1 L'),t('Sucre 1 kg','Sugar 1 kg')],huy:[t('Haricots 2 kg','Beans 2 kg'),t('Riz 5 kg','Rice 5 kg'),t('Savon','Soap')],mus:[t('Pommes de terre 10 kg','Potatoes 10 kg'),t('Huile 1 L','Oil 1 L'),t('Farine 2 kg','Flour 2 kg')]};
var shop='all',per=6,met='v';var kp=h('div',{class:'dm-kpis'}),bars=h('div',{class:'dm-bars'}),tp=h('div'),shopB=h('div',{class:'dm-bar'}),perB=h('div',{class:'dm-bar'});
function series(m){var keys=shop==='all'?Object.keys(shops):[shop];return months.map(function(_,i){return keys.reduce(function(s,k){return s+shops[k][m][i];},0);});}
function draw(){var v=series('v'),x=series('tx'),from=6-per,cur=v.slice(from),curx=x.slice(from);
 var tot=cur.reduce(function(a,b){return a+b;},0)*1000,tr=curx.reduce(function(a,b){return a+b;},0);
 var prevS=from>=per?v.slice(from-per,from).reduce(function(a,b){return a+b;},0)*1000:null;var delta=prevS?Math.round((tot-prevS)/prevS*100):null;
 var last=cur[cur.length-1],pre=cur.length>1?cur[cur.length-2]:last;var m=Math.round((last-pre)/pre*100);
 S.clear(kp);[[fmt(tot/1000)+' k',t('Ventes (RWF)','Sales (RWF)')],[fmt(tr),t('Transactions','Transactions')],[fmt(tot/tr),t('Panier moyen (RWF)','Average basket (RWF)')],[(m>=0?'+':'')+m+' %',t('Dernier mois vs précédent','Last month vs previous')]].forEach(function(a){kp.appendChild(h('div',{class:'dm-kpi'},h('b',null,a[0]),h('span',null,a[1])));});
 S.clear(bars);var arr=met==='v'?cur:curx,mx=Math.max.apply(null,arr);arr.forEach(function(val,i){bars.appendChild(h('div',{class:'dm-bar-col'},h('span',null,met==='v'?fmt(val)+' k':fmt(val)),h('div',{class:'dm-bar-fill',style:'height:'+Math.max(4,val/mx*78)+'%'}),h('span',null,months[from+i])));});
 S.clear(tp);var tops=(shop==='all'?prod.kgl:prod[shop]);tops.forEach(function(p,i){tp.appendChild(h('div',{class:'dm-ck',style:'margin-top:.4rem'},h('b',null,(i+1)+'.'),p));});}
function btns(el,items,get,set){S.clear(el);items.forEach(function(it){el.appendChild(h('button',{class:'dm-btn'+(get()===it[0]?' on':''),onclick:function(){set(it[0]);paint();draw();}},it[1]));});}
function paint(){btns(shopB,[['all',t('Toutes les boutiques','All shops')]].concat(Object.keys(shops).map(function(k){return [k,shops[k].n];})),function(){return shop;},function(v){shop=v;});
 btns(perB,[[3,t('3 derniers mois','Last 3 months')],[6,t('6 mois','6 months')]],function(){return per;},function(v){per=v;});}
var mB=h('div',{class:'dm-bar'});function mp(){btns(mB,[['v',t('Ventes','Sales')],['tx',t('Transactions','Transactions')]],function(){return met;},function(v){met=v;});}
var orig=paint;paint=function(){orig();mp();};
root.appendChild(h('div',{class:'dm-box',style:'margin-bottom:1.25rem'},h('div',{class:'dm-sm dm-mu'},t('Boutiques Inzozi (fictives) · filtres','Inzozi Shops (fictional) · filters')),shopB,perB));
paint();draw();
root.appendChild(kp);
root.appendChild(h('div',{class:'dm-grid wide-left',style:'margin-top:1.25rem'},h('div',{class:'dm-box'},h('h3',null,t('Évolution mensuelle','Monthly trend')),mB,bars),h('div',{class:'dm-box'},h('h3',null,t('Produits les plus vendus (exemple)','Best-selling products (example)')),tp)));
root.appendChild(S.note(t('Données fictives. Vos vrais tableaux de bord se branchent sur vos fichiers ou logiciels (caisse, comptabilité) et se mettent à jour automatiquement.','Fictional data. Your real dashboards connect to your files or software (till, accounting) and update automatically.')));
});})();
