"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// DEBUGGING
const log = console.log;
// THE document.readyState PROPERTY DESCRIBES THE LOADING STATE OF THE DOCUMENT.WHEN THE VALUE OF THIS PROPERTY CHANGES,A readystatechange event FIRES ON THE DOCUMENT OBJECT
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', InitCart);
}
else {
    InitCart();
}
// SELECTORS
// CONTAINER FOR SHOP ITEMS(Products)
const itemContainer = document.querySelector('.shop-items');
// FETCH SHOP ITEMS ITEMS(Products)
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        // URL TO FETCH DATA FROM
        let response = yield fetch('https://kishopchetu-server.onrender.com/products');
        // CONVERT THE RESPONSE TO JSON
        let products = yield response.json();
        // GET INDIVIDUAL PRODUCTS(Access each product uding a for..of loop) 
        for (let item of products) {
            // RENDER INDIVIDUAL PRODUCTS
            // HTML STRUCTURE
            itemContainer.innerHTML += `
        <div class="shop-item">
            <span class="shop-item-title" id="product-name">
                ${item.productName}
            </span>

            <img loading="lazy" class="item-img" src=${item.productImg} id="product-image">

            <div class="item-details">

                <span class="item-price" id="product-price">
                    ${item.productPrice}
                </span>

                <button class="btn btn-primary shop-item-button" type="button">

                <i class="fa-solid fa-cart-plus add-to-cart-icon"></i>

                <p> 
                    Add to cart
                </p>
                </button>
            </div> 
        </div>
        `;
        }
        // ADD ITEM TO CART ON CLICK
        let addToCartButtons = document.getElementsByClassName('shop-item-button');
        for (let index = 0; index < addToCartButtons.length; index++) {
            let button = addToCartButtons[index];
            button.addEventListener('click', addToCart);
        }
    });
}
// CALL FETCH PRODUCTS
fetchProducts();
// INITIALIZE CART
function InitCart() {
    // SELECT | WATCH ALL REMOVE CART ITEM BUTTONS
    let removeCartItemButtons = document.getElementsByClassName('btn-delete');
    for (let index = 0; index < removeCartItemButtons.length; index++) {
        let button = removeCartItemButtons[index];
        button.addEventListener('click', removeCartItem);
    }
    // SELECT | WATCH ALL QUANTITY FIELDS
    let quantityField = document.getElementsByClassName('cart-quantity-input');
    for (let index = 0; index < quantityField.length; index++) {
        let input = quantityField[index];
        input.addEventListener('change', onQuantityChange);
    }
    // SELECT | WATCH ALL ADD TO CART BUTTONS
    let addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (let index = 0; index < addToCartButtons.length; index++) {
        let button = addToCartButtons[index];
        button.addEventListener('click', addToCart);
    }
    // ADD EVENT LISTENER TO PURCHASE BUTTON
    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', onPurchase);
}
// HANDLE ON CLICK EVENT FOR PURCHASE BUTTON
function onPurchase() {
    alert('Thank you for your purchase...');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotal();
}
// REMOVE CART ITEM
function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
}
// UPDATE TOTAL WHEN ITEM QUANTITY CHANGES(quantity field)
function onQuantityChange(event) {
    let input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}
// ADD TO CART WHEN ADD TO CART BUTTON IS CLICKED
function addToCart(event) {
    let button = event.target;
    let shopItem = button.parentElement.parentElement;
    let title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    let price = shopItem.getElementsByClassName('item-price')[0].innerText;
    let imageSrc = shopItem.getElementsByClassName('item-img')[0].src;
    addItemToCart(title, price, imageSrc);
    updateTotal();
}
// ADD ITEM TO CART
function addItemToCart(title, price, imageSrc) {
    let cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    let cartItems = document.getElementsByClassName('cart-items')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (let index = 0; index < cartItemNames.length; index++) {
        if (cartItemNames[index].innerText == title) {
            alert('Item has already been added to the cart...');
            return;
        }
    }
    // HTML CONTENT STRUCTURE
    let cartContent = `
        <div class="cart-item cart-column">

            <img class="cart-item-image" src="${imageSrc}">

            <span class="cart-item-title">
                ${title}
            </span>
        </div>

        <span class="cart-price cart-column cart-item-price">
            ${price}
        </span>

        <div class="cart-quantity cart-column">

            <input class="cart-quantity-input" type="number" value="1">

            <button class="btn btn-delete" type="button">
                <i class="fas fa-trash trash-icon"></i>
            </button>

        </div>`;
    // APPEND HTML 
    cartRow.innerHTML = cartContent;
    cartItems.append(cartRow);
    // ADD EVENT LISTENER TO DELETE ITEM FROM CART BUTTON(trash can icon)
    cartRow.getElementsByClassName('btn-delete')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', onQuantityChange);
}
// UPDATE CART TOTAL
function updateTotal() {
    let cartItemContainer = document.getElementsByClassName('cart-items')[0];
    let cartRows = cartItemContainer.getElementsByClassName('cart-row');
    let total = 0;
    for (let i = 0; i < cartRows.length; i++) {
        let cartRow = cartRows[i];
        let priceElement = cartRow.getElementsByClassName('cart-price')[0];
        let quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        let price = parseFloat(priceElement.innerText.replace('KES', ''));
        let quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    // APPEND CURRENCY TO TOTAL
    document.getElementsByClassName('cart-total-price')[0].innerText = 'KES ' + total;
}
//# sourceMappingURL=cart.js.map