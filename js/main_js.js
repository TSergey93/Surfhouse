var header_content = document.querySelector(".header_content");
var mobile_menu = document.querySelector(".mobile_menu");
var close_menu = document.querySelector(".close_menu");
var strip_one = document.querySelector(".mobile_menu .one");
var strip_two = document.querySelector(".mobile_menu .two");
var strip_free = document.querySelector(".mobile_menu .free");
var header = document.querySelector("header");

/*Функции открытия\закрытия мобильного меню*/

mobile_menu.addEventListener("click", function(event) {
    header.classList.toggle("modal_overlay");
    header_content.classList.toggle("header_content_open");
    mobile_menu.classList.toggle("mobile_menu_open");
    strip_one.classList.toggle("strip_one_open");
    strip_one.classList.toggle("strip_open");
    strip_two.classList.toggle("strip_two_open");
    strip_two.classList.toggle("strip_open");
    strip_free.classList.toggle("strip_free_open");
    strip_free.classList.toggle("strip_open");
});

close_menu.addEventListener("click", function(event) {
    header.classList.toggle("modal_overlay");
    header_content.classList.toggle("header_content_open");
    mobile_menu.classList.toggle("mobile_menu_open");
    strip_one.classList.toggle("strip_one_open");
    strip_one.classList.toggle("strip_open");
    strip_two.classList.toggle("strip_two_open");
    strip_two.classList.toggle("strip_open");
    strip_free.classList.toggle("strip_free_open");
    strip_free.classList.toggle("strip_open");
});
