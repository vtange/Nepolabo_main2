var fernScene=null;function pythag(e,n){return Math.pow(Math.pow(n.x-e.x,2)+Math.pow(n.y-e.y,2)+Math.pow(n.z-e.z,2),.5)}function cleanupAnim(e){PubSub.publish("PLAY_SOUND","cleansed");var n=document.createElement("div");n.className="cleanup-container";var t=document.createElement("div");t.className="cleanup";var i=document.createElement("div");i.className="star-ring",t.innerHTML="Cleanup",e.appendChild(t),e.appendChild(n),e.appendChild(i);for(var o=0;o<13;o++)twinkleStar(e);Math.random()>.5?PubSub.publish("PLAY_SOUND","daisukidayo"):PubSub.publish("PLAY_SOUND","itumoarigato"),PubSub.publish("STOP_SOUND","propose2"),window.setTimeout((function(){e.removeChild(t),e.removeChild(n),e.removeChild(i)}),2e3)}function twinkleStar(e){var n=document.createElement("div");n.style.animationDelay=1.5*Math.random()+"s";var t=Math.floor(100*Math.random());n.style.height=t+"px",n.style.width=t+"px",n.style.top=Math.floor(Math.random()*e.offsetHeight)+"px",n.style.left=Math.floor(Math.random()*e.offsetWidth)+"px",n.className="star",e.appendChild(n),window.setTimeout((function(){e.removeChild(n)}),3e3)}document.getElementById("nojs-cover").style.display="none";var pingCount=0,yamenaed=!1,nee=!1,kuuki=!1;function polishPing(e,n){var t=document.createElement("div");t.style.position="absolute",t.style.top=e.y+"px",t.style.left=e.x+"px",t.style.transform="translate(-50%, -25%) rotateZ("+(Math.round(60*Math.random())-30)+"deg)";var i=document.createElement("div");i.className="firework",t.appendChild(i),n.appendChild(t),PubSub.publish("PLAY_SOUND","dab"),window.setTimeout((function(){n.removeChild(t)}),1e3),++pingCount>25&&0==kuuki&&(kuuki=!0,PubSub.publish("PLAY_SOUND","kuukiwoyome")),pingCount>20&&0==nee?(kuuki=!0,PubSub.publish("PLAY_SOUND","nee")):pingCount>12&&0==yamenaed&&(yamenaed=!0,PubSub.publish("PLAY_SOUND","yamena"))}document.addEventListener("DOMContentLoaded",(function(){var e=document.getElementById("BABYLON_GAME"),n=document.getElementById("append"),t=document.getElementById("overlay"),i=BABYLON.Engine.isSupported();if(document.addEventListener("visibilitychange",(function(){document.hidden?PubSub.publish("MUTE_AUDIO_CAUSE_USER_LEFT",!0):PubSub.publish("MUTE_AUDIO_CAUSE_USER_LEFT",!1)}),!1),i&&e){var o=(fernScene=new FernScene(e)).importMeshWrapper.loadMeshes(ringPolish,gltfManifest);Promise.all(o.promiseChain).then((function(){var i=new BABYLON.StandardMaterial("decalMat",fernScene.self);i.diffuseTexture=new BABYLON.Texture("assets/decal.png",fernScene.self),i.diffuseTexture.hasAlpha=!0,i.zOffset=-2;var o=[];e.addEventListener("pointerdown",(function(e){if(0===e.button){var i=fernScene.self.createPickingRay(fernScene.self.pointerX,fernScene.self.pointerY,BABYLON.Matrix.Identity(),fernScene.camera),a=fernScene.self.pickWithRay(i);a&&a.pickedMesh&&(t.classList.contains("happy")?polishPing(e,n):(polishPing(e,n),t.classList.add("happy"),document.querySelector(".characters").classList.add("happy"),o.forEach((function(e){e.dispose()})),cleanupAnim(n)))}}),!1);var a=document.createElement("div");a.style.position="absolute",a.id="sukusho_rdy",document.body.appendChild(a),document.querySelector(".characters").style.visibility="visible",document.querySelector(".slider-container").style.visibility="visible",fernScene.runRenderLoop(),window.setTimeout((function(){!function(){for(var e,n,t,a,u=[[{_isDirty:!0,_x:-.12536327931722058,_y:-.9764872481574285,_z:-.05265511717359006},{_isDirty:!0,_x:.10269178942849629,_y:.9910690391043695,_z:-.08506794997362338}],[{_isDirty:!0,_x:.9054618415707099,_y:-.30794223286597777,_z:-.016992760980625743},{_isDirty:!0,_x:-.947849697411902,_y:.31397817892503527,_z:-.05475996964101439}],[{_isDirty:!0,_x:.7021885353171902,_y:.7715645805303604,_z:-.15481581741462414},{_isDirty:!0,_x:.3128402055192692,_y:-.07604692454437263,_z:-.9467565004149714}],[{_isDirty:!0,_x:-1.109738818503176,_y:.41670080313766356,_z:-.0695999078175431},{_isDirty:!0,_x:-.38832876363395746,_y:.17317000207847738,_z:-.9051038181969305}],[{_isDirty:!0,_x:-.79943509182186,_y:.8613920424867194,_z:-.06631060647808251},{_isDirty:!0,_x:-.37347877472915453,_y:.3813255294762472,_z:-.845638483866758}]],r=0;r<4;r++)e=u[r],n=void 0,t=void 0,a=void 0,n=Math.max(.1,.5*Math.random()),t=new BABYLON.Vector3(n,n,n),(a=BABYLON.MeshBuilder.CreateDecal("decal",fernScene.self.getMeshById("Torus.001_primitive2"),{position:new BABYLON.Vector3(e[0]._x,e[0]._y,e[0]._z),normal:new BABYLON.Vector3(e[1]._x,e[1]._y,e[1]._z),size:t})).material=i,o.push(a)}()}),100);const u={bgm_title:["audio/tenderlyglow.mp3",.05],dab:["audio/dab.mp3",.1],cleansed:["audio/cleansed.mp3",.1],itumoarigato:["audio/lamy_itumoarigato_beginningofbeginning_ech.mp3",.1],propose2:["audio/propose2_clean_ech.mp3",.1],yamena:["audio/yamenabokeru_ech.mp3",.1],nee:["audio/nee_ech.mp3",.1],kuukiwoyome:["audio/kuukiwoyome_ech.mp3",.1],daisukidayo:["audio/yukiminsan_daisukidayo_ech.mp3",.1]};function r(e){var n=new BABYLON.Sound(e,u[e][0],fernScene.self,(function(){n.setVolume(u[e][1]),window.setTimeout((function(){var t=document.getElementById("loading");if("bgm_title"===e){n.play(),t.classList.add("bgmLoaded"),t.style.cursor="pointer",document.body.addEventListener("click",(function e(){var n=document.getElementById("babylonUnmuteIconBtn");t.style.opacity=0,t.style.pointerEvents="none",PubSub.publish("PLAY_SOUND","propose2"),n&&n.click(),document.body.removeEventListener("click",e)}))}PubSub.subscribe("PLAY_SOUND",(function(t,i){i===e&&n.play()})),PubSub.subscribe("STOP_SOUND",(function(t,i){i===e&&(n.stop(),n.setVolume(0))})),PubSub.subscribe("MUTE_AUDIO_CAUSE_USER_LEFT",(function(t,i){n.setVolume(i?0:u[e][1])}))}),500)}),{loop:"bgm_title"===e,autoplay:!1})}for(var s in u)r(s)}))}}),!1);