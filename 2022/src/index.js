document.getElementById("nojs-cover").style.display = "none";

var initted = false;
function init() {
    initted = true;
    let gallery_a = new SimpleLightbox('.msg-art a', {disableScroll: false});
    gallery_a.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
}
var root = document.getElementById('cards');
var sky = document.getElementById('sky');
var picnic = document.getElementById('picnic');
var tint = document.getElementById('picnictint');

function getColor(oshi){
    if (oshi === "Momosuzu Nene") {
        return "rgb("+255+","+208+","+177+")";
    } else if (oshi === "Shishiro Botan") {
        return "rgb("+215+","+255+","+225+")";
    } else if (oshi === "Yukihana Lamy") {
        return "rgb("+216+","+240+","+255+")";
    } else if (oshi === "Omaru Polka") {
        return "rgb("+255+","+183+","+199+")";
    }
    return "rgb("+227+","+215+","+255+")";
}

var Hello = {
    view: function () {
        return m("section.postcards", data.messages.map(o =>
            m(".postcard[oshi="+o.oshi+"]",{style: {"background-color": getColor(o.oshi)}},
                [m(".postcard-header",
                        m(".user-info",
                            [(o.prof?m("img.profile-pic[src="+o.prof+"]"):""),
                            m("span.user-name", o.name),
                            (o.twit?m("span.user-twitter", "@"+o.twit):"")])),
                    m(".messages",
                        [m('div[lang="' + (o.isJP ? 'ja' : 'en') + '"]',
                                m("p", o.msg)),
                            (o.msg_jp ? m('div[lang="ja"]', m("p", o.msg_jp)) : ""),
                            (o.art ? m(".msg-art", m('a[href="' + o.art.replace(/\_\./g, ".").replace(/art(.*)\/min/g, "art$1") + '"]', m('img[src="' + o.art + '"][alt=""][title=""]'))) : "")
                        ]
                    )
                ])
        ));
    }
}

if (data) {
    m.mount(root, Hello)
}

function toggleMessagesPopup(bool) {
    if(!initted) {
        init();
    }
    document.body.classList.toggle("showMessages",bool);
}

function toggleCreditsPopup(bool) {
    document.body.classList.toggle("showCredits",bool);
}
var tot = 0;
var fireworksactive = 0;
var colors = ["red","orange","yellow","green","aqua","blue","purp"];
// Fireworks stuff
function generateFirework(e){
    var colidx = Math.floor(Math.random()*colors.length);
    var newFireworkCont = document.createElement("div");
    var newFireworkRotator = document.createElement("div");
    newFireworkRotator.style.transform = "rotateZ("+(Math.round(Math.random()*60)-30)+"deg)"
    newFireworkCont.className = "firework-"+colors[colidx];
    newFireworkCont.style.position = "absolute";
    newFireworkCont.style.top = e.y+"px";
    newFireworkCont.style.left = e.x+"px";
    var val = Math.floor(Math.random()*8);
    var newFirework = document.createElement("div");
    if(val < 1) {
        newFirework.className = "nefirework";
    } else if(val < 2) {
        newFirework.className = "pofirework";
    } else if(val < 3) {
        newFirework.className = "rafirework";
    } else if(val < 4) {
        newFirework.className = "bofirework";
    } else if(val < 5) {
        newFirework.className = Math.round(Math.random()) ? "heartfirework" : "heartfireworkwithcolorchange";
    } else {
        newFirework.className = Math.round(Math.random()) ? "firework" : "fireworkwithcolorchange";
    }
    var newUchiage = document.createElement("div");
    newUchiage.className = "uchiage";
    var newSparkle = document.createElement("div");
    newSparkle.className = "sparkle";
    var newSparkle1 = document.createElement("div");
    newSparkle1.className = "sparkle1";
    var newSparkle2 = document.createElement("div");
    newSparkle2.className = "sparkle2";
    newUchiage.appendChild(newSparkle);
    newUchiage.appendChild(newSparkle1);
    newUchiage.appendChild(newSparkle2);
    newFireworkRotator.appendChild(newFirework);
    newFireworkCont.appendChild(newFireworkRotator);
    newFireworkCont.appendChild(newUchiage);
    sky.appendChild(newFireworkCont);
    tot += colidx;
    fireworksactive++;
    window.setTimeout(function(){
        //check how much red we have on screen;
        picnic.style.filter = "brightness(1.6)";
        tint.style.opacity = 1-(tot/(fireworksactive*6));
        fireworksactive--;
        tot -= colidx;
        resetBrightness();
    },1190);
    window.setTimeout(function(){
        sky.removeChild(newFireworkCont);
    },3000);
}

var resetBrightness = debounce(function(){
    picnic.style.filter = "brightness(1)";
    tint.style.opacity = 0;
},1500);
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var windowWidth = window.outerWidth;
var windowHeight = window.outerHeight;
function recalcScreenSize(){
  windowWidth = window.outerWidth;
  windowHeight = window.outerHeight;
}
window.addEventListener("resize", debounce(recalcScreenSize,200));
var lastClick = 1;
window.setInterval(function(){
if(Date.now() - lastClick > 5000) {
    generateFirework({
        x:Math.random()*windowWidth*.9,
        y:Math.min(0.5,Math.random())*windowHeight
    })
}
},5000);

sky.addEventListener("click", function(e){
    document.getElementById("tutorial").style.display = "none";
    lastClick = Date.now();
    generateFirework(e);
});

// countdown stuff
var debutN = 1628780400000+31557600000-10800000;
var debutP = 1660597200000+3600000*11; //6AM japan time + 9 more hrs
var debutL = 1628694000000+31557600000-10800000;
var debutB = 1628866800000+31557600000+3600000*12;
var debuts = [debutN,debutP,debutL,debutB];
function secondsToHms(d) {
    d = Number(d);
    if(d<0) return "00:00:00 🎉";
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? (h>9?h:"0"+h) + ":" : "00:") + (m>9?m:"0"+m) + ":" + (s < 10 ? "0" : "") + s
    );
}
function runTimer(){
    var time = new Date().getTime();
    nplb.forEach(function(el,i){
        var timeleft = (debuts[i] - time)/1000;
        if (el.getAttribute("done") === "true") return;
        el.innerHTML = secondsToHms(timeleft);
        if(timeleft < 0) {
            el.setAttribute("done","true");
            //previousElementSibling MUST be <button>
            el.previousElementSibling.disabled = false;
        }
    });
}
function get(a){
    return document.getElementById(a);
}
var ne = get("ne");
var po = get("po");
var ra = get("ra");
var bo = get("bo");
var nplb = [ne,po,ra,bo];
runTimer();
window.setInterval(function(){
    runTimer();
},1000);
// prevent click on mobile (which passes disabled button)
nplb.forEach(function(el,i){
    el.parentElement.addEventListener("click", function(e){
        if(el.previousElementSibling.disabled) {
           e.preventDefault();
           e.stopPropagation();
           return false;
        }
    });
});

var strKey = "opt_lang";
idbKeyval.get(strKey).then(function(returnVal){
    if(returnVal ==="EN" || returnVal === "JP") {
        document.body.setAttribute("data-swaplang",returnVal);
        document.getElementById("lang-btn").innerHTML = returnVal;
    }
});

function toggleLanguage(){
    var current = document.body.getAttribute("data-swaplang");
    var next = current === "JP" ? "EN" : "JP";
    document.body.setAttribute("data-swaplang",next);
    document.getElementById("lang-btn").innerHTML = next;
    idbKeyval.set(strKey,next);
}