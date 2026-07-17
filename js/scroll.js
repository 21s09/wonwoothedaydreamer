console.log("Scroll JS loaded!");

const scrollTopBtn = document.getElementById("scrollTop");
const scrollBottomBtn = document.getElementById("scrollBottom");

console.log(scrollTopBtn);
console.log(scrollBottomBtn);

scrollTopBtn.addEventListener("click", () => {
    console.log("Top clicked");
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

scrollBottomBtn.addEventListener("click", () => {
    console.log("Bottom clicked");
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth"
    });
});
