(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{44:function(e,t,a){},45:function(e,t,a){},83:function(e,t,a){"use strict";a.r(t);var s=a(1),c=a.n(s),n=a(24),r=a.n(n),i=(a(44),a(15)),o=a(2),l=(a(45),a.p+"static/media/logo192.74b45c28.png"),d=a(0),b=function(){return Object(d.jsxs)("div",{className:"main-header",children:[Object(d.jsxs)("div",{className:"header-1",children:[Object(d.jsx)("a",{href:"https://tkwebdev.ca",target:"_blank",rel:"noreferrer",className:"logo",children:Object(d.jsx)("img",{src:l,alt:"temps",title:"Homes",width:"100%"})}),Object(d.jsx)(i.b,{className:"item",to:"aptosList",children:"Check Apartments"})]}),Object(d.jsx)("div",{className:"header-2",children:Object(d.jsx)(i.b,{className:"item",to:"about",children:"About"})})]})},h=a(9),j=a.n(h),u=a(11),m=a(13),p=a(4),O=a(39),x=a.n(O),v=function(e){var t={content:{top:"40%",bottom:"auto",left:"50%",right:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",backgroundColor:"lightblue",height:"15rem",width:e.isLarge?"40%":"80%"}},a=e.info,s=a.description,c=a.location,n=a.price,r=a.oldPrice,i=a.reactivated,o=a.changed,l=a.lastUpdate,b=a.reasonRemovedFromAdmin;return Object(d.jsxs)(x.a,{ariaHideApp:!1,isOpen:e.openModal,style:t,children:[Object(d.jsx)("h2",{children:"Posting details"}),Object(d.jsxs)("div",{children:[" ",s]}),Object(d.jsx)("div",{children:Object(d.jsxs)("span",{className:"items-modal",children:["@ ",Object(d.jsx)("b",{children:c})," "]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("span",{children:[" ",Object(d.jsx)("b",{children:n})]})}),Object(d.jsx)("div",{children:Object(d.jsxs)("span",{children:[" Last Update at ",Object(d.jsx)("b",{children:l?Object(d.jsxs)("b",{children:[" ",l," "]}):"(no info at this time)"})]})}),o&&Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{className:"items-modal",children:Object(d.jsxs)("span",{children:[" $ before was ",Object(d.jsxs)("b",{children:[r," "]})]})})}),i&&Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{className:"items-modal",children:Object(d.jsxs)("span",{children:[" Item ",Object(d.jsx)("u",{children:"reactivated by its owner"})]})})}),b&&Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("div",{className:"items-modal",children:Object(d.jsxs)("span",{children:[" Reason: ",b]})})}),Object(d.jsx)("div",{className:"buttons-modal",children:e.showRemoveButton?Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("button",{className:"button-close",onClick:function(){return e.closeModal()},children:"Close"}),Object(d.jsx)("button",{className:"button-remove",onClick:function(t){return e.callRemoveItem(t,e.info,!0)},children:"Remove Item"})]}):Object(d.jsx)("button",{className:"button-close-whole ".concat(e.isLarge?"large":"mobile"),onClick:function(){return e.closeModal()},children:"Close"})})]})},f=function(e){var t=e.mobile,a=void 0!==t&&t,c=e.type,n=void 0===c?"a":c,r=e.showTable,i=void 0===r||r,o=e.getDescW,l=Object(s.useRef)(null);return Object(s.useEffect)((function(){l.current&&o(l.current.offsetWidth)}),[l]),Object(d.jsx)(d.Fragment,{children:Object(d.jsx)("thead",{id:"color-head",children:Object(d.jsxs)("tr",{className:"tr-first ".concat(i?"":"hide"),children:[Object(d.jsx)("th",{className:"table-index",children:"#"}),Object(d.jsx)("th",{className:"table-description",ref:l,children:"Description"}),Object(d.jsx)("th",{className:"table-price",children:a?"$":"$ Now"}),a&&"a"===n&&Object(d.jsx)("th",{className:"table-more",children:" "}),!a&&Object(d.jsxs)(d.Fragment,{children:[Object(d.jsx)("th",{className:"table-price",children:"$ Before"}),Object(d.jsx)("th",{className:"table-location",children:" Location "}),Object(d.jsx)("th",{className:"table-reactivated",children:" Reactived"}),"a"===n&&Object(d.jsx)("th",{className:"table-remove",children:" "})]})]},"head")})})};function g(e,t){return Object(d.jsx)("tr",{children:Object(d.jsx)("td",{className:"processing"===t?"processing":"tr-empty",colSpan:e?4:7,children:Object(d.jsx)("b",{children:"processing"===t?"Processing...":"Empty for now ;)"})})})}var w=function(e){var t=e.isMobile,a=e.type,s=e.data,c=e.showTable,n=void 0!==c&&c,r=e.getDescW;return Object(d.jsxs)("table",{className:"".concat("processing"===s?"table-no-mouse-cursor":""," ").concat(n?"":"collapse-table"),children:[Object(d.jsx)(f,{mobile:t,type:a,showTable:n,getDescW:r}),Object(d.jsx)("tbody",{children:"processing"===s?n&&g(t,"processing"):"empty"===s?g(t,"emptyfornow"):s})]})},y=function(e){var t=Object(s.useState)(null),a=Object(p.a)(t,2),c=a[0],n=a[1],r=Object(s.useState)(null),i=Object(p.a)(r,2),o=i[0],l=i[1],b=Object(s.useState)(null),h=Object(p.a)(b,2),j=h[0],u=h[1];Object(s.useEffect)((function(){n(!1)}),[e.closeModal]);return Object(d.jsxs)(d.Fragment,{children:[c&&Object(d.jsx)(v,{openModal:c,closeModal:function(){return n(!1)},info:o,callRemoveItem:e.callRemoveItem,showRemoveButton:"a"===e.type}),Object(d.jsx)(w,{isMobile:!0,type:e.type,data:e.data?e.data.length?(e.data,e.data.map((function(t,a){var s=t.description,c=t.active,r=t.price,i=t.url,o=t.reactivated,b=t.changed;return Object(d.jsxs)("tr",{className:"tr-table ".concat(e.showTable?"":"hide"),onClick:function(){return c?window.open(i,"_blank"):(l(t),void n(!0))},children:[Object(d.jsxs)("td",{className:"table-index",children:[" ",a+1," "]}),Object(d.jsx)("td",{className:"table-description ".concat(o||b?"tr-orange":""),style:{maxWidth:j?"".concat(.9*j,"px"):0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:s}),Object(d.jsx)("td",{className:"table-price",children:r.substring(1,8)}),"a"===e.type&&Object(d.jsx)("td",{className:"table-more",onClick:function(e){e.stopPropagation(),l(t),n(!0)},style:{backgroundImage:"url('data:image/svg+xml;utf8,".concat('<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="blue"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" /><path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" /></svg>'),backgroundSize:"22px",backgroundRepeat:"no-repeat",backgroundPosition:"center"}})]},a)}))):"empty":"processing",showTable:e.showTable,getDescW:u})]})},N=function(e){var t=Object(s.useState)(null),a=Object(p.a)(t,2),c=a[0],n=a[1],r=Object(s.useState)(null),i=Object(p.a)(r,2),o=i[0],l=i[1],b=Object(s.useState)(null),h=Object(p.a)(b,2),j=h[0],u=h[1];Object(s.useEffect)((function(){n(!1)}),[e.closeModal]);return Object(d.jsxs)(d.Fragment,{children:[c&&Object(d.jsx)(v,{openModal:c,closeModal:function(){return n(!1)},info:o,callRemoveItem:e.callRemoveItem,showRemoveButton:"a"===e.type,isLarge:!0}),Object(d.jsx)(w,{isMobile:!1,type:e.type,data:e.data?e.data.length?(e.data,e.data.map((function(t,a){var s=t.description,c=t.location,r=t.price,i=t.oldPrice,o=t.url,b=t.active,h=t.reactivated,u=t.changed;return Object(d.jsxs)("tr",{className:"".concat(b?"tr-table tr-hover":"tr-table"," ").concat(e.showTable?"":"hide"),onClick:function(){return b?window.open(o,"_blank"):(l(t),void n(!0))},children:[Object(d.jsx)("td",{className:"table-index",children:a+1}),Object(d.jsx)("td",{className:"table-description ".concat(h||u?"tr-orange":""),style:{maxWidth:j?"".concat(.9*j,"px"):0,whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"},children:s}),Object(d.jsx)("td",{className:"table-price",children:r}),Object(d.jsx)("td",{className:"table-price",children:i}),Object(d.jsx)("td",{className:"table-location",children:c}),Object(d.jsx)("td",{className:"table-reactivated",children:h&&Object(d.jsx)("b",{children:" \u2713 "})}),"a"===e.type&&Object(d.jsx)("td",{className:"table-more",onClick:function(e){e.stopPropagation(),l(t),n(!0)},style:{backgroundImage:"url('data:image/svg+xml;utf8,".concat('<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="red"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>'),backgroundSize:"22px",backgroundRepeat:"no-repeat",backgroundPosition:"center"}})]},a)}))):"empty":"processing",showTable:e.showTable,getDescW:u})]})},k=a(20),T=a.n(k),C=function(){var e=Object(u.a)(j.a.mark((function e(t,a,s){var c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/api",e.prev=1,e.next=4,T.a.patch("/api",{removePass:a,reason:s,_id:t});case 4:if((c=e.sent).data.message){e.next=7;break}throw c.data.error;case 7:return e.abrupt("return",{message:!0});case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",{error:e.t0.message||e.t0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,a,s){return e.apply(this,arguments)}}(),R=function(){var e=Object(u.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/api",e.prev=1,e.next=4,T.a.get("/api",{headers:{"Content-Type":"application/json"}});case 4:if((t=e.sent).data.apartments){e.next=7;break}throw t.data.error;case 7:return e.abrupt("return",{message:t.data.apartments});case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",{error:e.t0.message||e.t0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}(),M=a(14),S=window.innerWidth<768;var A=function(){var e=Object(s.useState)(null),t=Object(p.a)(e,2),a=t[0],c=t[1],n=Object(s.useState)(null),r=Object(p.a)(n,2),i=r[0],o=r[1],l=Object(s.useState)(null),b=Object(p.a)(l,2),h=b[0],O=b[1],x=Object(s.useState)(!1),v=Object(p.a)(x,2),f=v[0],g=v[1],w=Object(s.useRef)(null),k=Object(s.useRef)(null),T=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t||(c(Object(m.a)(e.filter((function(e){return e.active})))),o(Object(m.a)(e.filter((function(e){return!e.active&&!e.removedByAdmin}))))),O(Object(m.a)(e.filter((function(e){return e.removedByAdmin}))))};Object(s.useEffect)((function(){(function(){var e=Object(u.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R();case 3:if(!(t=e.sent).message){e.next=8;break}T(t.message),e.next=9;break;case 8:throw new Error(t.error);case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log("### error post",e.t0.message);case 14:return e.prev=14,e.finish(14);case 16:case"end":return e.stop()}}),e,null,[[0,11,14,16]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var A=function(){var e=Object(u.a)(j.a.mark((function e(t,s,n){var r,i,o,l;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.stopPropagation(),r=window.prompt("\nPlease confirm remove action with password")){e.next=4;break}return e.abrupt("return");case 4:for(i="";!i;)i=window.prompt("\n Short reason, please ;)");return e.prev=6,e.next=9,C(s._id,r,i);case 9:if(!(o=e.sent).error){e.next=12;break}throw o.error;case 12:c(Object(m.a)(a.filter((function(e){return s._id!==e._id})))),l={postId:s.postId,url:s.url,price:s.price,oldPrice:s.oldPrice,active:!1,description:s.description,location:s.location,reasonRemovedFromAdmin:i},O([].concat(Object(m.a)(h),[l])),n&&g(!0),window.alert("Item removed by Admin successfully. :)"),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(6),window.alert("\nError: ".concat(e.t0,"\n\nTry again ;)"));case 22:return e.prev=22,e.finish(22);case 24:case"end":return e.stop()}}),e,null,[[6,19,22,24]])})));return function(t,a,s){return e.apply(this,arguments)}}(),I=Object(s.useState)(!1),P=Object(p.a)(I,2),F=P[0],E=P[1],H=Object(s.useState)(!1),B=Object(p.a)(H,2),L=B[0],W=B[1];return Object(s.useEffect)((function(){L&&setTimeout((function(){k.current.scrollIntoView({behavior:"smooth"})}),280)}),[L]),Object(s.useEffect)((function(){F&&setTimeout((function(){w.current.scrollIntoView({behavior:"smooth"})}),280)}),[F]),Object(d.jsxs)("div",{className:"app-body",children:[Object(d.jsx)("h1",{children:"List of apartments"}),Object(d.jsx)("div",{className:"table-section-title av",children:"Availables"}),S?Object(d.jsx)(y,{data:a,type:"a",callRemoveItem:A,closeModal:f,showTable:!0}):Object(d.jsx)(N,{data:a,type:"a",callRemoveItem:A,closeModal:f,showTable:!0}),Object(d.jsx)("div",{style:{paddingTop:F?"1rem":0},ref:w}),Object(d.jsxs)("div",{className:"table-section-title rbo",children:["Removed by Owners",F?Object(d.jsx)(M.a,{className:"table-ExpCol expCol-blue",onClick:function(){return E(!1)}}):Object(d.jsx)(M.b,{className:"table-ExpCol expCol-green",onClick:function(){return E(!0)}})]}),S?Object(d.jsx)(y,{data:i,type:"rbo",closeModal:f,showTable:F}):Object(d.jsx)(N,{data:i,type:"rbo",closeModal:f,showTable:F}),Object(d.jsx)("div",{style:{paddingTop:L?"1rem":0},ref:k}),Object(d.jsxs)("div",{className:"table-section-title rba",children:["Removed by Admins",L?Object(d.jsx)(M.a,{className:"table-ExpCol expCol-blue",onClick:function(){return W(!1)}}):Object(d.jsx)(M.b,{className:"table-ExpCol expCol-green",onClick:function(){return W(!0)}})]}),S?Object(d.jsx)(y,{data:h,type:"rba",closeModal:f,showTable:L}):Object(d.jsx)(N,{data:h,type:"rba",closeModal:f,showTable:L}),Object(d.jsx)("div",{style:{marginBottom:"2rem"}})]})};function I(){return Object(d.jsxs)("div",{className:"signature",children:["Tony Kieling",Object(d.jsx)("span",{children:"\xa0\u2122\ufe0f \xa0\u2013\xa0  2021"})]})}var P=a.p+"static/media/architecture.5ca3aa39.png";var F=function(){return Object(d.jsxs)("div",{className:"app-body",children:[Object(d.jsx)("h2",{children:"Home Seeker"}),Object(d.jsx)("h3",{className:"h3-about",children:"What is it?"}),Object(d.jsx)("p",{className:"p-about",children:"Home seeker is a system that helps you look for a new home that suits your needs. "}),Object(d.jsxs)("p",{className:"p-about",children:[Object(d.jsxs)("i",{children:[Object(d.jsx)("u",{children:Object(d.jsx)("b",{children:"p.s"})}),". Currently, the system is not being watched carefully because ",Object(d.jsxs)("b",{children:["we already have found our new place to live ",Object(d.jsx)("u",{children:"thanks to Home-seeker"})]}),". It means the system queries craigslist only once a day and we are not given too many attention to keep the availables list clean."]})," :)"]}),Object(d.jsx)("h3",{className:"h3-about",children:"How does it work?"}),Object(d.jsx)("p",{className:"p-about",children:"Tired of checking craigslist multiple times a day or missing opportunities for a dream home? We were too!  "}),Object(d.jsx)("p",{className:"p-about",children:"Home seeker gets this tiring part of the search out of your hands."}),Object(d.jsx)("p",{className:"p-about",children:"You just need to define your criteria: location, budget. then the system will check on all inputs on craigslist and send you the available places directly to your personal email. Then you just click on the link and it will connect you to the craigslist ad."}),Object(d.jsx)("h3",{className:"h3-about",children:"When does it happens?"}),Object(d.jsx)("p",{className:"p-about",children:"The queries are executed from morning to late evening each 30 minutes. It uses a schedule provided by GitHub Actions."}),Object(d.jsx)("p",{className:"p-about",children:"Also, it is possible to execute a post request, with a secret, that will execute the queries, compare data and record new information in database."}),Object(d.jsx)("p",{className:"p-about",children:"The client side can be executed at any time."}),Object(d.jsx)("h3",{className:"h3-about",children:"Architecture"}),Object(d.jsx)("p",{className:"p-about",children:"1- Server is running on web (Vercel)."}),Object(d.jsx)("p",{className:"p-about",children:"2- A crontab at github action will trigger the system each 30 minutes, between 7am to 9pm (personal definition)."}),Object(d.jsx)("p",{className:"p-about",children:"3- The server receives the post request, goes to craigslist; Simultaneously, it queries the database. After receiving both results, it compares the array of data and check 1) what is a new item, 2) what was changed and 3) what was deleted by the owner."}),Object(d.jsx)("p",{className:"p-about",children:"4- After comparing the data currently recorded on database with the data received from craiglist, if any changes, it will email the Home seeker's adminstrator."}),Object(d.jsx)("p",{className:"p-about",children:"5- The users may access the system via web and check all registeres and their status. It is possible to remove an undesired item."}),Object(d.jsx)("p",{className:"p-about",children:"* There are 3 possible status for each item recorded:"}),Object(d.jsx)("p",{className:"p-about",children:"a- Available,"}),Object(d.jsx)("p",{className:"p-about",children:"b- Removed by Owners, it happens when the post's owners remove them,"}),Object(d.jsx)("p",{className:"p-about",children:"c- Removed by Admins, when the admins decide the item is not suitable and it will not be shown on available table."}),Object(d.jsx)("p",{className:"p-about",children:"* One item can be removed by its owner and afterwards they want them back on craiglist. The system will detect this action and mark the item as available and reactivated."}),Object(d.jsx)("h3",{className:"h3-about",children:"Step-by-step on an image"}),Object(d.jsx)("p",{className:"p-about",children:"1- Github Action triggers a post request to the server."}),Object(d.jsx)("p",{className:"p-about",children:"2- Server receives the post request and queries Craigslist and Atlas MongoDB."}),Object(d.jsx)("p",{className:"p-about",children:"3- Server receives the results and compares than."}),Object(d.jsx)("p",{className:"p-about",children:"4- If any update or new item, the system emails the adminsitrators."}),Object(d.jsx)("p",{className:"p-about",children:"5- Users or Administrators may request to check the items; Optionally, the admins can remove ads. This is usefull to keep the availables items clean, showing only the desired ones."}),Object(d.jsx)("div",{className:"position-img-about",children:Object(d.jsx)("img",{src:P,alt:"shows the architecture",className:"img-about"})}),Object(d.jsx)("h3",{className:"h3-about",children:"Tech stack"}),Object(d.jsx)("p",{className:"p-about",children:"Node.js, React, Atlas MongoDB, HTML, CSS, Axios, Node-fetch, React-icons, Mongoose, Node-Mailer, and React-Modal."}),Object(d.jsxs)("div",{className:"last-div-about",children:[Object(d.jsx)("p",{className:"last-p-about",children:"Please, feel free to reach out in case any doubts or contribuitions. ;) "}),Object(d.jsxs)("p",{className:"last-p-about",children:["Find this project on",Object(d.jsx)("a",{href:"https://github.com/tonykieling/home-seeker",target:"_blank",rel:"noreferrer",children:" GitHub"})]}),Object(d.jsx)("p",{className:"last-p-about",children:Object(d.jsx)("a",{href:"https://tkwebdev.ca",target:"_blank",rel:"noreferrer",children:"https://tkwebdev.ca"})})]})]})};var E=function(){return Object(d.jsxs)(i.a,{children:[Object(d.jsx)(b,{}),Object(d.jsxs)(o.c,{children:[Object(d.jsx)(o.a,{exact:!0,path:"/aptosList",children:Object(d.jsx)(A,{})}),Object(d.jsx)(o.a,{exact:!0,path:"/about",children:Object(d.jsx)(F,{})})]}),Object(d.jsx)(I,{})]})},H=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,84)).then((function(t){var a=t.getCLS,s=t.getFID,c=t.getFCP,n=t.getLCP,r=t.getTTFB;a(e),s(e),c(e),n(e),r(e)}))};r.a.render(Object(d.jsx)(c.a.StrictMode,{children:Object(d.jsx)(E,{})}),document.getElementById("root")),H()}},[[83,1,2]]]);
//# sourceMappingURL=main.3bf9ecaf.chunk.js.map