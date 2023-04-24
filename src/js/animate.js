// PRODUCT FORM
let productForm = document.querySelector('.form');
// ADD EVENT LISTENER TO ADD PRODUCT BUTTON
document.querySelector('.add-product').onclick = () => {
    productForm.classList.toggle('active');
}

// ADD EVENT LISTENER TO ADD PRODUCT BUTTON FOR MOBILE USERS
document.querySelector('.add-product-mobile').onclick = () => {
    productForm.classList.toggle('active');
}

// ADD PRODUCT BUTTON
const addProductButton = document.querySelector('.add-product');
// CHANGE BACKGROUND COLOR WHEN CLICKED
addProductButton.addEventListener('click', () => {
    // ADD | REMOVE THE CLASS .form-visible
    addProductButton.classList.toggle('form-visible');
});

// ADD STYLES TO headerBAR ON SCROLL
const header = document.querySelector('header');
window.onscroll = function () { 
    if (document.body.scrollTop >= 100 || document.documentElement.scrollTop >= 100 ) {
        header.classList.add("header-scrolled");
        header.classList.remove("header-default");
    } 
    else {
        header.classList.add("header-default");
        header.classList.remove("header-scrolled");
    }
};