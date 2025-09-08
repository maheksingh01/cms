const icon1 = document.querySelector(".icon1");
const icon2 = document.querySelector(".icon2");
const popup = document.querySelector(".popup");


icon1.addEventListener("click", () => {
    icon1.classList.toggle("toggle");
    icon2.classList.toggle("toggle");
    popup.classList.toggle("toggle");
});

icon2.addEventListener("click", () => {
    icon1.classList.toggle("toggle");
    icon2.classList.toggle("toggle");
    popup.classList.toggle("toggle");
})