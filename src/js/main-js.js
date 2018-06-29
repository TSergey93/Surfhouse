'use strict';

var body = document.querySelector("body");
var header = document.querySelector(".main-header");
var mobile_menu = document.querySelector(".mobile-menu");
var wrapper_strips = document.querySelector(".mobile-menu__wrapper-strips");
var close_menu = document.querySelector(".mobile-menu__menu-close");
var mobile_menu_strip = document.querySelectorAll(".mobile-menu__strip");
var strip_one = document.querySelector(".mobile-menu__strip--one");
var strip_two = document.querySelector(".mobile-menu__strip--two");
var strip_free = document.querySelector(".mobile-menu__strip--free");
var user_menu = document.querySelector(".user-menu");
var header_social_icons = document.querySelector(".main-header__social-icons-list");
var logo = document.querySelector(".main-header__logo");
var sidebar_menu = document.querySelector(".sidebar-menu");
var sidebar_category = document.querySelector(".sidebar-category");
var sidebar_brand = document.querySelector(".sidebar-brand");
var sidebar_tags = document.querySelector(".sidebar-tags");
var sidebar_menu_list = document.querySelector(".sidebar-menu__list");
var sidebar_category_list = document.querySelector(".sidebar-category__list");
var sidebar_brand_list = document.querySelector(".sidebar-brand__list");
var sidebar_tags_list = document.querySelector(".sidebar-tags__wrapper");
var view_icon_tile = document.querySelectorAll(".page-products__view-icon--tile");
var view_icon_listing = document.querySelectorAll(".page-products__view-icon--listing");
var localStorage_viewCatalog = localStorage.getItem("viewCatalog");

/* Удаление классов */

header.classList.remove("main-header--no-js");
mobile_menu.classList.remove("mobile-menu--no-js");
user_menu.classList.remove("user-menu--no-js");
header_social_icons.classList.remove("main-header__social-icons-list--no-js");
logo.classList.remove("main-header__logo--no-js");
sidebar_menu.classList.remove("sidebar-menu--no-js");
sidebar_category.classList.remove("sidebar-category--no-js");
sidebar_brand.classList.remove("sidebar-brand--no-js");
sidebar_tags.classList.remove("sidebar-tags--no-js");
sidebar_menu_list.classList.remove("sidebar-menu__list--no-js");
sidebar_category_list.classList.remove("sidebar-category__list--no-js");
sidebar_brand_list.classList.remove("sidebar-brand__list--no-js");
sidebar_tags_list.classList.remove("sidebar-tags__wrapper--no-js");


/* Открытие/закрытие мобильного меню */

mobile_menu.addEventListener("click", function() {
    if (!mobile_menu.classList.contains("mobile-menu--opened")) {
        body.classList.toggle("mobile-menu-opened");
        mobile_menu.classList.toggle("mobile-menu--opened");
        wrapper_strips.classList.toggle("mobile-menu__wrapper-strips--opened");
        strip_one.classList.toggle("mobile-menu__strip--one-opened");
        strip_two.classList.toggle("mobile-menu__strip--two-opened");
        strip_free.classList.toggle("mobile-menu__strip--free-opened");
        close_menu.classList.toggle("mobile-menu__menu-close--opened");
        header.classList.toggle("main-header--opened");
        [].forEach.call(mobile_menu_strip, function(el) {
            el.classList.toggle("mobile-menu__strip--opened");
        });
    }
});

close_menu.addEventListener("click", function() {
    setTimeout(function() {
        body.classList.toggle("mobile-menu-opened");
        mobile_menu.classList.toggle("mobile-menu--opened");
        wrapper_strips.classList.toggle("mobile-menu__wrapper-strips--opened");
        strip_one.classList.toggle("mobile-menu__strip--one-opened");
        strip_two.classList.toggle("mobile-menu__strip--two-opened");
        strip_free.classList.toggle("mobile-menu__strip--free-opened");
        close_menu.classList.toggle("mobile-menu__menu-close--opened");
        header.classList.toggle("main-header--opened");
        [].forEach.call(mobile_menu_strip, function(el) {
            el.classList.toggle("mobile-menu__strip--opened");
        });
    }, 100);
});

/* Отображение списка товаров */

if (localStorage.getItem("viewCatalog") === "tile") {
    [].forEach.call(view_icon_tile, function(el) {
        el.classList.add("page-products__view-icon--active");
    });
} else if (localStorage.getItem("viewCatalog") === "listing") {
    [].forEach.call(view_icon_listing, function(el) {
        el.classList.add("page-products__view-icon--active");
    });
} else {
    [].forEach.call(view_icon_tile, function(el) {
        el.classList.add("page-products__view-icon--active");
    });
    localStorage.setItem("viewCatalog", "tile");
}

[].forEach.call(view_icon_tile, function(el) {
    el.addEventListener("click", function() {
        if (!view_icon_tile[1].classList.contains("page-products__view-icon--active")) {
            [].forEach.call(view_icon_tile, function(elem) {
                elem.classList.add("page-products__view-icon--active");
            });
            [].forEach.call(view_icon_listing, function(elem) {
                elem.classList.remove("page-products__view-icon--active");
            });
            localStorage.setItem("viewCatalog", "tile");
        }
    })
});

[].forEach.call(view_icon_listing, function(el) {
    el.addEventListener("click", function() {
        if (!view_icon_listing[1].classList.contains("page-products__view-icon--active")) {
            [].forEach.call(view_icon_listing, function(elem) {
                elem.classList.add("page-products__view-icon--active");
            });
            [].forEach.call(view_icon_tile, function(elem) {
                elem.classList.remove("page-products__view-icon--active");
            });
            localStorage.setItem("viewCatalog", "listing");
        }
    })
});
