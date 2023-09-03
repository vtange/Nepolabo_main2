//always available. This is used in prod to catch errors. If dev mode, the more powerful dev logger
//is used as the error catcher in block for NoScript check
function HtmlLogger() {
    this.LI_PAD = "3px";
    this.LI_BORD = "1px solid #777";

    var div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = 0;
    div.style.left = 0;
    div.style.height = "100vh";
    div.style.width = "calc(100vw - 40px)";
    div.style.maxWidth = "360px";
    div.style.minWidth = "250px";
    div.style.color = "white";
    div.style.zIndex = 999;
    div.style.fontFamily = "monospace, Arial, sans-serif";
    div.style.backgroundColor = "rgba(30,30,50,0.95)";
    var ol = document.createElement("ol");
    ol.style.overflowY = "scroll";
    ol.style.height = "100%";
    div.appendChild(ol);
    this.ol = ol;

    //button for toggling visibility of game (app)
    var toggle_btn = document.createElement("button");
    toggle_btn.id = "consolToggle";
    toggle_btn.textContent = ">";
    toggle_btn.setAttribute("style","height: 100px; width: 40px; padding: 10px 5px; position:absolute; top: 20%; right:0; transform:translateX(100%);");
    toggle_btn.addEventListener("click", function(){
        div.style.transform = div.style.transform ? "" : "translateX(-"+div.offsetWidth+"px)";
    });
    div.appendChild(toggle_btn);
    // Delay by 100 due to Browsersync working with document.body at init (body doesn't exist for a bit)
    window.setTimeout(function(){
        document.body.appendChild(div);
    },100);

    //these error catchers cannot be triggered manually in chrome console.
    //these can only be triggered by written-in-code errors such as:
    //throw "blah";
    //throw new Error("blah");
    //^ include stack trace
    //onerror is legacy for older browsers
    //addeventlistener is modern best practice.
    var lggr = this;
    window.onerror = function(event, source, lineno, colno, e) {
        lggr.errorEntry.call(null,e);
    }
    window.addEventListener("error", function(e){
        lggr.errorEntry.call(null,e);
    });
    this.overrideConsoleLog();
}

HtmlLogger.prototype.errorEntry = function(errOrStr){
    //window.onerror : e.message
    //addeventlistener "error" : e.error.message || e.message
    var new_li = document.createElement("li");//convert to ordered list (ol , li ) for auto numbering
    var msg = typeof errOrStr === 'string' ? errOrStr : (errOrStr.stack ? errOrStr.stack : errOrStr.message ? errOrStr.message : JSON.stringify(errOrStr));
    new_li.textContent = msg;
    new_li.style.paddingTop = this.LI_PAD;
    new_li.style.borderTop = this.LI_BORD;
    this.ol.appendChild(new_li);
    return new_li;
};

//BEYOND HERE is code prod doesn't really need as its used for testing.
HtmlLogger.prototype.newLiEntry = function() {
    var new_li = document.createElement("li"), color = -1;
    //oar = Object or Array
    var oar_btn = null; oar_list = null, oar_prop_li = null;//convert to ordered list (ol , li ) for auto numbering
    new_li.textContent = "";
    for(var j = 0; j < arguments.length; j++)
    {
        if(typeof arguments[j] === 'string') {
            color = arguments[j].indexOf("%c");
            if(color >= 0) {
                new_li.textContent += arguments[j].slice(color+2);
                new_li.setAttribute("style",arguments[j+1]);
                //skip argument that just sets font color
                j++;
                color = -1;
            } else {
                new_li.textContent += arguments[j];
            }
        } else if (typeof arguments[j] === "number" || arguments[j] === null || arguments[j] === undefined) { //number || null || undefined
            new_li.textContent += arguments[j];
        } else if (typeof arguments[j] === "function") {
            new_li.textContent += arguments[j].toString();
        } else {
            //error objects / events
            //window.onerror : e.message
            //addeventlistener "error" : e.error.message || e.message
            if(arguments[j].stack) {
                new_li.textContent += arguments[j].stack;
            } else if(arguments[j].message) {
                new_li.textContent += arguments[j].message;
            } else {
                oar_btn = document.createElement("button");
                //regular object/array. loop through properties/indexes
                oar_list = document.createElement("ul");
                oar_list.style.display = "none";
                oar_btn.style.cursor = "pointer";
                if(Array.isArray(arguments[j])) {
                    oar_btn.textContent = "Array ["+ arguments[j].length +"]";
                    for(var i = 0; i < arguments[j].length; i++)
                    {
                        oar_prop_li = document.createElement("li");
                        oar_prop_li.textContent = i.toString();
                        oar_prop_li.textContent += ": " +  assertPrimitive(arguments[j][i]);
                        oar_list.appendChild(oar_prop_li);
                    }
                } else if (typeof arguments[j] == "object" && arguments[j] != null) {
                    oar_btn.textContent =  arguments[j].constructor.name;
                    for(var prop in arguments[j])
                    {
                        if(prop === "constructor") continue;
                        oar_prop_li = document.createElement("li");
                        oar_prop_li.textContent = prop;
                        oar_prop_li.textContent += ": " +  assertPrimitive(arguments[j][prop]);
                        oar_list.appendChild(oar_prop_li);
                    }
                }
                new_li.appendChild(oar_btn);
                new_li.appendChild(oar_list);
            }
        }
    }
    new_li.style.paddingTop = this.LI_PAD;
    new_li.style.borderTop = this.LI_BORD;
    this.ol.appendChild(new_li);
    return new_li;
}

HtmlLogger.prototype.overrideConsoleLog = function(){
    //add HTML console.log and console.warn, console.error
    var conslog = console.log, conswarn = console.warn, conserr = console.error;
    var _this = this;
    var htmlConsoleWrapper = function(originalConsoleFn, iSeverity){
        return function(){
            var new_li = _this.newLiEntry.apply(_this, arguments);
            originalConsoleFn.apply(this, arguments);
            if(iSeverity === 1) {
                //warn
                new_li.style.background = "rgb(159, 90, 0)";
            }
            else if(iSeverity === 2) {
                //error
                new_li.style.background = "rgb(119, 0, 0)";
            }
        }
    }

    //controls hide/unhide of arrays and objects logged in HTML
    this.ol.addEventListener("click",function(e){
        if(e.target && e.target.tagName === "BUTTON" && !e.target.id && e.target.nextElementSibling)
        {
            //show object
            e.target.nextElementSibling.style.display = e.target.nextElementSibling.style.display === "" ? "none" : "";
        }
    });
    console.log = htmlConsoleWrapper(conslog);
    console.warn =  htmlConsoleWrapper(conswarn, 1);
    console.error =  htmlConsoleWrapper(conserr, 2);
};

function assertPrimitive(x) {
    //for arrays and plain objects, assume safe from circular references
    if (Array.isArray(x)) {
        return JSON.stringify(x);
    }
    else if(typeof x === "object" && x != null) {
        if(x.constructor && x.constructor.name !== "Object") {
            return "["+x.constructor.name+"]";
        } else {
            return JSON.stringify(x);
        }
    }
    else if (typeof x === "function") {
        return "Function";
    }
    else {
        return x === "" ? '""' : x;
    }
}

var lggr = new HtmlLogger();