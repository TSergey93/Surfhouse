'use strict';

var filteredProducts = [];
var filter = document.querySelectorAll(".page-products__sort-select");
var sort_poiner = document.querySelectorAll(".page-products__sort-pointer");
var view_icon_tile = document.querySelectorAll(".page-products__view-icon--tile");
var view_icon_listing = document.querySelectorAll(".page-products__view-icon--listing");
var products_container = document.querySelector(".products");
var currentPage = 0;
var show = document.querySelectorAll(".page-products__show-select");
var page_size;

/* Фильтрация списка товаров */

if (localStorage.getItem("filter") === "position") {
    [].forEach.call(filter, function(el) {
        el.value = "position";
    });
} else if (localStorage.getItem("filter") === "price") {
    [].forEach.call(filter, function(el) {
        el.value = "price";
    });
} else if (localStorage.getItem("filter") === "name") {
    [].forEach.call(filter, function(el) {
        el.value = "name";
    });
} else {
    localStorage.setItem("filter", "position");
}

[].forEach.call(filter, function(el) {
    el.onchange = function() {
        [].forEach.call(filter, function(elem) {
            elem.value = el.value;
        });
        localStorage.setItem("filter", el.value);
        setActiveFilter(el.value);
    };
});

function setActiveFilter(value) {
    filteredProducts = productsInitial.slice(0);
    switch (value) {
        case "name":
            filteredProducts = filteredProducts.sort(function(a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (a.name < b.name) {
                    return -1;
                }
                return 0;
            });
            break;
        case "price":
            filteredProducts = filteredProducts.sort(function(a, b) {
                return a.price_num - b.price_num;
            });
            break;
        case "position":
            break;
    }
    if (localStorage.getItem("sortPoiner") == "reverse") {
        rendersProducts(filteredProducts.reverse(), 0);
    } else {
        rendersProducts(filteredProducts, 0);
    }
}

[].forEach.call(sort_poiner, function(el) {
    el.onclick = function() {
        if (localStorage.getItem("sortPoiner") === "reverse") {
            el.classList.remove("page-products__sort-pointer--reverse");
            localStorage.setItem("sortPoiner", "normal");
        } else {
            el.classList.add("page-products__sort-pointer--reverse");
            localStorage.setItem("sortPoiner", "reverse");
        }
        rendersProducts(filteredProducts.reverse(), 0);
    }
    if (localStorage.getItem("sortPoiner") === "reverse") {
        el.classList.add("page-products__sort-pointer--reverse");
    }
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

productsListingClasses();

[].forEach.call(view_icon_tile, function(el) {
    el.onclick = function() {
        if (!el.classList.contains("page-products__view-icon--active")) {
            [].forEach.call(view_icon_tile, function(elem) {
                elem.classList.add("page-products__view-icon--active");
            });
            [].forEach.call(view_icon_listing, function(elem) {
                elem.classList.remove("page-products__view-icon--active");
            });
            localStorage.setItem("viewCatalog", "tile");
        }
        productsListingClasses();
    }
});

[].forEach.call(view_icon_listing, function(el) {
    el.onclick = function() {
        if (!el.classList.contains("page-products__view-icon--active")) {
            [].forEach.call(view_icon_listing, function(elem) {
                elem.classList.add("page-products__view-icon--active");
            });
            [].forEach.call(view_icon_tile, function(elem) {
                elem.classList.remove("page-products__view-icon--active");
            });
            localStorage.setItem("viewCatalog", "listing");
            productsListingClasses();
        }
    }
});

function productsListingClasses() {
    if (localStorage.getItem("viewCatalog") === "listing") {
        products_container.classList.remove("products--tile");
        products_container.classList.add("products--listing");
    } else {
        products_container.classList.remove("products--listing");
        products_container.classList.add("products--tile");
    }
}

/* Отображение количества товаров */

if (localStorage.getItem("show") === "9") {
    [].forEach.call(show, function(el) {
        el.value = "9";
    });
} else if (localStorage.getItem("show") === "18") {
    [].forEach.call(show, function(el) {
        el.value = "18";
    });
} else if (localStorage.getItem("show") === "27") {
    [].forEach.call(show, function(el) {
        el.value = "27";
    });
} else {
    localStorage.setItem("show", "9");
}

page_size = show[0].value;

[].forEach.call(show, function(el) {
    el.onchange = function() {
        [].forEach.call(show, function(elem) {
            elem.value = el.value;
        });
        page_size = show[0].value;
        localStorage.setItem("show", el.value);
        rendersProducts(filteredProducts, 0);
    };
});
