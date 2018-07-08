'use strict';

var picturesContainer = document.querySelector(".page-description__pictures");
var gallery = document.querySelector(".gallery-overlay");
var preview = document.querySelector(".gallery-overlay__preview");
var thumbnails = document.querySelector(".gallery-overlay__thumbnails");
var closeButton = document.querySelector(".gallery-overlay__close");
var pictures = document.querySelectorAll(".page-description__pictures img");
var nextThumbnailsPhoto = document.querySelector(".gallery-overlay__arrows--right");
var lastThumbnailsPhoto = document.querySelector(".gallery-overlay__arrows--left");
var ind = 0;

/* Функция стирания активного класса с картинок */

function resetActive() {
    [].forEach.call(thumbnailsPhoto, function(el) {
        el.classList.remove("gallery-overlay__thumbnails-photo--active");
    });
};

/* Функция задания активного класса картинке */

function declaredIndex() {
    for (var i = 0; i < thumbnailsPhoto.length; i++) {
        if (thumbnailsPhoto[i].classList.contains("gallery-overlay__thumbnails-photo--active")) {
            ind = i;
        }
    }
}

/* Определение элемента, по которому был совершён клик */

picturesContainer.addEventListener("click", function(evt) {
    evt.preventDefault();
    var clickedElement = evt.target;
    if (clickedElement.classList.contains("page-description__add-img") || (clickedElement.classList.contains("page-description__img"))) {
        gallery.classList.remove("gallery-overlay--hidden");
    } else if (clickedElement.classList.contains("page-description__img-arrow")) {
        if (clickedElement.classList.contains("page-description__img-arrow--left")) {
            pictures[1].style.display = "inline";
            pictures[2].style.marginLeft = "30px";
            pictures[3].style.display = "none";
        } else {
            pictures[1].style.display = "none";
            pictures[2].style.marginLeft = "0";
            pictures[3].style.display = "inline";
        }
    };
});

/* Создание картинок в галерее */

var fragmentByPic = document.createDocumentFragment();
for (var i = 0; i < pictures.length; i++) {
    var img = document.createElement("img");
    img.classList.add("gallery-overlay__thumbnails-photo");
    img.setAttribute("src", pictures[i].getAttribute("src"));
    fragmentByPic.appendChild(img);
}
thumbnails.appendChild(fragmentByPic);
var thumbnailsPhoto = document.querySelectorAll(".gallery-overlay__thumbnails img");

/* Показывает выбранную картинку и помечает её */

[].forEach.call(pictures, function(el) {
    el.onclick = function() {
        resetActive();
        preview.style.backgroundImage = "url(" + el.getAttribute("src") + ")";
        [].forEach.call(thumbnailsPhoto, function(elem) {
            if (el.getAttribute("src") === elem.getAttribute("src")) {
                elem.classList.add("gallery-overlay__thumbnails-photo--active");
            };
        });
        declaredIndex();
    };
});

/* Переключение картинок в галерее при их нажатии */

[].forEach.call(thumbnailsPhoto, function(el) {
    el.onclick = function() {
        resetActive();
        el.classList.add("gallery-overlay__thumbnails-photo--active");
        preview.style.backgroundImage = "url(" + el.getAttribute("src") + ")";
        declaredIndex();
    };
});

/* Переключение картинок в галерее при нажатии на стрелки */

nextThumbnailsPhoto.onclick = function() {
    ind = ind + 1;
    if (ind >= thumbnailsPhoto.length) {
      ind = 0;
    }
    resetActive();
    preview.style.backgroundImage = "url(" + thumbnailsPhoto[ind].getAttribute("src") + ")";
    thumbnailsPhoto[ind].classList.add("gallery-overlay__thumbnails-photo--active");
};

lastThumbnailsPhoto.onclick = function() {
    ind = ind - 1;
    if (ind < 0) {
      ind = thumbnailsPhoto.length - 1;
    }
    resetActive();
    preview.style.backgroundImage = "url(" + thumbnailsPhoto[ind].getAttribute("src") + ")";
    thumbnailsPhoto[ind].classList.add("gallery-overlay__thumbnails-photo--active");
};

/* Закрытие галереи */

closeButton.onclick = function() {
    gallery.classList.add("gallery-overlay--hidden");
    resetActive();
}
