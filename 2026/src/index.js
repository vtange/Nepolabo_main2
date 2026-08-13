document.getElementById("nojs-cover").style.display = "none";
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
function recalcScreenSize(){
  if (window.outerHeight/ window.outerWidth > 1.1) {
    bg.classList.remove("desktop");
    bg.classList.add("mobile");
  } else {
    bg.classList.remove("mobile");
    bg.classList.add("desktop");
  }
}
recalcScreenSize();
window.addEventListener("resize", debounce(recalcScreenSize,200));
/*-----------------------------*/
var fanletters = {
    view: function (vnode) {
        return m("section.postcards", vnode.attrs.data.messages.map(o =>
            m(".postcard[oshi="+o.oshi+"]",
                [m(".postcard-header",
                        m(".user-info",
                            [(o.prof?m("img.profile-pic[src="+o.prof+"]"):""),
                            m("span.user-name", o.name),
                            (o.twit?m("span.user-twitter", "@"+o.twit):"")])),
                    m(".messages",
                        [m('div[lang="' + (o.isJP ? 'ja' : 'en') + '"]',
                                m("p", o.msg)),
                            (o.msg_jp ? m('div[lang="ja"]', m("p", o.msg_jp)) : m('div[lang="ja"]', m(`p[data-name="${o.name}"]`, ""))),
                            (o.art ? m(".msg-art", Array.isArray(o.art) ? o.art.map((urlMin)=>
                            m('a[href="'+urlMin.replace(/\_\./g, ".").replace(/art(.*)\/min/g, "art$1") +'"][data-attr='+o.name+']',
                                m('img[src="' + urlMin + '"][alt=""][title=""]')))
                                :  m('a[href="' + o.art.replace(/\_\./g, ".").replace(/art(.*)\/min/g, "art$1") + '"]', m('img[src="' + o.art + '"][alt=""][title=""]'))) : "")
                        ]
                    )
                ])
        ));
    }
}

if (data) {
    m.mount(document.getElementById('nepolabocards'), {
        view: ()=>
            m(fanletters, {data:data})

    })
}
if (dataNene) {
    m.mount(document.getElementById('nenecards'), {
        view: ()=>
            m(fanletters, {data:dataNene})

    })
    document.getElementById('nenecards').setAttribute("hasData","true");
}
if (dataPolka) {
    m.mount(document.getElementById('polkacards'), {
        view: ()=>
            m(fanletters, {data:dataPolka})

    })
    document.getElementById('polkacards').setAttribute("hasData","true");
}
if (dataLamy) {
    m.mount(document.getElementById('lamycards'), {
        view: ()=>
            m(fanletters, {data:dataLamy})

    })
    document.getElementById('lamycards').setAttribute("hasData","true");
}
if (dataBotan) {
    m.mount(document.getElementById('botancards'), {
        view: ()=>
            m(fanletters, {data:dataBotan})

    })
    document.getElementById('botancards').setAttribute("hasData","true");
}

function initGallery(name){
    let gallery_a = new SimpleLightbox('#'+name+'-messages-popup .msg-art a', {disableScroll: false});
    gallery_a.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
}
var fanart = {
    nepolabo: false,
    nene: false,
    polka: false,
    lamy: false,
    botan: false,
};
var scroll = 0;
function toggleMessagesPopup(name, bool) {
    if(!fanart[name]) {
        fanart[name] = true;
        initGallery(name);
    }
    document.body.classList.toggle("showMessages", bool);
    document.body.classList.toggle("showMessages"+name, bool);
    if(bool) {
        scroll =  document.documentElement.scrollTop
    } else {
        window.scrollTo(0,scroll);
    }
}

function toggleCreditsPopup(bool) {
    document.body.classList.toggle("showCredits", bool);
}

function toggleCreditsExpand(bool) {
    document.body.classList.toggle("showVideoCredits", bool);
}

// prevent click on mobile (which passes disabled button)
// var nplb [window.ne,window.po,window.ra,window.bo];
// nplb.forEach(function(el,i){
//     el.parentElement.addEventListener("click", function(e){
//         if(el.previousElementSibling.disabled) {
//            e.preventDefault();
//            e.stopPropagation();
//            return false;
//         }
//     });
// });

var strKey = "opt_lang";
var opt_lang = localStorage.getItem(strKey);
document.body.setAttribute("data-swaplang","JP");
document.getElementById("lang-btn").innerHTML = "JP";
if(opt_lang ==="EN" || opt_lang === "JP") {
    document.body.setAttribute("data-swaplang",opt_lang);
    document.getElementById("lang-btn").innerHTML = opt_lang;
}
function toggleLanguage(){
    var current = document.body.getAttribute("data-swaplang");
    var next = current === "JP" ? "EN" : "JP";
    document.body.setAttribute("data-swaplang",next);
    document.getElementById("lang-btn").innerHTML = next;
    localStorage.setItem(strKey,next);
}

// countdown stuff
var debutN = 1786546800000;
var debutP = 1786806000000;
var debutL = 1786460400000;
var debutB = 1786633200000;
var debutA = 1786719600000;
var debuts = [debutN,debutP,debutL,debutB];
var deadlineClasses = ["happyAnnivNene","happyAnnivPolka","happyAnnivLamy","happyAnnivBotan"];
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
        if(!el) return;
        if (el.getAttribute("done") === "true") {
            document.body.classList.add(deadlineClasses[i]);
            return;
        }
        var timeleft = (debuts[i] - time)/1000;
        el.innerHTML = secondsToHms(timeleft);
        if(timeleft < 0) {
            el.setAttribute("done","true");
            document.body.classList.add(deadlineClasses[i]);
        }
    });
}
function get(a){
    return document.querySelector(a);
}
var ne = get("#nene-messages-popup .timer");
var po = get("#polka-messages-popup .timer");
var ra = get("#lamy-messages-popup .timer");
var bo = get("#botan-messages-popup .timer");
var nplb = [ne,po,ra,bo];
runTimer();
window.setInterval(function(){
    runTimer();
},1000);
