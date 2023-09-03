document.addEventListener("DOMContentLoaded", function () {
    window.setTimeout(function(){
        document.querySelector('.op_anim').classList.add('open');
        document.querySelector('body').classList.add('active');
    },800);
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

var scrollToTopBtn = document.querySelector(".scroll-to-top")
var rootElement = document.documentElement;

function handleScroll() {
    // Do something on scroll
    var scrollTotal = rootElement.scrollHeight - rootElement.clientHeight
    if ((rootElement.scrollTop / scrollTotal) > 0.20) {
        // Show button
        scrollToTopBtn.classList.add("showBtn")
    } else {
        // Hide button
        scrollToTopBtn.classList.remove("showBtn")
    }
}

function scrollToTop() {
    // Scroll to top logic
    rootElement.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}
scrollToTopBtn.addEventListener("click", scrollToTop)
document.addEventListener("scroll", handleScroll)