const scrollTopBtn = document.getElementById("scrollTop");
const scrollBottomBtn = document.getElementById("scrollBottom");

scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

scrollBottomBtn.addEventListener("click", () => {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
    });
});
