document.getElementById("nojs-cover").style.display = "none";
function toggle_answ(question){ question.show_answer = question.show_answer ? false : true }
var QuestionList = {
    view: function (vnode) {
        return m("ol", Object.values(vnode.attrs.data).map(track =>
            m("li.question",
                [m("div.question-text",[
                    m("p.en",[track[0].EN]),
                    m("p.jp",[track[0].JP])
                ]),
                m("button", {onclick: toggle_answ.bind(null,track[0])}, "Show answer｜答え"),
                m("ul.choices",track[0].choices.map(choice=>
                    m("li.choice"+(choice.l6 === "O" && track[0].show_answer ?".correct":""),
                        [m("p.en",[choice.EN]),
                        m("p.jp",[choice.JP])]
                ))),
                track[0].src ?
                    Array.isArray(track[0].src) ?
                        m("ul",["Sources: ",track[0].src.map((src)=>m("a.source[href="+src+"]",m("p",src)))]) :
                        m("a.source[href="+track[0].src+"]","Source: "+track[0].src) :

                ""
                ])
        ));
    }
}
if (questionsNene) {
    m.mount(document.body.querySelector('.ne'), {
        view: ()=>
            m(QuestionList, {data:questionsNene})

    })
}
if (questionsPolka) {
    m.mount(document.body.querySelector('.po'), {
        view: ()=>
            m(QuestionList, {data:questionsPolka})

    })
}
if (questionsLamy) {
    m.mount(document.body.querySelector('.la'), {
        view: ()=>
            m(QuestionList, {data:questionsLamy})

    })
}
if (questionsBotan) {
    m.mount(document.body.querySelector('.bo'), {
        view: ()=>
            m(QuestionList, {data:questionsBotan})

    })
}