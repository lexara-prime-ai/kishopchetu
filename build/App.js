"use strict";
// LOGGING
const log = console.log;
const consoleOutput = (...messages) => {
    log(messages);
};
//# sourceMappingURL=App.js.map
class Product {
    constructor(product) {
        this.product = product;
    }
    // MEHOD FOR RENDERING SINGLE PRODUCTS
    render() {
        let renderedHTML = `
        <div class="product-container">
        <div class="img-container">
            <img loading="lazy" src=${this.product.productImg} alt="product-image" class="product-img">
        </div>

        <div class="product-content">
            <h2 id="product-name">
                ${this.product.productName}
            </h2>
            <h3 id="product-price">
                KES ${this.product.productPrice}
                <span>
                    ${parseInt(this.product.productPrice) + 500} 
                </span>
            </h3>

            <p id="product-description">
                ${this.product.productDescription}
            </p>

            <div class="btn-container">
                <button class="update-btn product-btn" onclick="new Product().updateProduct(${this.product.id})">
                    <i class="fas fa-arrow-circle-up icon"></i>
                    Update
                </button>

                <button class="delete-btn product-btn" onclick="new Product().deleteProduct(${this.product.id})">
                    <i class="fas fa-trash icon"></i>
                    Delete
                </button>

                <a style="text-decoration: none;" href="http://localhost:5500/src/views/cart.html">
                    <button class="add-to-cart-btn product-btn">
                        <i class="fas fa-add icon"></i>
                        Add to cart
                    </button>
                </a>
            </div>
        </div>
    </div>
        `;

        return renderedHTML;
    }

    // METHOD FOR DELETING PRODUCTS
    async deleteProduct(id) {
        await fetch(`https://kishopchetu-server.onrender.com/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    // METHOD FOR UPDATING PRODUCTS
    async updateProduct(id) {
        const response = await fetch(`https://kishopchetu-server.onrender.com/${id}`);
        const product = await response.json();
        this.preFillFormFields(product);

        const formBtn = document.querySelector('.submit');
        formBtn.addEventListener('click', () => {

            const updatedProduct = Product.readProductFormInput();
            if (formBtn.innerText === 'Update Product') {
                this.updateProduct({ ...updatedProduct, id });
            }
        });

    }
    // UPDATE PRODUCT
    async Update(product) {
        await fetch(`https://kishopchetu-server.onrender.com/${product.id}`, {
            method: 'PUT',
            body: JSON.stringify(product),
            headers: {
                "Content-Type": "application/json"
            }
        })
    }

    // PREFILL FORM FIELDS WHEN UPDATING PRODUCT
    preFillFormFields(product) {
        document.querySelector("#product-name").value = product.productName;
        document.querySelector("#product-image").value = product.productImg;
        document.querySelector("#product-price").value = product.productPrice;
        document.querySelector("#product-description").value = product.productDescription;
        document.querySelector(".submit").textContent = `Update Product`;
    }


    // METHOD FOR READING FORM INPUT
    static readProductFormInput() {
        const productName = document.querySelector('#product-name').value;
        const productImg = document.querySelector('#product-img').value;
        const productPrice = document.querySelector('#product-price').value;
        const productDescription = document.querySelector('#product-description').value;
        return {
            productName,
            productImg,
            productPrice,
            productDescription
        };
    }

    // METHOD FOR ADDING A PRODUCT
    static async addProduct() {
        const newProduct = Product.readProductFormInput();
        await fetch('https://kishopchetu-server.onrender.com/products', {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }
}

// ADD | UPDATE PRODUCT WHEN ONCLICK EVENT FIRES
const formBtn = document.querySelector('.submit');
formBtn.addEventListener('click', () => {
    log('Adding product...');
    // CHECK IF USER IS UPDATING OR ADDING A PRODUCT
    Product.addProduct();    
});

// DISPLAY ALL PRODUCTS
class DisplayProducts {
    async render() {
        // GET PRODUCT LIST AND RENDER CONTENT
        let products = await this.fetchProduct();
        let html = '';
        for (let product of products) {
            const productContent = new Product(product).render();
            html += productContent;
        }
        return html;
    }

    // FETCH PRODUCTS
    async fetchProduct() {
        const response = await fetch('https://kishopchetu-server.onrender.com/products');
        const products = await response.json();
        return products;
    }
}

class App {
    static async Init() {
        let displayProducts = new DisplayProducts();
        let productContent = await displayProducts.render();
        let productContainer = document.querySelector('.products');
        productContainer.innerHTML += productContent;
    }
}

App.Init();