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
            m(".postcard",{style: {"background-position": Math.random()*100+"% "+Math.random()*100+"%" }},
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

//youll need an array of images.
// loop through and then mount to root2
var root2 = document.getElementById('cards2');

var data2 = [
 {"food_name":"Pork Udon",
 "food_name_jp":"豚肉うどん",
  "name":"X-Kill/Mau",
  "twit":"MauCaVel",
  "url":"food/min/porkudon_.jpg",
 },
 {"food_name":"Strawberry Ice Cream & Cherry Pie",
 "food_name_jp":"イチゴアイス&チェリーパイ",
  "name":"X-Kill/Mau",
  "twit":"MauCaVel",
  "url":"food/min/icecreamcherrypie_.jpg",
 },
 {"food_name":"Cheese Bread",
 "food_name_jp":"チーズブレッド",
  "name":"X-Kill/Mau",
  "twit":"MauCaVel",
  "url":"food/min/cheesebread_.jpg",
 },

 {"food_name": "Egyptian Nile White Fish",
 "food_name_jp": "エジプト風フライティラピア",
  "name":"X-Kill/Mau",
  "twit":"MauCaVel",
  "url":"food/min/whitenilefriedtilapia_.jpg",
 },

 {"food_name":"Fish & cheese croissant sandwich with chipotle ranch",
 "food_name_jp":"フィッシュ＆チーズクロワッサンサンド＋チポトレランチ",
  "name":"X-Kill/Mau",
  "twit":"MauCaVel",
  "url":"food/min/fishcheesecrossaintsandwich_.jpg",
 },

 {"food_name":"Banana and Raisin bread",
 "food_name_jp":"バナナレーズンブレッド",
  "name":"X-Kill/Mau",
  "twit":"MauCaVel",
  "url":"food/min/bananaraisinbread_.jpg",
 },

 {"food_name":"Tres Leches Cake",
 "food_name_jp":"みるくケーキ",
  "name":"X-Kill/Mau",
  "twit":"MauCaVel",
  "url":"food/min/lastcake_.jpg",
 },
 {"food_name":"Sea Life Cookies",
 "food_name_jp":"魚類クッキー",
  "name":"Freak Video Gamer",
  "twit":"Alan0Bits",
  "url":"food/min/sealifecookies_.jpg",
 },
 {"food_name":"Lemon Cookie Cake",
 "food_name_jp":"レモンクッキーケーキ",
  "name":"Freak Video Gamer",
  "twit":"Alan0Bits",
  "url":"food/min/lemoncakecookie_.jpg",
 },
 {"food_name":"Blue Candy Glacier Martini",
 "food_name_jp":"ブルキャンディマティーニ",
  "name":"JorgeRR",
  "twit":"JorgeRR3168",
  "url":"food/min/bluecandyglaciermartini_.jpg",
 },
 {"food_name":"Daifuku Blue Hot Chocolate",
 "food_name_jp":"だいふくホットチョコ",
  "name":"JorgeRR",
  "twit":"JorgeRR3168",
  "url":"food/min/daifukuhotchoco_.jpg",
 },
 {"food_name":"Fishbowl Soda",
 "food_name_jp":"水槽ソーダ",
  "name":"JorgeRR",
  "twit":"JorgeRR3168",
  "url":"food/min/fishbowlsoda_.jpg",
 },
 {"food_name":"Purple Berry Snowball Float",
 "food_name_jp":"パープルベリー雪玉フロート",
  "name":"JorgeRR",
  "twit":"JorgeRR3168",
  "url":"food/min/purpleberrysnowballfloat_.jpg",
 },
 {"food_name":"Sea Tea Lemonade",
 "food_name_jp":"海茶レモネード",
  "name":"JorgeRR",
  "twit":"JorgeRR3168",
  "url":"food/min/seatealemonade_.jpg",
 }
]
if (data2) {
    var cookingPhotos = { view: function(){
        return m("section.postcards", data2.map(o =>
            m(".foodcard",{style: {"background-position": Math.random()*100+"% "+Math.random()*100+"%" }},
                [m(".picturecard-header",
                        m(".user-info",
                            [m("span.user-name[data-swaplang=EN]", o.food_name),
                            m("span.user-name[data-swaplang=JP]", o.food_name_jp),
                            (o.twit?m("span.user-twitter", "by @"+o.twit):"")])),
                 (o.url ? m(".msg-art", m('a[href="' + o.url.replace(/\_\./g, ".").replace(/food(.*)\/min/g, "food$1") + '"]', m('img[src="' + o.url + '"][alt=""][title=""]'))) : "")
                ])
        ));
     } }
    m.mount(root2, cookingPhotos);
    let gallery_b = new SimpleLightbox('.foodcard .msg-art a', {disableScroll: false});
    gallery_b.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
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