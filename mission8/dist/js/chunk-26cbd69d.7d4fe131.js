(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26cbd69d"],{1799:function(t,e,r){"use strict";var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("nav",{attrs:{"aria-label":"Page navigation"}},[r("ul",{staticClass:"pagination justify-content-center"},[r("li",{staticClass:"page-item",class:{disabled:t.isPreviousNotAvailable}},[r("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Previous"},on:{click:function(e){return e.preventDefault(),t.goToPage(t.currentPage-1)}}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("«")]),r("span",{staticClass:"sr-only"},[t._v("Previous")])])]),t._l(t.totalPages,(function(e){return r("li",{key:"page"+e,staticClass:"page-item",class:{active:t.isCurrentPageMatch(e)}},[r("a",{staticClass:"page-link",attrs:{href:"#"},on:{click:function(r){return r.preventDefault(),t.goToPage(e)}}},[t._v(" "+t._s(e)+" "),t.isCurrentPageMatch(e)?r("span",{staticClass:"sr-only"},[t._v("(current)")]):t._e()])])})),r("li",{staticClass:"page-item",class:{disabled:t.isNextNotAvailable}},[r("a",{staticClass:"page-link",attrs:{href:"#","aria-label":"Next"},on:{click:function(e){return e.preventDefault(),t.goToPage(t.currentPage+1)}}},[r("span",{attrs:{"aria-hidden":"true"}},[t._v("»")]),r("span",{staticClass:"sr-only"},[t._v("Next")])])])],2)])},a=[],i={props:["pagination"],computed:{totalPages:function(){return this.pagination.total_pages||0},currentPage:function(){return this.pagination.current_page||0},isCurrentPageMatch:function(){var t=this;return function(e){return t.currentPage===e}},isPreviousNotAvailable:function(){return 0===this.currentPage||1===this.currentPage},isNextNotAvailable:function(){return this.currentPage===this.totalPages}},methods:{goToPage:function(t){this.$emit("refresh-content",t)}}},o=i,s=r("2877"),c=Object(s["a"])(o,n,a,!1,null,null,null);e["a"]=c.exports},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return a}));r("d3b7");function n(t,e,r,n,a,i,o){try{var s=t[i](o),c=s.value}catch(u){return void r(u)}s.done?e(c):Promise.resolve(c).then(n,a)}function a(t){return function(){var e=this,r=arguments;return new Promise((function(a,i){var o=t.apply(e,r);function s(t){n(o,a,i,s,c,"next",t)}function c(t){n(o,a,i,s,c,"throw",t)}s(void 0)}))}}},5651:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container",attrs:{id:"orders"}},[r("loading",{attrs:{active:t.isLoading,"is-full-page":t.isFullPageLoading},on:{"update:active":function(e){t.isLoading=e}}}),r("table",{staticClass:"table mt-4"},[t._m(0),r("tbody",t._l(t.orders,(function(e,n){return r("tr",{key:e.id},[r("td",{staticClass:"text-center"},[t._v(t._s(e.created.datetime))]),r("td",{staticClass:"text-center"},t._l(e.products,(function(e,n){return r("span",{key:"idx"+n},[t._v(" "+t._s(e.product.title+" X "+e.quantity+" "+e.product.unit)),r("br")])})),0),r("td",{staticClass:"text-center"},[t._v(t._s(e.payment))]),r("td",{staticClass:"text-right"},[t._v(t._s(t._f("formatCurrency")(e.amount)))]),r("td",{staticClass:"text-center"},[r("div",{staticClass:"custom-control custom-switch"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.paid,expression:"item.paid"}],staticClass:"custom-control-input",attrs:{type:"checkbox",id:"paid"+n},domProps:{checked:Array.isArray(e.paid)?t._i(e.paid,null)>-1:e.paid},on:{change:[function(r){var n=e.paid,a=r.target,i=!!a.checked;if(Array.isArray(n)){var o=null,s=t._i(n,o);a.checked?s<0&&t.$set(e,"paid",n.concat([o])):s>-1&&t.$set(e,"paid",n.slice(0,s).concat(n.slice(s+1)))}else t.$set(e,"paid",i)},function(r){return t.togglePaid(e)}]}}),r("label",{staticClass:"custom-control-label",attrs:{for:"paid"+n}},[e.paid?r("span",{staticClass:"text-success"},[t._v("已付款")]):r("span",[t._v("未付款")])])])])])})),0)]),r("pagination",{ref:"pagination",attrs:{pagination:t.pagination},on:{"refresh-content":t.getOrders}})],1)},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("thead",[r("tr",[r("th",{staticClass:"text-center",attrs:{width:"120"}},[t._v("下單時間")]),r("th",{staticClass:"text-center"},[t._v("購買項目")]),r("th",{staticClass:"text-center",attrs:{width:"120"}},[t._v("付款方式")]),r("th",{staticClass:"text-center",attrs:{width:"120"}},[t._v("應付款項")]),r("th",{staticClass:"text-center",attrs:{width:"120"}},[t._v("是否付款")])])])}],i=(r("99af"),r("7db0"),r("96cf"),r("1da1")),o=r("1799"),s={components:{Pagination:o["a"]},data:function(){return{apiInfo:{forOrders:"/admin/ec/orders"},mode:{new:0,edit:1},modalMode:0,orders:[],isLoading:!1,isFullPageLoading:!0,pagination:{}}},mounted:function(){this.getOrders()},methods:{givePage:function(t){return t||(this.pagination.current_page||1)},getOrders:function(t){var e=this;this.isLoading=!0,this.axios.get("".concat(this.apiInfo.forOrders,"?page=").concat(this.givePage(t),"&paged=10")).then((function(t){e.orders=t.data.data,e.pagination=t.data.meta.pagination,e.isLoading=!1})).catch((function(t){e.isLoading=!1,console.log(t)}))},openOrderModal:function(t,e){"new"===t?this.prepareNewOrder():this.prepareEditOrder(e)},prepareNewOrder:function(){this.modalMode=this.mode.new,this.$refs.orderEditor.clearFormData(),$("#orderModal").modal("show")},prepareEditOrder:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return e.modalMode=e.mode.edit,e.isLoading=!0,r.next=4,e.$refs.orderEditor.prepareOrder(t.id);case 4:e.isLoading=!1,$("#orderModal").modal("show");case 6:case"end":return r.stop()}}),r)})))()},togglePaid:function(t){var e=this;this.isLoading=!0,this.axios.patch("".concat(this.apiInfo.forOrders,"/").concat(t.id,"/").concat(t.paid?"paid":"unpaid")).then((function(){e.isLoading=!1})).catch((function(r){e.orders.find((function(e){return e.id===t.id})).paid=!t.paid,console.log(r),e.isLoading=!1}))},openRemoverModal:function(t){this.$refs.orderRemover.setToBeDeleteItem(t),$("#removerModal").modal("show")},setLoading:function(t){this.isLoading=t}}},c=s,u=r("2877"),l=Object(u["a"])(c,n,a,!1,null,null,null);e["default"]=l.exports},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,a="function"===typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",o=a.asyncIterator||"@@asyncIterator",s=a.toStringTag||"@@toStringTag";function c(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(M){c=function(t,e,r){return t[e]=r}}function u(t,e,r,n){var a=e&&e.prototype instanceof v?e:v,i=Object.create(a.prototype),o=new N(n||[]);return i._invoke=C(t,r,o),i}function l(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(M){return{type:"throw",arg:M}}}t.wrap=u;var h="suspendedStart",d="suspendedYield",f="executing",p="completed",g={};function v(){}function y(){}function m(){}var w={};w[i]=function(){return this};var _=Object.getPrototypeOf,x=_&&_(_(j([])));x&&x!==r&&n.call(x,i)&&(w=x);var b=m.prototype=v.prototype=Object.create(w);function L(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function P(t,e){function r(a,i,o,s){var c=l(t[a],t,i);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"===typeof h&&n.call(h,"__await")?e.resolve(h.__await).then((function(t){r("next",t,o,s)}),(function(t){r("throw",t,o,s)})):e.resolve(h).then((function(t){u.value=t,o(u)}),(function(t){return r("throw",t,o,s)}))}s(c.arg)}var a;function i(t,n){function i(){return new e((function(e,a){r(t,n,e,a)}))}return a=a?a.then(i,i):i()}this._invoke=i}function C(t,e,r){var n=h;return function(a,i){if(n===f)throw new Error("Generator is already running");if(n===p){if("throw"===a)throw i;return $()}r.method=a,r.arg=i;while(1){var o=r.delegate;if(o){var s=E(o,r);if(s){if(s===g)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===h)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=f;var c=l(t,e,r);if("normal"===c.type){if(n=r.done?p:d,c.arg===g)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n=p,r.method="throw",r.arg=c.arg)}}}function E(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return g;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var a=l(n,t.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,g;var i=a.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,g):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,g)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function k(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function j(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var a=-1,o=function r(){while(++a<t.length)if(n.call(t,a))return r.value=t[a],r.done=!1,r;return r.value=e,r.done=!0,r};return o.next=o}}return{next:$}}function $(){return{value:e,done:!0}}return y.prototype=b.constructor=m,m.constructor=y,y.displayName=c(m,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,s,"GeneratorFunction")),t.prototype=Object.create(b),t},t.awrap=function(t){return{__await:t}},L(P.prototype),P.prototype[o]=function(){return this},t.AsyncIterator=P,t.async=function(e,r,n,a,i){void 0===i&&(i=Promise);var o=new P(u(e,r,n,a),i);return t.isGeneratorFunction(r)?o:o.next().then((function(t){return t.done?t.value:o.next()}))},L(b),c(b,s,"Generator"),b[i]=function(){return this},b.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(k),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function a(n,a){return s.type="throw",s.arg=t,r.next=n,a&&(r.method="next",r.arg=e),!!a}for(var i=this.tryEntries.length-1;i>=0;--i){var o=this.tryEntries[i],s=o.completion;if("root"===o.tryLoc)return a("end");if(o.tryLoc<=this.prev){var c=n.call(o,"catchLoc"),u=n.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return a(o.catchLoc,!0);if(this.prev<o.finallyLoc)return a(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return a(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return a(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var a=this.tryEntries[r];if(a.tryLoc<=this.prev&&n.call(a,"finallyLoc")&&this.prev<a.finallyLoc){var i=a;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var o=i?i.completion:{};return o.type=t,o.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(o)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),k(r),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var a=n.arg;k(r)}return a}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=n}catch(a){Function("r","regeneratorRuntime = r")(n)}}}]);
//# sourceMappingURL=chunk-26cbd69d.7d4fe131.js.map