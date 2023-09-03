document.getElementById("nojs-cover").style.display = "none";
var root = document.getElementById('cards');
var bg = document.getElementById('bg');

var windowWidth = window.outerWidth;
var windowHeight = window.outerHeight;
function recalcScreenSize(){
  windowWidth = window.outerWidth;
  windowHeight = window.outerHeight;
  if (windowHeight/windowWidth > 1.4) {
    bg.classList.remove("desktop");
    bg.classList.add("mobile");
  } else {
    bg.classList.remove("mobile");
    bg.classList.add("desktop");
  }
}
recalcScreenSize();
window.addEventListener("resize", debounce(recalcScreenSize,200));
var initted = false;
function init() {
    initted = true;
    let gallery_a = new SimpleLightbox('.msg-art a', {disableScroll: false});
    gallery_a.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
}
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

var fanletters = {
    view: function () {
        return m("section.postcards", data.messages.map(o =>
            m(".postcard[oshi="+o.oshi+"]",{style: {"color": getColor(o.oshi)}},
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
    m.mount(root, fanletters)
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

function toggleNepolaboPopup(bool) {
    document.body.classList.toggle("showIntro",bool);
}

// countdown stuff
var debutN = 1691852400000;
var debutP = 1692111600000;
var debutL = 1691766000000;
var debutB = 1691938800000;
var debutA = 1692000000000;
var debuts = [debutN,debutP,debutL,debutB];
var nplbClassNames = ["nene","polka","lamy","botan"];
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
        if(timeleft + (debutN-debutL)/1000 < 0) {
            bg.classList.remove(nplbClassNames[i]);
        } else if(!bg.classList.contains(nplbClassNames[i])) {
            bg.classList.add(nplbClassNames[i]);
        }
    });
    if ((debutA - time)/1000 < 0 && !bg.classList.contains("aloe")) {
        bg.classList.remove("aloe");
    } else if (!bg.classList.contains("aloe")) {
        bg.classList.add("aloe");
    }
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
// window.setInterval(function(){
//     runTimer();
// },1000);
var idx = 0;
var slideshowArr = nplbClassNames.concat(["","aloe"]);
var lastAdded = "";
window.setInterval(function(){
    if(slideshowArr[idx]) {
        bg.classList.add(slideshowArr[idx]);
    }
    if(lastAdded) {
        bg.classList.remove(lastAdded);
    }
    lastAdded = slideshowArr[idx];
    idx = idx === 5 ? 0 : idx+1;
},5000);

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

window.setInterval(function(){
    var newTwinkle = document.createElement("div");
    var rand1 = Math.random();
    var posLeft = Math.random()*bg.clientWidth;
    var posTop = Math.random()*bg.clientHeight*.9;
    newTwinkle.className = "twinkle";
    newTwinkle.style.height = rand1*100 + "px";
    newTwinkle.style.width = rand1*100 + "px";
    newTwinkle.style.left = posLeft + "px";
    newTwinkle.style.top = posTop + "px";
    bg.appendChild(newTwinkle);
    window.setTimeout(function(){
        newTwinkle.style.opacity = 1;
        newTwinkle.style.left = posLeft + (posLeft-bg.clientWidth/2)/2 + "px";
        newTwinkle.style.top = posTop + (posTop-bg.clientHeight/2)/2 + "px";
    },200);
    window.setTimeout(function(){
        newTwinkle.style.opacity = 0;
        window.setTimeout(function(){
            bg.removeChild(newTwinkle);
        },1700);
    },1800);
},350);