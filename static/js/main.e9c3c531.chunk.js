(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{119:function(e,t,a){},120:function(e,t,a){},192:function(e,t,a){e.exports=a.p+"static/media/logo.5d5d9eef.svg"},193:function(e,t,a){},195:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),c=a(85),o=a.n(c),s=(a(95),a(25)),i=a.n(s),l=a(36),u=a(13),m=a(45),f=a.n(m),p="https://accounts.spotify.com/authorize",d="e06a8e4468034056a35e699e61e7b0cb",b="https://huangdarren1106.github.io",h=["user-top-read","user-read-currently-playing","user-read-playback-state"],g=window.location.hash.substring(1).split("&").reduce(function(e,t){if(t){var a=t.split("=");e[a[0]]=decodeURIComponent(a[1])}return e},{});window.location.hash="";var v=g,w=(a(119),a(120),a(9)),E=(a(50),a(121),a(59),a(89)),j=a(27),O=a(88);function y(e){var t=e.chartData,a=e.artistToGenres;new O.Parser;return r.a.createElement("div",{className:"PiChart"},r.a.createElement("head",null,r.a.createElement(j.a,null,r.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}))),r.a.createElement(E.a,{data:t,options:{plugins:{title:{display:!1,text:"Your Top Genres",color:"#000000"},legend:{display:!0,position:"bottom",labels:{padding:6,boxWidth:20,color:"#000000",font:{size:13}}},tooltip:{callbacks:{label:function(e){var t=e.label+": ",n=[];return a.map(function(t){t.genresArr.includes(e.label)&&n.push(t.artistName)}),n.map(function(e){t=t+e+", "}),t=t.substring(0,t.length-2)}}}}}}))}function k(e){var t=e.token,c=Object(n.useState)([]),o=Object(u.a)(c,2),s=o[0],m=o[1],f=Object(n.useState)({}),p=Object(u.a)(f,2),d=(p[0],p[1]),b=a(45),h=(a(194),a(182),a(191),Object(n.useState)({})),g=Object(u.a)(h,2),v=g[0],E=g[1],j=Object(n.useState)(!1),O=Object(u.a)(j,2),k=O[0],N=O[1],S=function(e){if(0===e.length)return-1;for(var t=e[0],a=0,n=1;n<e.length;n++)e[n]>t&&(a=n,t=e[n]);return a};return Object(n.useEffect)(function(){var e=[];(function(){var t=Object(l.a)(i.a.mark(function t(a){var n,r,c,o,s,l,u,f,p,h,g,v,j,O;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return r={Authorization:"Bearer "+a},t.next=3,b.get("https://api.spotify.com/v1/me/top/artists",{headers:r}).then(function(t){e=t.data.items});case 3:for(c=e.map(function(e,t){var a=e.name;e.images[0].url;return{artistName:a,genresArr:e.genres}}),console.log(c),m(c),o=e.map(function(e,t){return e.genres}),s=(n=[]).concat.apply(n,Object(w.a)(o)),l={},s.map(function(e){l[e]=0}),s.map(function(e){l[e]=l[e]+1}),u=Object.keys(l),f=Object.values(l),p=0,h=[];20!=p&&0!=u.length;)g=S(f),h.push(u[g]),u.splice(g,1),f.splice(g,1),p++;v={},h.map(function(e){v[e]=l[e]}),d(v),j=Object.values(v).reduce(function(e,t){return e+t},0),O={labels:Object.keys(v),datasets:[{label:"Your Top Genres",data:Object.values(v).map(function(e){return Math.round(e/j*100)/100}),backgroundColor:["#e6194b","#3cb44b","#ffe119","#4363d8","#f58231","#911eb4","#46f0f0","#f032e6","#bcf60c","#fabebe","#008080","#e6beff","#9a6324","#fffac8","#800000","#aaffc3","#808000","#ffd8b1","#000075","#808080"],borderColor:"white",radius:"100%"}]},E(O),N(!0);case 23:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}})()(t)},[]),k?r.a.createElement("body",{className:"GraphScreen"},r.a.createElement("div",{className:"PiWrapper"},r.a.createElement(y,{chartData:v,artistToGenres:s})),r.a.createElement("table",{className:"TablePi"},s.map(function(e,t){var a=e.artistName,n="thArtist"+t;return console.log(t),r.a.createElement("tr",{className:n},r.a.createElement("th",null,a))}))):r.a.createElement("div",{className:"GraphScreen"},"loading")}a(192),a(193);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(function(){var e=Object(n.useState)(null),t=Object(u.a)(e,2),a=t[0],c=t[1],o=Object(n.useState)([]),s=Object(u.a)(o,2),m=(s[0],s[1],Object(n.useState)(!1)),g=Object(u.a)(m,2),w=(g[0],g[1],Object(n.useState)([])),E=Object(u.a)(w,2),O=(E[0],E[1],Object(n.useState)(!1)),y=Object(u.a)(O,2),N=(y[0],y[1],Object(n.useState)("")),S=Object(u.a)(N,2),A=S[0],x=S[1];return Object(n.useEffect)(function(){var e,t=v.access_token;t&&c(t),a&&function(){var t=Object(l.a)(i.a.mark(function t(){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("try"),n={Authorization:"Bearer "+a},t.next=4,f.a.get("https://api.spotify.com/v1/me",{headers:n}).then(function(t){e=t.data.display_name,x(e)});case 4:case"end":return t.stop()}},t)}));return function(){return t.apply(this,arguments)}}()()},[a]),r.a.createElement("div",null,r.a.createElement("head",null,r.a.createElement(j.a,null,r.a.createElement("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),r.a.createElement("link",{rel:"stylesheet",href:"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"}))),!a&&r.a.createElement("header",{className:"Header"},"Spotify Pie"),!a&&r.a.createElement("header",{className:"Header2"},"Bake Your Monthly Genre Pie"),a&&""!==A&&r.a.createElement("header",{className:"Header3"},"Pie of ",A),r.a.createElement("body",{className:"App-body"},!a&&r.a.createElement("a",{className:"btn btn--loginApp-link",href:"".concat(p,"?client_id=").concat(d,"&redirect_uri=").concat(b,"&scope=").concat(h.join("%20"),"&response_type=token&show_dialog=true")},"Login to Spotify"),a&&r.a.createElement(k,{token:a}),!a&&r.a.createElement("div",{className:"Author-wrapper"},r.a.createElement("a",{className:"Author"},"Made by Darren Huang"),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("a",{className:"Author"},"Have a message for Pie boy? Send it to him! ^_^"),r.a.createElement("br",null),r.a.createElement("a",{href:"https://www.instagram.com/drnhng/",class:"fa fa-instagram"}))))},null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},59:function(e,t,a){},90:function(e,t,a){e.exports=a(195)},95:function(e,t,a){}},[[90,1,2]]]);
//# sourceMappingURL=main.e9c3c531.chunk.js.map