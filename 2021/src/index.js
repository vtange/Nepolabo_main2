document.getElementById("nojs-cover").style.display = "none";

var debutL = 1628694000000;
var debutN = 1628780400000;
var debutB = 1628866800000;
var debutP = 1629039600000;
var time = new Date();
if (time > debutL) {
    document.getElementById("lamy").setAttribute("href","/2021/lamy");
}
if (time > debutN) {
    document.getElementById("nene").setAttribute("href","/2021/nene");
}
if (time > debutB) {
    document.getElementById("botan").setAttribute("href","/2021/botan");
}
if (time > debutP) {
    document.getElementById("polka").setAttribute("href","/2021/polka");
}

setTimeout(function(){
    init();
}, 0);

function init() {
    AOS.init({
        delay: 50,
        duration: 1000,
        mirror: true,
        once: false,
    });

    let gallery_a = new SimpleLightbox('#artbook-gallery a');
    gallery_a.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
}

var artbookLoaded = false;

function reclick(el) {
    if (artbookLoaded) return;
    window.setTimeout(function(){artbookLoaded=true;el.click();},0)
}

function debounce(func, w8, imm) {
	var timmy;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timmy = null;
			if (!imm) func.apply(context, args);
		};
		var callNow = imm && !timmy;
		clearTimeout(timmy);
		timmy = setTimeout(later, w8);
		if (callNow) func.apply(context, args);
	};
};
var mainPhoto = document.getElementById("photo");
var largest = false;
function getPhotoWidth(){
    var width = window.innerWidth, x;
    if (largest) return;
    if (width > 1800) {
        x= "dist/1920w.jpg";
        largest = true;
    } else if (width > 1100) {
        x= "dist/1200w.jpg";
    } else if (width > 800) {
        x= "dist/960w.jpg";
    } else if (width > 500) {
        x= "dist/600w.jpg";
    } else {
        x= "dist/400w.jpg";
    }
    mainPhoto.setAttribute("href", x);
}
getPhotoWidth();
var resizer = debounce(getPhotoWidth, 200);
window.addEventListener('resize',resizer);

var enbutton = document.getElementById('credits-en');
var jpbutton = document.getElementById('credits-jp');
var credits = document.getElementById('credits');
document.getElementById('credits-en').onclick = function() {
    credits.setAttribute("data-lang","en");
}
document.getElementById('credits-jp').onclick = function() {
    credits.setAttribute("data-lang","jp");
}
