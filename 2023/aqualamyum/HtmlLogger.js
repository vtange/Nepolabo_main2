//always available. This is used in prod to catch errors. If dev mode, the more powerful dev logger
//is used as the error catcher in block for NoScript check
function HtmlLogger() {
    this.open = true;

    var div = this.div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = 0;
    div.style.left = 0;
    div.style.minHeight = "100vh";
    div.style.overflow = "visible";
    div.style.width = "calc(100vw - 40px)";
    div.style.maxWidth = "360px";
    div.style.color = "white";
    div.style.zIndex = 999;
    div.style.fontFamily = "monospace, Arial, sans-serif";
    div.style.backgroundColor = "rgba(30,30,50,0.95)";

    //button for toggling visibility of background app.
    var toggle_btn = document.createElement("button");
    toggle_btn.id = "consolToggle";
    toggle_btn.textContent = "Toggle ----->";
    toggle_btn.setAttribute("style","height: 80px; width: calc(100% + 40px); font-size: 30px; text-align: right;");
    toggle_btn.addEventListener("click", this.toggle.bind(this));
    div.appendChild(toggle_btn);

    var list = document.createElement("ul");
    list.style.overflowY = "scroll";
    list.style.position = "absolute";
    list.style.height = "100%";
    list.style.width = "calc(100% - 30px)";
    list.style.paddingInlineStart = "30px";
    div.appendChild(list);
    this.list = list;

    //controls hide/unhide of arrays and objects logged in HTML
    this.list.addEventListener("click",function(e){
        if(e.target && e.target.tagName === "BUTTON" && !e.target.id && e.target.nextElementSibling)
        {
            //show object
            e.target.nextElementSibling.style.display = e.target.nextElementSibling.style.display === "" ? "none" : "";
        }
    });

    var style = document.createElement('style');
    style.innerHTML = `.htmlLoggerLiEntry { border-top:1px solid #777; padding-top: 3px; user-select: all;}
    .htmlLoggerLiEntry.htmlLoggerWarningEntry { background-color:rgb(159, 90, 0); }
    .htmlLoggerLiEntry.htmlLoggerErrorEntry{ background-color:rgb(119, 0, 0); }
    .htmlLoggerSpanEntry{margin-left:3px;overflow-wrap: anywhere;}
    .htmlLoggerLiEntry:last-child{ padding-bottom:50vh; }
    .htmlLoggerLiEntry ul, .htmlLoggerLiEntry ol { padding-inline-start: 20px;}
    .htmlLoggerExpandrBtn{cursor:pointer;}`;
    document.getElementsByTagName('head')[0].appendChild(style);

    // Delay by 100 due to Browsersync working with document.body at init (body doesn't exist for a bit)
    window.setTimeout(function(){
        document.body.appendChild(div);
    },100);

    this.overrideConsoleLog();
}

HtmlLogger.prototype.toggle = function(){
    if(!this.div.offsetWidth) {
        window.setTimeout(this.toggle.bind(this),100);
    } else {
        this.div.style.transform = this.div.style.transform ? "" : "translateX(-"+this.div.offsetWidth+"px)";
        this.open = !!this.div.style.transform.length;
    }
}

HtmlLogger.prototype.overrideConsoleLog = function(){
    //add HTML console.log and console.warn, console.error
    var conslog = console.log, consinfo = console.info, conswarn = console.warn, conserr = console.error;
    var _this = this;
    var htmlConsoleWrapper = function(originalConsoleFn, iSeverity){
        return function(){
           _this.populateLiEntry(_this.addNewBlankLi(iSeverity),arguments);
            originalConsoleFn.apply(this, arguments);
        };
    }

    console.info = htmlConsoleWrapper(consinfo);
    console.log = htmlConsoleWrapper(conslog);
    console.warn = htmlConsoleWrapper(conswarn, 1);
    console.error = htmlConsoleWrapper(conserr, 2);
    //these error catchers cannot be triggered manually in chrome console.
    //these can only be triggered by written-in-code errors such as:
    //throw "blah";
    //throw new Error("blah");
    //^ include stack trace
    //onerror is legacy for older browsers
    //addeventlistener is modern best practice.
    // SyntaxErrors cannot be caught. the most you can do is Script error.
    window.onerror = function(event, source, lineno, colno, e) {
        console.error("window.onerror:",event,source," Line:",lineno," Col:",colno);
    }
    window.addEventListener("error", function(e){
        console.error("window error event:",e.message," Line:",e.lineno," Col:",e.colno);
    });
};

