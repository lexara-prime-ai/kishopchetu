const log = console.log;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', Init)
} else {
    Init();
}

// PRODUCT CONTAINER
const itemContainer = document.querySelector('.shop-items');

// FETCH PRODUCTS
async function fetchProducts() {
    let response = await fetch(`https://kishopchetu-server.onrender.com/products`);
    let products = await response.json();

    for (let item of products) {
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

        // ADD TO CART BUTTON
        var addToCartButtons = document.getElementsByClassName('shop-item-button');
        for (var i = 0; i < addToCartButtons.length; i++) {
            var button = addToCartButtons[i];
            button.addEventListener('click', addToCart);
        }
}

fetchProducts();


// CART FUNCTIONS
function Init() {
    var removeCartItemButtons = document.getElementsByClassName('btn-delete');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    var quantityInputs = document.getElementsByClassName('cart-quantity-input');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', onQuantityChange);
    }

    // ADD TO CART BUTTON
    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCart);
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click', onPurchase);
}

// HANDLE PURCHASE
function onPurchase() {
    alert('Thank you for your purchase...');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild);
    }
    updateTotal();
}

// REMOVE CART ITEM
function removeCartItem(event) {
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateTotal();
}

// OON QUANTITY CHANGE
function onQuantityChange(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// ADD TO CART WHEN ADD TO CART BUTTON IS CLICKED
function addToCart(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText;
    var price = shopItem.getElementsByClassName('item-price')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('item-img')[0].src;
    addItemToCart(title, price, imageSrc);
    updateTotal();
}

// ADD ITEM TO CART
function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0];
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title');
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('Item has already been added to the cart');
            return;
        }
    }
    // CART HTML
    var cartRowContents = `
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
    cartRow.innerHTML = cartRowContents;
    cartItems.append(cartRow);
    cartRow.getElementsByClassName('btn-delete')[0].addEventListener('click', removeCartItem);
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', onQuantityChange);
}

// UPDATE CART TOTAL
function updateTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0];
    var cartRows = cartItemContainer.getElementsByClassName('cart-row');
    var total = 0;
    for (var i = 0; i < cartRows.length; i++) {
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName('cart-price')[0];
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0];
        var price = parseFloat(priceElement.innerText.replace('KES', ''));
        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('cart-total-price')[0].innerText = 'KES' + total;
}




