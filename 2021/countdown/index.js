var debutN = 1628780400000+18000000+7200000;
var debutP = 1629039600000+10800000;
var debutL = 1628694000000;
var debutB = 1628866800000;
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
function get(a){
    return document.getElementById(a);
}
function runTimer(){
    var time = new Date().getTime();
    nplb.forEach(function(el,i){
        var timeleft = (debuts[i] - time)/1000;
        if (el.getAttribute("done") === "true") return;
        el.innerHTML = secondsToHms(timeleft);
        if(timeleft < 0) {
            el.setAttribute("done","true");
            switch (el.id) {
                case "ne":
                    el.parentElement.style.background = "rgba(254, 161, 0, 0.5)";
                    el.parentElement.style.cursor = "pointer";
                    el.parentElement.addEventListener("click",function(){
                        window.location.href = '../nene';
                    });
                    break;
                case "po":
                    el.parentElement.style.background = "rgba(254, 57, 0, 0.4)";
                    el.parentElement.style.cursor = "pointer";
                    el.parentElement.addEventListener("click",function(){
                        window.location.href = '../polka';
                    });
                    break;
                case "ra":
                    el.parentElement.style.background = "rgba(106,255,255,0.3)";
                    el.parentElement.style.cursor = "pointer";
                    el.parentElement.addEventListener("click",function(){
                        window.location.href = '../lamy';
                    });
                    break;
                case "bo":
                    el.parentElement.style.background = "rgba(106,255,155,0.3)";
                    el.parentElement.style.cursor = "pointer";
                    el.parentElement.addEventListener("click",function(){
                        window.location.href = '../botan';
                    });
                    break;
            }
        }
    });
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