HtmlLogger.prototype.addNewBlankLi = function(iSeverity){
    var new_li = document.createElement("li");
    new_li.className = 'htmlLoggerLiEntry';
    if(iSeverity === 1) {
        new_li.classList.add("htmlLoggerWarningEntry");
    }
    else if(iSeverity === 2) {
        new_li.classList.add("htmlLoggerErrorEntry");
    }
    this.list.appendChild(new_li);
    return new_li;
};

HtmlLogger.prototype.populateLiEntry = function(new_li, arrArgs) {
    var new_span;
    for(var j = 0; j < arrArgs.length; j++)
    {
        new_span = document.createElement("span");
        new_span.className = 'htmlLoggerSpanEntry';
        if(j === 0 && typeof arrArgs[j] === 'string' && arrArgs[j].indexOf("%c") >= 0) {
            // only the first color should work and for the first string text. using "%c" again won't work; checked in actual Chrome.
            // %cAAA, color:lime, %cBBB, color:black -> only AAA gets colored. the others are printed normally.
            new_span.textContent += arrArgs[j].slice(2);
            new_span.setAttribute("style",arrArgs[j+1]);
            j++; // skip one index since it was the ^ style attributes
        } else {
            var objs_seen_before = new Set();
            var logged_value = this.getLoggedValue(arrArgs[j], objs_seen_before);
            this.appendLoggedValue(logged_value, new_span);
        }
        new_li.appendChild(new_span);
    }
    this.list.appendChild(new_li);
    return new_li;
}

HtmlLogger.prototype.getObjName = function(value){
    return value.constructor ? value.constructor.name : "Object";
}

HtmlLogger.prototype.getLoggedValue = function(value, objs_seen_before) {
    if(typeof value === 'object'){
        if(value === null) {
            return "null";
        } else {
            let expandr_btn = document.createElement("button");
            expandr_btn.className = 'htmlLoggerExpandrBtn';
            if(objs_seen_before.has(value)) {
                return "Circular ("+(Array.isArray(value)?"Array ["+ value.length +"]":this.getObjName(value))+")";
            } else {
                objs_seen_before.add(value);
            }
            if(Array.isArray(value)) {
                expandr_btn.textContent = "Array ["+ value.length +"]";
                let expanded_list = document.createElement("ol");
                expanded_list.style.display = "none";
                for(var i = 0; i < value.length; i++)
                {
                    let arr_new_li = document.createElement("li");
                    var logged_value = this.getLoggedValue(value[i], objs_seen_before);
                    this.appendLoggedValue(logged_value,arr_new_li);
                    expanded_list.appendChild(arr_new_li);
                }
                return [expandr_btn,expanded_list];
            } else {
                expandr_btn.textContent = this.getObjName(value);
                let expanded_list = document.createElement("ul");
                expanded_list.style.display = "none";
                for(var prop in value)
                {
                    if (Object.prototype.hasOwnProperty.call(value, prop)) {
                        let arr_new_li = document.createElement("li");
                        var logged_value = this.getLoggedValue(value[prop], objs_seen_before);
                        arr_new_li.textContent += prop +": ";
                        this.appendLoggedValue(logged_value,arr_new_li);
                        expanded_list.appendChild(arr_new_li);
                    }
                }
                //Error objects have a .stack that don't count as a prop
                if (value.stack) {
                    expanded_list.textContent += value.stack;
                }
                return [expandr_btn,expanded_list];
            }
        }
    } else if(typeof value === 'number' || typeof value === 'string') {
        return value;
    } else if(typeof value === 'undefined') {
        return typeof value;
    } else if(typeof value === 'boolean'||typeof value === 'function'||typeof value === 'symbol') {
        return value.toString();
    } else if(typeof value === 'bigint') {
        // just print normally, +n. you cannot make a BigInt(<number>n) since that throws script error.
        return value.toString()+"n";
    }
}

HtmlLogger.prototype.appendLoggedValue = function(logged_value, container){
    if(Array.isArray(logged_value)){
        logged_value.forEach(function(element){
            container.appendChild(element);
        });
    } else {
        container.textContent += logged_value;
    }
}

var lggr = new HtmlLogger();