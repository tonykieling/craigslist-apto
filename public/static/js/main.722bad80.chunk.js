(this["webpackJsonpfront-end"]=this["webpackJsonpfront-end"]||[]).push([[0],{46:function(e,t,a){},47:function(e,t,a){},85:function(e,t,a){"use strict";a.r(t);var s=a(2),c=a.n(s),r=a(26),n=a.n(r),i=(a(46),a(16)),o=a(3),l=(a(47),a.p+"static/media/logo192.74b45c28.png"),b=a(1),d=function(){return Object(b.jsxs)("div",{className:"main-header",children:[Object(b.jsxs)("div",{className:"header-1",children:[Object(b.jsx)("a",{href:"https://tkwebdev.ca",target:"_blank",rel:"noreferrer",className:"logo",children:Object(b.jsx)("img",{src:l,alt:"temps",title:"Homes",width:"100%"})}),Object(b.jsx)(i.b,{className:"item",to:"aptosList",children:"Check Apartments"})]}),Object(b.jsx)("div",{className:"header-2",children:Object(b.jsx)(i.b,{className:"item",to:"about",children:"About"})})]})},j=a(10),h=a.n(j),u=a(12),m=a(14),p=a(5),O=a(21),x=a(41),v=a.n(x),f=function(e){console.log("props",e);var t={content:{top:"40%",bottom:"auto",left:"50%",right:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)",backgroundColor:"lightblue",height:"15rem",width:e.isLarge?"40%":"80%"}},a=e.info,s=a.description,c=a.location,r=a.price,n=a.oldPrice,i=a.reactivated,o=a.changed,l=a.lastUpdate;return Object(b.jsxs)(v.a,{ariaHideApp:!1,isOpen:e.openModal,style:t,children:[Object(b.jsx)("h2",{children:"Posting details"}),Object(b.jsxs)("div",{children:[" ",s]}),Object(b.jsx)("div",{children:Object(b.jsxs)("span",{className:"items-modal",children:["@ ",Object(b.jsx)("b",{children:c})," "]})}),Object(b.jsx)("div",{children:Object(b.jsxs)("span",{children:[" ",Object(b.jsx)("b",{children:r})]})}),Object(b.jsx)("div",{children:Object(b.jsxs)("span",{children:[" Lat Update at ",Object(b.jsx)("b",{children:l?Object(b.jsxs)("b",{children:[" ",l," "]}):"(no info at this time)"})]})}),o&&Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"items-modal",children:Object(b.jsxs)("span",{children:[" $ before was ",Object(b.jsxs)("b",{children:[n," "]})]})})}),i&&Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("div",{className:"items-modal",children:Object(b.jsxs)("span",{children:[" Item ",Object(b.jsx)("u",{children:"reactivated by its owner"})]})})}),Object(b.jsx)("div",{className:"buttons-modal",children:e.showRemoveButton?Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("button",{className:"button-close",onClick:function(){return e.closeModal()},children:"Close"}),Object(b.jsx)("button",{className:"button-remove",onClick:function(t){return e.callRemoveItem(t,e.info,!0)},children:"Remove Item"})]}):Object(b.jsx)("button",{className:"button-close-whole ".concat(e.isLarge?"large":"mobile"),onClick:function(){return e.closeModal()},children:"Close"})})]})};function g(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"a";return Object(b.jsx)(b.Fragment,{children:Object(b.jsx)("thead",{id:"color-head",children:Object(b.jsxs)("tr",{className:"tr-first",children:[Object(b.jsx)("th",{className:"table-index",children:"#"}),Object(b.jsx)("th",{className:"table-description",children:"Description"}),Object(b.jsx)("th",{className:"table-price",children:e?"$":"$ Now"}),e&&"a"===t&&Object(b.jsx)("th",{className:"table-more",children:" "}),!e&&Object(b.jsxs)(b.Fragment,{children:[Object(b.jsx)("th",{className:"table-price",children:"$ Before"}),Object(b.jsx)("th",{className:"table-location",children:" Location "}),Object(b.jsx)("th",{className:"table-reactivated",children:" Reactived"}),"a"===t&&Object(b.jsx)("th",{className:"table-remove",children:" "})]})]},"head")})})}function N(e,t){return Object(b.jsx)("tr",{children:Object(b.jsx)("td",{className:"processing"===t?"processing":"tr-empty",colSpan:e?4:7,children:Object(b.jsx)("b",{children:"processing"===t?"Processing...":"Empty for now ;)"})})})}var y=function(e){var t=e.isMobile,a=e.type,s=e.data;return Object(b.jsxs)("table",{className:"processing"===s?"table-no-mouse-cursor":"",children:[g(t,a),Object(b.jsx)("tbody",{children:"processing"===s?N(t,"processing"):"empty"===s?N(t,"emptyfornow"):s})]})},w=function(e){var t=Object(s.useState)(null),a=Object(p.a)(t,2),c=(a[0],a[1],Object(s.useState)(null)),r=Object(p.a)(c,2),n=r[0],i=r[1],o=Object(s.useState)(null),l=Object(p.a)(o,2),d=l[0],j=l[1],h=(Object(s.useRef)(null),Object(s.useState)(null)),u=Object(p.a)(h,2);u[0],u[1];Object(s.useEffect)((function(){i(!1)}),[e.closeModal]);return Object(b.jsxs)(b.Fragment,{children:[n&&Object(b.jsx)(f,{openModal:n,closeModal:function(){return i(!1)},info:d,callRemoveItem:e.callRemoveItem,showRemoveButton:"a"===e.type}),e.data?e.data.length?Object(b.jsx)(y,{isMobile:!0,type:e.type,data:(e.data,e.data.map((function(t,a){var s=t.description,c=t.active,r=t.price,n=t.url,o=t.reactivated,l=t.changed;return Object(b.jsxs)("tr",{className:"tr-table",onClick:function(){return c?window.open(n,"_blank"):(j(t),void i(!0))},children:[Object(b.jsxs)("td",{className:"table-index",children:[" ",a+1," "]}),Object(b.jsx)("td",{className:"table-description ".concat(o||l?"tr-orange":"asd"),children:s.length>20?"".concat(s.substring(0,19),".."):s}),Object(b.jsx)("td",{className:"table-price",children:r.substring(1,8)}),"a"===e.type&&Object(b.jsx)("td",{className:"table-remove",onClick:function(e){e.stopPropagation(),j(t),i(!0)},children:Object(b.jsx)(O.a,{color:"blue",className:"table-trash"})})]},a)})))}):Object(b.jsx)(y,{isMobile:!0,type:e.type,data:"empty"}):Object(b.jsx)(y,{isMobile:!0,type:e.type,data:"processing"}),console.log("props.data",e.data)]})},k=function(e){var t=Object(s.useState)(null),a=Object(p.a)(t,2),c=a[0],r=a[1],n=Object(s.useState)(null),i=Object(p.a)(n,2),o=i[0],l=i[1],d=Object(s.useState)(null),j=Object(p.a)(d,2);j[0],j[1];Object(s.useEffect)((function(){r(!1)}),[e.closeModal]);return Object(b.jsxs)(b.Fragment,{children:[c&&Object(b.jsx)(f,{openModal:c,closeModal:function(){return r(!1)},info:o,callRemoveItem:e.callRemoveItem,showRemoveButton:"a"===e.type,isLarge:!0}),e.data?e.data.length?Object(b.jsx)(y,{isMobile:!1,type:e.type,data:(e.data,e.data.map((function(t,a){var s=t.description,c=t.location,n=t.price,i=t.oldPrice,o=t.url,d=t.active,j=t.reactivated,h=(t.reasonRemovedFromAdmin,t.changed);return Object(b.jsxs)("tr",{className:d?"tr-table tr-hover":"tr-table",onClick:function(){return d?window.open(o,"_blank"):(l(t),void r(!0))},children:[Object(b.jsx)("td",{className:"table-index",children:a+1}),Object(b.jsx)("td",{className:"table-description ".concat(j||h?"tr-orange":"asd"),children:s.length>60?"".concat(s.substring(0,59),".."):s}),Object(b.jsx)("td",{className:"table-price",children:n}),Object(b.jsx)("td",{className:"table-price",children:i}),Object(b.jsx)("td",{className:"table-location",children:c}),Object(b.jsx)("td",{className:"table-reactivated",children:j&&Object(b.jsx)("b",{children:" \u2713 "})}),d&&Object(b.jsx)("td",{className:"table-remove",onClick:function(a){return e.callRemoveItem(a,t)},children:Object(b.jsx)(O.b,{color:"red",className:"table-trash"})})]},a)})))}):Object(b.jsx)(y,{isMobile:!1,type:e.type,data:"empty"}):Object(b.jsx)(y,{isMobile:!1,type:e.type,data:"processing"})]})},C=a(22),M=a.n(C),S=function(){var e=Object(u.a)(h.a.mark((function e(t,a,s){var c;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/api",e.prev=1,e.next=4,M.a.patch("/api",{removePass:a,reason:s,_id:t});case 4:if((c=e.sent).data.message){e.next=7;break}throw c.data.error;case 7:return e.abrupt("return",{message:!0});case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",{error:e.t0.message||e.t0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t,a,s){return e.apply(this,arguments)}}(),R=function(){var e=Object(u.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"/api",e.prev=1,e.next=4,M.a.get("/api",{headers:{"Content-Type":"application/json"}});case 4:if((t=e.sent).data.apartments){e.next=7;break}throw t.data.error;case 7:return e.abrupt("return",{message:t.data.apartments});case 10:return e.prev=10,e.t0=e.catch(1),e.abrupt("return",{error:e.t0.message||e.t0});case 13:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}(),A=a(15),I=window.innerWidth<768;var T=function(){var e=Object(s.useState)(null),t=Object(p.a)(e,2),a=t[0],c=t[1],r=Object(s.useState)(null),n=Object(p.a)(r,2),i=n[0],o=n[1],l=Object(s.useState)(null),d=Object(p.a)(l,2),j=d[0],O=d[1],x=Object(s.useState)(!1),v=Object(p.a)(x,2),f=v[0],g=v[1],N=function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];t||(c(Object(m.a)(e.filter((function(e){return e.active})))),o(Object(m.a)(e.filter((function(e){return!e.active&&!e.removedByAdmin}))))),O(Object(m.a)(e.filter((function(e){return e.removedByAdmin}))))};Object(s.useEffect)((function(){(function(){var e=Object(u.a)(h.a.mark((function e(){var t;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,R();case 3:if(!(t=e.sent).message){e.next=8;break}N(t.message),e.next=9;break;case 8:throw new Error(t.error);case 9:e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.log("### error post",e.t0.message);case 14:return e.prev=14,e.finish(14);case 16:case"end":return e.stop()}}),e,null,[[0,11,14,16]])})));return function(){return e.apply(this,arguments)}})()()}),[]);var y=function(){var e=Object(u.a)(h.a.mark((function e(t,s,r){var n,i,o,l;return h.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.stopPropagation(),n=window.prompt("\nPlease confirm remove action with password")){e.next=4;break}return e.abrupt("return");case 4:for(i="";!i;)i=window.prompt("\n Short reason, please ;)");return e.prev=6,e.next=9,S(s._id,n,i);case 9:if(!(o=e.sent).error){e.next=12;break}throw o.error;case 12:c(Object(m.a)(a.filter((function(e){return s._id!==e._id})))),l={postId:s.postId,url:s.url,price:s.price,oldPrice:s.oldPrice,active:!1,description:s.description,location:s.location,reasonRemovedFromAdmin:i},O([].concat(Object(m.a)(j),[l])),r&&g(!0),window.alert("Item removed by Admin successfully. :)"),e.next=22;break;case 19:e.prev=19,e.t0=e.catch(6),window.alert("\nError: ".concat(e.t0,"\n\nTry again ;)"));case 22:return e.prev=22,e.finish(22);case 24:case"end":return e.stop()}}),e,null,[[6,19,22,24]])})));return function(t,a,s){return e.apply(this,arguments)}}(),C=Object(s.useState)(!1),M=Object(p.a)(C,2),T=M[0],F=M[1],P=Object(s.useState)(!1),B=Object(p.a)(P,2),E=B[0],L=B[1];return Object(b.jsxs)("div",{className:"app-body",children:[Object(b.jsx)("h1",{children:"List of apartments"}),Object(b.jsx)("div",{className:"table-section-title av",children:"Availables"}),I?Object(b.jsx)(w,{data:a,type:"a",callRemoveItem:y,closeModal:f}):Object(b.jsx)(k,{data:a,type:"a",callRemoveItem:y,closeModal:f}),Object(b.jsxs)("div",{className:"table-section-title rbo",children:["Removed by Owners",T?Object(b.jsx)(A.a,{className:"table-ExpCol expCol-blue",onClick:function(){return F(!1)}}):Object(b.jsx)(A.b,{className:"table-ExpCol expCol-green",onClick:function(){return F(!0)}})]}),T?I?Object(b.jsx)(w,{data:i,type:"rbo",closeModal:f}):Object(b.jsx)(k,{data:i,type:"rbo",closeModal:f}):Object(b.jsx)("table",{}),Object(b.jsxs)("div",{className:"table-section-title rba",children:["Removed by Admins",E?Object(b.jsx)(A.a,{className:"table-ExpCol expCol-blue",onClick:function(){return L(!1)}}):Object(b.jsx)(A.b,{className:"table-ExpCol expCol-green",onClick:function(){return L(!0)}})]}),E?I?Object(b.jsx)(w,{data:j,type:"rba",closeModal:f}):Object(b.jsx)(k,{data:j,type:"rba",closeModal:f}):Object(b.jsx)("table",{}),Object(b.jsx)("div",{style:{marginBottom:"2rem"}})]})};function F(){return Object(b.jsxs)("div",{className:"signature",children:["Tony Kieling",Object(b.jsx)("span",{children:"\xa0\u2122\ufe0f \xa0\u2013\xa0  2021"})]})}var P=a.p+"static/media/architecture.5ca3aa39.png";var B=function(){return Object(b.jsxs)("div",{className:"app-body",children:[Object(b.jsx)("h2",{children:"Home Seeker"}),Object(b.jsx)("h3",{className:"h3-about",children:"What is it?"}),Object(b.jsx)("p",{className:"p-about",children:"Home seeker is a system that helps you look for a new home that suits your needs. "}),Object(b.jsx)("h3",{className:"h3-about",children:"How does it work?"}),Object(b.jsx)("p",{className:"p-about",children:"Tired of checking craigslist multiple times a day or missing opportunities for a dream home? We were too!  "}),Object(b.jsx)("p",{className:"p-about",children:"Home seeker gets this tiring part of the search out of your hands."}),Object(b.jsx)("p",{className:"p-about",children:"You just need to define your criteria: location, budget. then the system will check on all inputs on craigslist and send you the available places directly to your personal email. Then you just click on the link and it will connect you to the craigslist ad."}),Object(b.jsx)("h3",{className:"h3-about",children:"When does it happens?"}),Object(b.jsx)("p",{className:"p-about",children:"The queries are executed from morning to late evening each 30 minutes. It uses a schedule provided by GitHub Actions."}),Object(b.jsx)("p",{className:"p-about",children:"Also, it is possible to execute a post request, with a secret, that will execute the queries, compare data and record new information in database."}),Object(b.jsx)("p",{className:"p-about",children:"The client side can be executed at any time."}),Object(b.jsx)("h3",{className:"h3-about",children:"Architecture"}),Object(b.jsx)("p",{className:"p-about",children:"1- Server is running on web (Vercel)."}),Object(b.jsx)("p",{className:"p-about",children:"2- A crontab at github action will trigger the system each 30 minutes, between 7am to 9pm (personal definition)."}),Object(b.jsx)("p",{className:"p-about",children:"3- The server receives the post request, goes to craigslist; Simultaneously, it queries the database. After receiving both results, it compares the array of data and check 1) what is a new item, 2) what was changed and 3) what was deleted by the owner."}),Object(b.jsx)("p",{className:"p-about",children:"4- After comparing the data currently recorded on database with the data received from craiglist, if any changes, it will email the Home seeker's adminstrator."}),Object(b.jsx)("p",{className:"p-about",children:"5- The users may access the system via web and check all registeres and their status. It is possible to remove an undesired item."}),Object(b.jsx)("p",{className:"p-about",children:"* There are 3 possible status for each item recorded:"}),Object(b.jsx)("p",{className:"p-about",children:"a- Available,"}),Object(b.jsx)("p",{className:"p-about",children:"b- Removed by Owners, it happens when the post's owners remove them,"}),Object(b.jsx)("p",{className:"p-about",children:"c- Removed by Admins, when the admins decide the item is not suitable and it will not be shown on available table."}),Object(b.jsx)("p",{className:"p-about",children:"* One item can be removed by its owner and afterwards they want them back on craiglist. The system will detect this action and mark the item as available and reactivated."}),Object(b.jsx)("h3",{className:"h3-about",children:"Step-by-step on an image"}),Object(b.jsx)("p",{className:"p-about",children:"1- Github Action triggers a post request to the server."}),Object(b.jsx)("p",{className:"p-about",children:"2- Server receives the post request and queries Craigslist and Atlas MongoDB."}),Object(b.jsx)("p",{className:"p-about",children:"3- Server receives the results and compares than."}),Object(b.jsx)("p",{className:"p-about",children:"4- If any update or new item, the system emails the adminsitrators."}),Object(b.jsx)("p",{className:"p-about",children:"5- Users or Administrators may request to check the items; Optionally, the admins can remove ads. This is usefull to keep the availables items clean, showing only the desired ones."}),Object(b.jsx)("div",{className:"position-img-about",children:Object(b.jsx)("img",{src:P,alt:"shows the architecture",className:"img-about"})}),Object(b.jsx)("h3",{className:"h3-about",children:"Tech stack"}),Object(b.jsx)("p",{className:"p-about",children:"Node.js, React, Atlas MongoDB, HTML, CSS, Axios, Node-fetch, React-icons, Mongoose, Node-Mailer, and React-Modal."}),Object(b.jsxs)("div",{className:"last-div-about",children:[Object(b.jsx)("p",{className:"last-p-about",children:"Please, feel free to reach out in case any doubts or contribuitions. ;) "}),Object(b.jsxs)("p",{className:"last-p-about",children:["Find this project on",Object(b.jsx)("a",{href:"https://github.com/tonykieling/home-seeker",target:"_blank",rel:"noreferrer",children:" GitHub"})]}),Object(b.jsx)("p",{className:"last-p-about",children:Object(b.jsx)("a",{href:"https://tkwebdev.ca",target:"_blank",rel:"noreferrer",children:"https://tkwebdev.ca"})})]})]})};var E=function(){return Object(b.jsxs)(i.a,{children:[Object(b.jsx)(d,{}),Object(b.jsxs)(o.c,{children:[Object(b.jsx)(o.a,{exact:!0,path:"/aptosList",children:Object(b.jsx)(T,{})}),Object(b.jsx)(o.a,{exact:!0,path:"/about",children:Object(b.jsx)(B,{})})]}),Object(b.jsx)(F,{})]})},L=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,86)).then((function(t){var a=t.getCLS,s=t.getFID,c=t.getFCP,r=t.getLCP,n=t.getTTFB;a(e),s(e),c(e),r(e),n(e)}))};n.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(E,{})}),document.getElementById("root")),L()}},[[85,1,2]]]);
//# sourceMappingURL=main.722bad80.chunk.js.map