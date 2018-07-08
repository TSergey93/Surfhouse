(function() {
    function Product(data) {
        this._data = data;
    }

    Product.prototype.render = function() {
        var template = document.querySelector(".products__template");
        if ("content" in template) {
            this.element = template.content.children[0].cloneNode(true);
        } else {
            this.element = template.children[0].cloneNode(true);
        }
        this.element.querySelector(".products__name").textContent = this._data.name;
        this.element.querySelector(".products__price").textContent = "€." + this._data.price;
        this.element.querySelector(".products__image").setAttribute("src", this._data.pictures);
        if (this._data.sale) {
            var sale = document.createElement("span");
            sale.classList.add("products__sale");
            sale.textContent = "€." + this._data.sale;
            this.element.querySelector(".products__price").appendChild(sale);
        }
        if (this._data.vobler) {
            var vobler = document.createElement("div");
            vobler.classList.add("products__vobler");
            this.element.appendChild(vobler);
            if (this._data.vobler == "new") {
                vobler.classList.add("products__vobler--new");
            } else if (this._data.vobler == "hot") {
                vobler.classList.add("products__vobler--hot");
            }
        }
    }
    window.Product = Product;
})();
