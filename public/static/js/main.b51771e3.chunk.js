(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{46:function(e,t,a){},47:function(e,t,a){},85:function(e,t,a){"use strict";a.r(t);var s=a(2),c=a.n(s),r=a(26),n=a.n(r),i=(a(46),a(16)),l=a(3),o=(a(47),a.p+"static/media/logo192.74b45c28.png"),b=a(1),d=function(){return Object(b.jsxs)("div",{className:"main-header",children:[Object(b.jsxs)("div",{className:"header-1",children:[Object(b.jsx)("a",{href:"https://tkwebdev.ca",target:"_blank",rel:"noreferrer",className:"logo",children:Object(b.jsx)("img",{src:o,alt:"temps",title:"Homes",width:"100%"})}),Object(b.jsx)(i.b,{className:"item",to:"aptosList",children:"Check Apartments"})]}),Object(b.jsx)("div",{className:"header-2",children:Object(b.jsx)(i.b,{className:"item",to:"about",children:"About"})})]})},j=a(10),h=a.n(j),u=a(12),m=a(15),p=a(5),O=a(21),x=a(41),v=a.n(x),f={content:{top:"40%",bottom:"auto",left:"50%",right:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",backgroundColor:"lightblue",height:"15rem",width:"80%"}},g=function(e){var t=e.info,a=t.description,s=t.location,c=t.price,r=t.oldPrice,n=t.reactivated,i=t.changed,l=t.lastUpdate;return Object(b.jsxs)(v.a,{ariaHideApp:!1,isOpen:e.openModal,style:f,children:[Object(b.jsx)("h2",{children:"Posting details"}),Object(b.jsxs)("div",{children:[" ",a]}),Object(b.jsx)("div",{children:Object(b.jsxs)("span",{className:"items-modal",children:["@ ",Object(b.jsx)("b",{children:s})," "]})}),Object(b.jsx)("div",{children:Object(b.jsxs)("span",{children:[" ",Object(b.jsx)("b",{children:c})]})}),Object(b.jsx)("div",{children:Object(b.jsxs)("span",{children:[" Lat Update at ",Object(b.jsx)("b",{children:l?Object(b.jsxs)("b",{children:[" ",l," "]}):"(no info at this time)"})]})}),i&&Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"items-modal",children:Object(b.jsxs)("span",{children:[" $ before was ",Object(b.jsxs)("b",{children:[r," "]})]})})}),n&&Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"items-modal",children:Object(b.jsxs)("span",{children:[" Item ",Object(b.jsx)("u",{children:"reactivated by its owner"})]})})}),Object(b.jsx)("div",{className:"buttons-modal",children:e.showRemoveButton?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("button",{className:"button-close",onClick:function(){return e.closeModal()},children:"Close"}),Object(b.jsx)("button",{className:"button-remove",onClick:function(t){return e.callRemoveItem(t,e.info,!0)},children:"Remove Item"})]}):Object(b.jsx)("button",{className:"button-close-whole",onClick:function(){return e.closeModal()},children:"Close"})})]})},N=Object(b.jsx)("tr",{children:Object(b.jsx)("td",{className:"processing",colSpan:"4",children:"...Processing"})}),w=Object(b.jsx)("tr",{children:Object(b.jsx)("td",{className:"tr-empty",colSpan:"4",children:"Empty for now. ;)"})}),y=function(e){console.log("porps table mobile",e);var t=Object(s.useState)(null),a=Object(p.a)(t,2),c=a[0],r=a[1],n=Object(s.useState)(null),i=Object(p.a)(n,2),l=i[0],o=i[1],d=Object(s.useState)(null),j=Object(p.a)(d,2),h=j[0],u=j[1];Object(s.useEffect)((function(){return e.data&&r(m()),function(){e.data&&m()}}),[e.data]);Object(s.useEffect)((function(){o(!1)}),[e.closeModal]);var m=function(){return e.data.length?e.data.map((function(t,a){var s=t.description,c=t.active,r=(t.reasonRemovedFromAdmin,t.price),n=t.url,i=t.reactivated,l=t.changed;return Object(b.jsxs)("tr",{className:"tr-table",onClick:function(){return c?window.open(n,"_blank"):(u(t),void o(!0))},children:[Object(b.jsxs)("td",{className:"table-index",children:[" ",a+1," "]}),Object(b.jsx)("td",{className:"table-description ".concat(i||l?"tr-orange":"asd"),children:s.length>20?"".concat(s.substring(0,19),".."):s}),Object(b.jsx)("td",{className:"table-price",children:r.substring(1,8)}),"a"===e.type&&Object(b.jsx)("td",{className:"table-remove",onClick:function(e){e.stopPropagation(),u(t),o(!0)},children:Object(b.jsx)(O.a,{color:"blue",className:"table-trash"})})]},a)})):w};return Object(b.jsxs)(b.Fragment,{children:[l&&Object(b.jsx)(g,{openModal:l,closeModal:function(){return o(!1)},info:h,callRemoveItem:e.callRemoveItem,showRemoveButton:"a"===e.type}),Object(b.jsxs)("table",{children:[Object(b.jsx)("thead",{id:"color-head",children:Object(b.jsxs)("tr",{className:"tr-first",children:[Object(b.jsx)("th",{className:"table-index",children:" # "}),Object(b.jsx)("th",{className:"table-description",children:" Description "}),Object(b.jsx)("th",{className:"table-price",children:"$"}),"a"===e.type&&Object(b.jsx)("th",{className:"table-more",children:"  "})]},"head")}),Object(b.jsx)("tbody",{children:c?c.length?c:w:N})]})]})},k=a(22),C=a.n(k),S=function(){var e=Object(u.a)(h.a.mark((function e(t,a,s){var c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/api",e.prev=1,e.next=4,C.a.patch("/api",{removePass:a,reason:s,_id:t});case 4:if((c=e.sent).data.message){e.next=7;break}throw c.data.error;case 7:return e.abrupt("return",{message:!0});case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",{error:e.t0.message||e.t0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,a,s){return e.apply(this,arguments)}}(),A=function(){var e=Object(u.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/api",e.prev=1,e.next=4,C.a.get("/api",{headers:{"Content-Type":"application/json"}});case 4:if((t=e.sent).data.apartments){e.next=7;break}throw t.data.error;case 7:return e.abrupt("return",{message:t.data.apartments});case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",{error:e.t0.message||e.t0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}(),R=a(14),T=window.innerWidth<768,M=function(e){return Object(b.jsx)("thead",{id:"color-head",children:Object(b.jsxs)("tr",{className:"tr-first",children:[Object(b.jsx)("th",{className:"table-index",children:" # "}),Object(b.jsx)("th",{className:"table-description",children:" Description "}),Object(b.jsx)("th",{className:"table-price",children:" $ Now "}),Object(b.jsx)("th",{className:"table-price",children:" $ Old "}),Object(b.jsx)("th",{className:"table-location",children:" Location "}),Object(b.jsx)("th",{className:"table-reactivated",children:" Reactived"}),e&&Object(b.jsx)("th",{className:"table-remove"})]},"head")})};var I=function(){var e=Object(s.useState)(null),t=Object(p.a)(e,2),a=t[0],c=t[1],r=Object(s.useState)(null),n=Object(p.a)(r,2),i=n[0],l=n[1],o=Object(s.useState)(null),d=Object(p.a)(o,2),j=d[0],x=d[1],v=Object(s.useState)(null),f=Object(p.a)(v,2),g=f[0],N=f[1],w=Object(s.useState)(null),k=Object(p.a)(w,2),C=k[0],I=k[1],P=Object(s.useState)(null),E=Object(p.a)(P,2),F=E[0],H=E[1],q=Object(s.useState)(!0),B=Object(p.a)(q,2),_=B[0],L=B[1],D=Object(s.useState)(!1),W=Object(p.a)(D,2),$=W[0],G=W[1],U=function(e,t){var a=e.map((function(e,t){var a=e.description,s=e.location,c=e.price,r=e.oldPrice,n=e.url,i=e.active,l=e.reactivated,o=e.reasonRemovedFromAdmin,d=e.changed;return Object(b.jsxs)("tr",{className:i?"tr-table tr-hover":"tr-table",onClick:function(){return i?window.open(n,"_blank"):o&&window.alert("\nAdmin's Reason for removing is:\n\n".concat(o))},children:[Object(b.jsx)("td",{className:"table-index",children:t+1}),Object(b.jsx)("td",{className:"table-description ".concat(l||d?"tr-orange":"asd"),children:a.length>60?a.substring(0,59):a}),Object(b.jsx)("td",{className:"table-price",children:c}),Object(b.jsx)("td",{className:"table-price",children:r}),Object(b.jsx)("td",{className:"table-location",children:s}),Object(b.jsx)("td",{className:"table-reactivated",children:l&&Object(b.jsx)("b",{children:" \u2713 "})}),i&&Object(b.jsx)("td",{className:"table-remove",onClick:function(t){return V(t,e)},children:Object(b.jsx)(O.b,{color:"red",className:"table-trash"})})]},t)}));"av"===t&&N(a),"rbo"===t&&I(a),"rba"===t&&H(a)};Object(s.useEffect)((function(){(function(){var e=Object(u.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,L(!0),e.next=4,A();case 4:if(!(t=e.sent).message){e.next=9;break}a=t.message,c(Object(m.a)(a.filter((function(e){return e.active})))),l(Object(m.a)(a.filter((function(e){return!e.active&&!e.removedByAdmin})))),x(Object(m.a)(a.filter((function(e){return e.removedByAdmin})))),e.next=10;break;case 9:throw new Error(t.error);case 10:e.next=15;break;case 12:e.prev=12,e.t0=e.catch(0),console.log("### error post",e.t0.message);case 15:return e.prev=15,L(!1),e.finish(15);case 18:case"end":return e.stop()}var a}),e,null,[[0,12,15,18]])})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(s.useEffect)((function(){return a&&U(a,"av"),i&&U(i,"rbo"),j&&U(j,"rba"),function(){}}),[a,i,j]);var J=Object(b.jsx)("tr",{children:Object(b.jsx)("td",{className:"processing",colSpan:"6",children:"...Processing"})}),K=Object(b.jsx)("tr",{children:Object(b.jsx)("td",{className:"tr-empty",colSpan:"6",children:"Empty for now. ;)"})}),V=function(){var e=Object(u.a)(h.a.mark((function e(t,s,r){var n,i,l,o;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.stopPropagation(),n=window.prompt("\nPlease confirm remove action with password")){e.next=4;break}return e.abrupt("return");case 4:for(i="";!i;)i=window.prompt("\n Short reason, please ;)");return e.prev=6,L(!0),e.next=10,S(s._id,n,i);case 10:if(!(l=e.sent).error){e.next=13;break}throw l.error;case 13:c(Object(m.a)(a.filter((function(e){return s._id!==e._id})))),o={postId:s.postId,url:s.url,price:s.price,oldPrice:s.oldPrice,active:!1,description:s.description,location:s.location,reasonRemovedFromAdmin:i},x([].concat(Object(m.a)(j),[o])),r&&G(!0),window.alert("Item removed by Admin successfully. :)"),e.next=23;break;case 20:e.prev=20,e.t0=e.catch(6),window.alert("\nError: ".concat(e.t0,"\n\nTry again ;)"));case 23:return e.prev=23,L(!1),e.finish(23);case 26:case"end":return e.stop()}}),e,null,[[6,20,23,26]])})));return function(t,a,s){return e.apply(this,arguments)}}(),Y=Object(s.useState)(!1),z=Object(p.a)(Y,2),Q=z[0],X=z[1],Z=Object(s.useState)(!1),ee=Object(p.a)(Z,2),te=ee[0],ae=ee[1];return Object(b.jsxs)("div",{className:"app-body",children:[Object(b.jsx)("h1",{children:"List of apartments"}),Object(b.jsx)("div",{className:"table-section-title av",children:"Availables"}),T?Object(b.jsx)(y,{data:a,type:"a",callRemoveItem:V,closeModal:$}):Object(b.jsxs)("table",{className:_?"table-no-mouse-cursor":"",children:[M(!0),Object(b.jsx)("tbody",{className:_?"table-no-mouse-events":"",children:g?g.length?g:K:J})]}),Object(b.jsxs)("div",{className:"table-section-title rbo",children:["Removed by Owners",Q?Object(b.jsx)(R.a,{className:"table-ExpCol expCol-blue",onClick:function(){return X(!1)}}):Object(b.jsx)(R.b,{className:"table-ExpCol expCol-green",onClick:function(){return X(!0)}})]}),Q?T?Object(b.jsx)(y,{data:i,type:"rbo",closeModal:$}):Object(b.jsxs)("table",{className:_?"table-no-mouse-cursor":"",children:[M(),Object(b.jsx)("tbody",{className:_?"table-no-mouse-events":"",children:C?C.length?C:K:J})]}):Object(b.jsx)("table",{}),Object(b.jsxs)("div",{className:"table-section-title rba",children:["Removed by Admins",te?Object(b.jsx)(R.a,{className:"table-ExpCol expCol-blue",onClick:function(){return ae(!1)}}):Object(b.jsx)(R.b,{className:"table-ExpCol expCol-green",onClick:function(){return ae(!0)}})]}),te?T?Object(b.jsx)(y,{data:j,type:"rba",closeModal:$}):Object(b.jsxs)("table",{className:_?"table-no-mouse-cursor":"",children:[M(),Object(b.jsx)("tbody",{className:_?"table-no-mouse-events":"",children:F?F.length?F:K:J})]}):Object(b.jsx)("table",{style:{marginBottom:"3rem"}})]})};function P(){return Object(b.jsxs)("div",{className:"signature",children:["Tony Kieling",Object(b.jsx)("span",{children:"\xa0\u2122\ufe0f \xa0\u2013\xa0  2021"})]})}var E=a.p+"static/media/architecture.5ca3aa39.png";var F=function(){return Object(b.jsxs)("div",{className:"app-body",children:[Object(b.jsx)("h2",{children:"Home Seeker"}),Object(b.jsx)("h3",{className:"h3-about",children:"What is it?"}),Object(b.jsx)("p",{className:"p-about",children:"Home seeker is a system that helps you look for a new home that suits your needs. "}),Object(b.jsx)("h3",{className:"h3-about",children:"How does it work?"}),Object(b.jsx)("p",{className:"p-about",children:"Tired of checking craigslist multiple times a day or missing opportunities for a dream home? We were too!  "}),Object(b.jsx)("p",{className:"p-about",children:"Home seeker gets this tiring part of the search out of your hands."}),Object(b.jsx)("p",{className:"p-about",children:"You just need to define your criteria: location, budget. then the system will check on all inputs on craigslist and send you the available places directly to your personal email. Then you just click on the link and it will connect you to the craigslist ad."}),Object(b.jsx)("h3",{className:"h3-about",children:"When does it happens?"}),Object(b.jsx)("p",{className:"p-about",children:"The queries are executed from morning to late evening each 30 minutes. It uses a schedule provided by GitHub Actions."}),Object(b.jsx)("p",{className:"p-about",children:"Also, it is possible to execute a post request, with a secret, that will execute the queries, compare data and record new information in database."}),Object(b.jsx)("p",{className:"p-about",children:"The client side can be executed at any time."}),Object(b.jsx)("h3",{className:"h3-about",children:"Architecture"}),Object(b.jsx)("p",{className:"p-about",children:"1- Server is running on web (Vercel)."}),Object(b.jsx)("p",{className:"p-about",children:"2- A crontab at github action will trigger the system each 30 minutes, between 7am to 9pm (personal definition)."}),Object(b.jsx)("p",{className:"p-about",children:"3- The server receives the post request, goes to craigslist; Simultaneously, it queries the database. After receiving both results, it compares the array of data and check 1) what is a new item, 2) what was changed and 3) what was deleted by the owner."}),Object(b.jsx)("p",{className:"p-about",children:"4- After comparing the data currently recorded on database with the data received from craiglist, if any changes, it will email the Home seeker's adminstrator."}),Object(b.jsx)("p",{className:"p-about",children:"5- The users may access the system via web and check all registeres and their status. It is possible to remove an undesired item."}),Object(b.jsx)("p",{className:"p-about",children:"* There are 3 possible status for each item recorded:"}),Object(b.jsx)("p",{className:"p-about",children:"a- Available,"}),Object(b.jsx)("p",{className:"p-about",children:"b- Removed by Owners, it happens when the post's owners remove them,"}),Object(b.jsx)("p",{className:"p-about",children:"c- Removed by Admins, when the admins decide the item is not suitable and it will not be shown on available table."}),Object(b.jsx)("p",{className:"p-about",children:"* One item can be removed by its owner and afterwards they want them back on craiglist. The system will detect this action and mark the item as available and reactivated."}),Object(b.jsx)("h3",{className:"h3-about",children:"Step-by-step on an image"}),Object(b.jsx)("p",{className:"p-about",children:"1- Github Action triggers a post request to the server."}),Object(b.jsx)("p",{className:"p-about",children:"2- Server receives the post request and queries Craigslist and Atlas MongoDB."}),Object(b.jsx)("p",{className:"p-about",children:"3- Server receives the results and compares than."}),Object(b.jsx)("p",{className:"p-about",children:"4- If any update or new item, the system emails the adminsitrators."}),Object(b.jsx)("p",{className:"p-about",children:"5- Users or Administrators may request to check the items; Optionally, the admins can remove ads. This is usefull to keep the availables items clean, showing only the desired ones."}),Object(b.jsx)("div",{className:"position-img-about",children:Object(b.jsx)("img",{src:E,alt:"shows the architecture",className:"img-about"})}),Object(b.jsx)("h3",{className:"h3-about",children:"Tech stack"}),Object(b.jsx)("p",{className:"p-about",children:"Node.js, React, Atlas MongoDB, HTML, CSS, Axios, Node-fetch, React-icons, Node-Mailer, and React-Modal."}),Object(b.jsxs)("div",{className:"last-div-about",children:[Object(b.jsx)("p",{className:"last-p-about",children:"Please, feel free to reach out in case any doubts or contribuitions. ;) "}),Object(b.jsxs)("p",{className:"last-p-about",children:["Find this project on",Object(b.jsx)("a",{href:"https://github.com/tonykieling/craigslist-apto",target:"_blank",rel:"noreferrer",children:"GitHub"})]}),Object(b.jsx)("p",{className:"last-p-about",children:Object(b.jsx)("a",{href:"https://tkwebdev.ca",target:"_blank",rel:"noreferrer",children:"https://tkwebdev.ca"})})]})]})};var H=function(){return Object(b.jsxs)(i.a,{children:[Object(b.jsx)(d,{}),Object(b.jsxs)(l.c,{children:[Object(b.jsx)(l.a,{exact:!0,path:"/aptosList",children:Object(b.jsx)(I,{})}),Object(b.jsx)(l.a,{exact:!0,path:"/about",children:Object(b.jsx)(F,{})})]}),Object(b.jsx)(P,{})]})},q=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,86)).then((function(t){var a=t.getCLS,s=t.getFID,c=t.getFCP,r=t.getLCP,n=t.getTTFB;a(e),s(e),c(e),r(e),n(e)}))};n.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(H,{})}),document.getElementById("root")),q()}},[[85,1,2]]]);
//# sourceMappingURL=main.b51771e3.chunk.js.map