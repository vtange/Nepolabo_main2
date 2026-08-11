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
                            (o.art ? m(".msg-art", m('a[href="' + o.art.replace(/\_\./g, ".").replace(/art(.*)\/min/g, "art$1") + '"]', m('img[src="' + o.art + '"][alt=""][title=""]'))) : "")
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
    if(Array.isArray(polkaJP)){
        polkaJP.forEach(function(o){
            var jpmsg = document.querySelector(`#polkacards p[data-name="${o.name}"]`);
            if(jpmsg){
                jpmsg.textContent = o.msg_jp;
            }
        })
    }
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
    if(Array.isArray(botanJP)){
        botanJP.forEach(function(o){
            var jpmsg = document.querySelector(`#botancards p[data-name="${o.name}"]`);
            if(jpmsg){
                jpmsg.textContent = o.msg_jp;
            }
        })
    }
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

//youll need an array of images.
// loop through and then mount to root2
var root2 = document.getElementById('cards2');
var data2 = [
    {"name":"calico","twit":"","art":["calico_.jpg"]},
    {"name":"Xkorpitron","twit":"","art":["Xkorpitron_.jpg"]},
    {"name":"Calligo","twit":"","art":["Calligo_1_.jpg","Calligo_2_.jpg"]},
    {"name":"Raphi","twit":"ArchangelAinsW","art":["Raphi_1_.jpg","Raphi_2_.jpg","Raphi_3_.jpg","Raphi_4_.jpg","Raphi_5_.jpg"]},
    {"name":"夢境未來","twit":"mengjingweilai1","art":["mengjingweilai_1_.jpg","mengjingweilai_2_.jpg","mengjingweilai_3_.jpg","mengjingweilai_4_.jpg","mengjingweilai_5_.jpg"]},
    {"name":"いかやき","twit":"l3jJy64vXvzaVyZ","art":["ikayaki_1_.jpg","ikayaki_2_.jpg","ikayaki_3_.jpg","ikayaki_4_.jpg","ikayaki_5_.jpg"]},
    {"name":"Miruko","twit":"Mirukothe1st","art":["Miruko_1_.jpg","Miruko_2_.jpg","Miruko_3_.jpg","Miruko_4_.jpg"]},
    {"name":"Luyo","twit":"","art":["Luyo_1_.jpg","Luyo_2_.jpg","Luyo_3_.jpg","Luyo_4_.jpg","Luyo_5_.jpg"]},
    {"name":"ツーチャンス羽田","twit":"1_chance_no1","art":["two_chance_haneda_1_.jpg","two_chance_haneda_2_.jpg","two_chance_haneda_3_.jpg"]},
    {"name":"hunterkai","twit":"hunterkaigogo","art":["hunterkaigogo_.jpg"]},
    {"name":"Makkusu","twit":"makkusu_220","art":["Makkusu_.jpg"]},
    {"name":"Ortus","twit":"ortusbl1","art":["Ortus_1_.jpg","Ortus_2_.jpg"]},
    {"name":"Glob","twit":"SuperGlobMan","art":["Glob_.jpg"]},
    {"name":"Legzy","twit":"","art":["Legzy_.jpg"]},
    {"name":"Molom","twit":"","art":["Molom_1_.jpg","Molom_2_.jpg","Molom_3_.jpg"]},
    {"name":"Freak Video Gamer","twit":"","art":["FVG_1_.jpg","FVG_2_.jpg","FVG_3_.jpg","FVG_4_.jpg"]},
{"name":"Aza","twit":"YuNi83450213","art":["Aza_.jpg"]},
{"name":"Kuris","twit":"Moekuris","art":["kuris_1_.jpg","kuris_2_.jpg"]},
{"name":"ClumsyHero クラムジー・ヒーロー","twit":"clumsyhero","art":["clumsyhero_1_.jpg","clumsyhero_2_.jpg"]},
{"name":"GrandUNI","twit":"","art":["grand_.jpg"]},
{"name":"X-Kill","twit":"MauCaVel","art":["xkill_.jpg","xkill_1_.jpg","xkill_2_.jpg","xkill_3_.jpg"]},
{"name":"L Y K A N","twit":"LykanSekiro","art":["lykan_1_.jpg","lykan_2_.jpg","lykan_3_.jpg","lykan_4_.jpg","lykan_5_.jpg"]},
{"name":"Xemmy","twit":"Xemzemy","art":["xemmy_.jpg"]},
{"name":"DarkSamus100","twit":"","art":["darksamus100_1_.jpg","darksamus100_2_.jpg","darksamus100_3_.jpg","darksamus100_4_.jpg","darksamus100_5_.jpg"]},
{"name":"Reiner","twit":"","art":["reiner_1_.jpg","reiner_2_.jpg","reiner_3_.jpg"]},
{"name":"Thurisalgiz","twit":"Thurisalgiz","art":["thurisalgiz_1_.jpg","thurisalgiz_2_.jpg","thurisalgiz_3_.jpg","thurisalgiz_4_.jpg","thurisalgiz_5_.jpg"]},
{"name":"Eugeo kun","twit":"","art":["azureholy_.jpg"]},
{"name":"Arnar","twit":"","art":["arnar_.jpg"]},
{"name":"Phi","twit":"phi_io","art":["phi_.jpg"]},
{"name":"Zamber","twit":"PhantomZamber","art":["zamber_1_.jpg","zamber_2_.jpg","zamber_3_.jpg"]},
{"name":"Kuan","twit":"","art":["kuan_1_.jpg","kuan_2_.jpg","kuan_3_.jpg"]},
{"name":"miscinsanity","twit":"hazelowsla","art":["miscinsanity_1_.jpg","miscinsanity_2_.jpg","miscinsanity_3_.jpg","miscinsanity_4_.jpg"]},
{"name":"TruSanKyuu","twit":"","art":["tru_.jpg"]},
{"name":"Sabacoffe","twit":"Sabacoffe3851","art":["sabacoffe_1_.jpg","sabacoffe_2_.jpg","sabacoffe_3_.jpg"]},
{"name":"BaLa","twit":"","art":["bala_.jpg"]},
{"name":"D51","twit":"","art":["d51_.jpg"]},
{"name":"Vanilla Thunder","twit":"Vanilla_Inazuma","art":["vanilla_1_.jpg","vanilla_2_.jpg","vanilla_3_.jpg","vanilla_4_.jpg","vanilla_5_.jpg"]},
{"name":"でぃーしゃ","twit":"9862jade","art":["9862jade_1_.jpg","9862jade_2_.jpg"]},
{"name":"ずんどこべろんちょ","twit":"","art":["ずんどこべろんちょ_.jpg"]},
{"name":"Ceradys","twit":"Cera_dys","art":["cera_.jpg"]},
{"name":"HaruCore","twit":"HaruCore562","art":["harucore_1_.jpg","harucore_2_.jpg","harucore_3_.jpg","harucore_4_.jpg","harucore_5_.jpg"]},
{"name":"Yuki","twit":"","art":["yuki_.jpg"]},
{"name":"まる","twit":"","art":["maru_1_.jpg","maru_2_.jpg"]},
{"name":"Unearthly","twit":"unearthlycoder","art":["unearthly_.jpg"]},
{"name":"米作のコード","twit":"caute_zain","art":["caute_zain_1_.jpg","caute_zain_2_.jpg","caute_zain_3_.jpg"]},
{"name":"MIKADO","twit":"","art":["mikado_.jpg"]},
{"name":"Naki","twit":"Naki538","art":["naki_.jpg"]}];
if (data2) {
    var shrinePhotos = { view: function(){
        return m("section.photocards", data2.map(o =>
            m(".shrinecard",
                [m(".picturecard-header",
                        m(".user-info",
                            [m("span.user-name", o.name),
                            (o.twit?m("span.user-twitter", "@"+o.twit):"")])),
                 (o.art ? m(".msg-photos",o.art.map((urlMin)=>
                                m('a[href="shrines/'+urlMin.replace("_.jpg",".jpg") +'"][data-attr='+o.name+']',
                                    m('img[src="shrines/min/' + urlMin + '"][alt=""][title=""]')))
                                ) : "")
                ])
        ));
     } }
    m.mount(root2, shrinePhotos);
    let gallery_b = new SimpleLightbox('.shrinecard .msg-photos a', {disableScroll: false});
    gallery_b.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
    gallery_b.on('shown.simplelightbox', addAuthor);
    gallery_b.on('change.simplelightbox',addAuthor);
}
function addAuthor(e) {
    let lightbox = document.querySelector(".simple-lightbox");
    let attribution = document.querySelector(".simple-lightbox .attribution");
    if(lightbox && !attribution){
        attribution = document.createElement("div");
        attribution.classList.add("attribution");
        lightbox.appendChild(attribution);
    }
    if(e.type === 'change.simplelightbox') {
        document.querySelector(".sl-image").addEventListener("transitionend", (event) => {
            attribution.textContent = "From: "+document.querySelector(`a[href="${document.querySelector(".sl-image>img").getAttribute("src")}"]`).getAttribute("data-attr");
        },{once:true});
    } else {
        attribution.textContent = "From: "+document.querySelector(`a[href="${document.querySelector(".sl-image>img").getAttribute("src")}"]`).getAttribute("data-attr");
    }
}

var link = '8_ZhJu3PzEo';
var ytplayer;//, ytplayer2;
function onYouTubeIframeAPIReady() {
    if (document.getElementById("ytplayer") && link !== 'RoC3xl_HPo0') {
        ytplayer = new YT.Player('ytplayer', {
            videoId: link,
            playerVars: {
                'playsinline': 1
            },
            events: {
                'onStateChange': onPlayerStateChange
            }
            });
    } else {
        window.setTimeout(onYouTubeIframeAPIReady, 200);
    }
}
// event that will be fired when the state of the video player changes
function onPlayerStateChange(event) {
    if(event.data == -1 || event.data == 1) {
      // unstarted or playing
    } else if (event.data == 0 || event.data == 2) {
      // stopped or paused
    }
}