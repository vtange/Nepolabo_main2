"use strict";function _createForOfIteratorHelper(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!r){if(Array.isArray(e)||(r=_unsupportedIterableToArray(e))||t&&e&&"number"==typeof e.length){r&&(e=r);var n=0,t=function(){};return{s:t,n:function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}},e:function(e){throw e},f:t}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,i=!0,a=!1;return{s:function(){r=r.call(e)},n:function(){var e=r.next();return i=e.done,e},e:function(e){a=!0,o=e},f:function(){try{i||null==r.return||r.return()}finally{if(a)throw o}}}}function _unsupportedIterableToArray(e,t){if(e){if("string"==typeof e)return _arrayLikeToArray(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Map"===(r="Object"===r&&e.constructor?e.constructor.name:r)||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?_arrayLikeToArray(e,t):void 0}}function _arrayLikeToArray(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}var Confetti=function(){var p,o=75,a=25,l=1,f=!1,t=!0,y=[],s=(new Date).getTime(),u=!1;function e(e){var t=document.getElementById(e);function r(){t.width=2*window.innerWidth,t.height=2*window.innerHeight}r(),p=t.getContext("2d"),window.addEventListener("resize",r)}function i(e,t){var r,n=Math.random(),o=(16*n+4)*l,i=(4*n+4)*l;return{pos:{x:e-o/2,y:t-i/2},vel:(r=Math.random()-.5,e=Math.random()-1.2,t=Math.sqrt(r*r+e*e),e/=t,{x:(r/=t)*(Math.random()*a),y:e*(Math.random()*a)}),size:{x:o,y:i},rotation:360*n,rotation_speed:10*(n-.5),hue:360*n,opacity:100,lifetime:n+.25}}return e.prototype.setCount=function(e){"number"==typeof e?o=e:console.error("[ERROR] Confetti.setCount() - Input needs to be of type 'number'")},e.prototype.setPower=function(e){"number"==typeof e?a=e:console.error("[ERROR] Confetti.setPower() - Input needs to be of type 'number'")},e.prototype.setSize=function(e){"number"==typeof e?l=e:console.error("[ERROR] Confetti.setSize() - Input needs to be of type 'number'")},e.prototype.setFade=function(e){"boolean"==typeof e?f=e:console.error("[ERROR] Confetti.setFade() - Input needs to be of type 'boolean'")},e.prototype.destroyTarget=function(e){"boolean"==typeof e?t=e:console.error("[ERROR] Confetti.destroyTarget() - Input needs to be of type 'boolean'")},e.prototype.fire=function(e){!function(e,t){for(var r=[],n=0;n<o;n++)r.push(i(e,t));y.push({particles:r})}(2*e.clientX,2*e.clientY),t&&(e.target.style.visibility="hidden")},e.prototype.pause=function(e){u=!0},window.requestAnimationFrame(function e(t){if(!u){var r=(t-s)/1e3;s=t;for(var n=y.length-1;0<=n;n--){for(var o=y[n],i=o.particles.length-1;0<=i;i--){var a=o.particles[i];a.vel.y+=a.size.y/(10*l)*10*r,a.vel.x+=25*(Math.random()-.5)*r,a.vel.x*=.98,a.vel.y*=.98,a.pos.x+=a.vel.x,a.pos.y+=a.vel.y,a.rotation+=a.rotation_speed,f&&(a.opacity-=a.lifetime),a.pos.y-2*a.size.x>2*window.innerHeight&&o.particles.splice(i,1)}0==o.particles.length&&y.splice(n,1)}!function(){if(p){p.clearRect(0,0,2*window.innerWidth,2*window.innerHeight);var e,t=_createForOfIteratorHelper(y);try{for(t.s();!(e=t.n()).done;){var r,n=_createForOfIteratorHelper(e.value.particles);try{for(n.s();!(r=n.n()).done;){var o=r.value,i=o.pos.x,a=o.pos.y,l=o.size.x,f=o.size.y,s=o.rotation,u=o.hue,c=o.opacity;p.save(),p.beginPath(),p.translate(i+l/2,a+f/2),p.rotate(s*Math.PI/180),p.rect(-l/2,-f/2,l,f),p.fillStyle="hsla(".concat(u,"deg, 90%, 65%, ").concat(c,"%)"),p.fill(),p.restore()}}catch(e){n.e(e)}finally{n.f()}}}catch(e){t.e(e)}finally{t.f()}}}(),window.requestAnimationFrame(e)}}),e}();