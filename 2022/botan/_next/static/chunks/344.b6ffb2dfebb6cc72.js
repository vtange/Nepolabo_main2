"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[344],{7415:function(a,b,c){c.d(b,{Z:function(){return i}});var d=c(4111),e=c(1438),f=c(8029);function g(a,b){(null==b||b>a.length)&&(b=a.length);for(var c=0,d=Array(b);c<b;c++)d[c]=a[c];return d}var h=c(6626),i=function(a){(0,f.Z)(c,a);var b=(0,h.Z)(c);function c(a,f){var g;return(0,e.Z)(this,c),(g=b.call(this,a)).media=f.map(function(a){return window.matchMedia(a)}),g.listeners=Array(f.length).fill(null).map(function(a,b){return function(a){return g.update(a,b)}}),g.update=g.update.bind((0,d.Z)(g)),g.matches=g.matches.bind((0,d.Z)(g)),g.setMatch=g.setMatch.bind((0,d.Z)(g)),g}var i=c.prototype;return i.setMatch=function(a,b,c){if(void 0===a)a=Array(this.media.length).fill(!1);else{var d;a=function(a){if(Array.isArray(a))return g(a)}(d=a)||function(a){if("undefined"!=typeof Symbol&&null!=a[Symbol.iterator]||null!=a["@@iterator"])return Array.from(a)}(d)||function(a,b){if(a){if("string"==typeof a)return g(a,b);var c=Object.prototype.toString.call(a).slice(8,-1);if("Object"===c&&a.constructor&&(c=a.constructor.name),"Map"===c||"Set"===c)return Array.from(c);if("Arguments"===c||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(c))return g(a,b)}}(d)||function(){throw TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}return a[b]=c,a},i.update=function(a,b){var c=this;this.setState(function(d){return{matchesMediaQuery:c.setMatch(d.matchesMediaQuery,b,!0===a.matches)}})},i.matches=function(a){return this.state&&!!this.state.matchesMediaQuery&&this.state.matchesMediaQuery[a]},i.componentDidMount=function(){var a=this;this.media.forEach(function(b,c){return b.addEventListener("change",a.listeners[c])}),this.setState({matchesMediaQuery:this.media.map(function(a){return a.matches})})},i.componentWillUnmount=function(){var a=this;this.media.forEach(function(b,c){return b.removeEventListener("change",a.listeners[c])})},c}(c(7294).Component)},5344:function(a,b,c){c.r(b),c.d(b,{default:function(){return k}});var d=c(4111),e=c(1438),f=c(8029),g=c(6626),h=c(5893),i=c(7415),j=c(1058),k=function(a){(0,f.Z)(c,a);var b=(0,g.Z)(c);function c(a){var f;return(0,e.Z)(this,c),(f=b.call(this,a,["(min-width: 768px)","(min-width: 992px)"])).frame_id=Math.floor(3*Math.random()),f.getFrameShape=f.getFrameShape.bind((0,d.Z)(f)),f.getFrameUrl=f.getFrameUrl.bind((0,d.Z)(f)),f}var i=c.prototype;return i.getFrameShape=function(){return this.matches(1)?"wide":this.matches(0)?"square":"narrow"},i.getFrameUrl=function(a){var b=this.getFrameShape();return"../frames/frame".concat(a,"_").concat(b,".png")},i.render=function(){return(0,h.jsx)(j.Z,{src:this.getFrameUrl(this.frame_id),alt:"Message frame",layout:"fill",objectFit:"fill",objectPosition:"center",unoptimized:!0})},c}(i.Z)}}])