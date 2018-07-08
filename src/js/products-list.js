'use strict';

var container = document.querySelectorAll(".products");
var containerTemplate = document.querySelectorAll(".products__template");
var productsInitial = [];
var header = document.querySelector(".main-header");

getProducts();

function getProducts() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data/products.json");
    xhr.onload = function(evt) {
        var rawData = evt.target.response;
        var loadedProducts = JSON.parse(rawData);
        productsInitial = loadedProducts;
        if (header.classList.contains("main-header--product-catalog")) {
            setActiveFilter(localStorage.getItem("filter"));
        } else {
            rendersProducts(loadedProducts, 0);
        }
    };
    xhr.send();
}

function rendersProducts(productsToRender, pageNumber) {
    [].forEach.call(container, function(el) {
        el.innerHTML = "";
        var fragment = document.createDocumentFragment();
        if (header.classList.contains("main-header--product-catalog")) {
            var from = pageNumber * page_size;
            var to = from + page_size;
            var pageProducts = productsToRender.slice(from, to);
            var render = pageProducts;
        } else {
            var render = productsToRender;
        }
        render.forEach(function(product) {
            var productElement = new Product(product);
            productElement.render();
            fragment.appendChild(productElement.element);
        });
        el.appendChild(fragment);
    });
}
