const bar = document.getElementById("bar");
const close = document.getElementById("close");
const nav  = document.getElementById("navbar");
const mainImg = document.getElementById("mainimg");
const smallImg = document.getElementsByClassName("small-img");
const hideCart = document.getElementById("close-bar");
const showCart = document.querySelectorAll("#lg-bag");
const cartDiv = document.getElementById("cart");
const cartLog = document.getElementsByClassName("cart-log");
const cartNo = document.getElementById("cart-no");
const listCart = document.getElementById("list-cart");
const cartDescription = document.querySelector(".cart-description");
const clearCheck = document.querySelector(".clear-check");
const noOfCart = document.getElementById("no-of-cart");
const cartContainer = document.getElementById("cart-container");
const containerCart = document.getElementById("container-cart");
const clearCart = document.querySelector(".clear-cart");
if(bar){
bar.addEventListener("click",()=>{
    nav.classList.add("active");
})
}
if(close){
close.addEventListener("click",()=>{
    nav.classList.remove("active");
})
}

showCart.forEach(icon =>{
    icon.addEventListener("click",()=>{
        cartDiv.style.right="30px"; 
    })
})

function closeCart(){
    hideCart.addEventListener("click",()=>{
        cartDiv.style.right="-500px";
    }); 
}
closeCart();

let totalPrice = 0; // Variable to store the total price

// Loop through cartLog and attach event listeners to each element
for (let i = 0; i < cartLog.length; i++) {
cartLog[i].addEventListener("click", addToCart);
}


function addToCart(event) {
let btn = event.target;
let btnParent = btn.parentElement;
let btnGrandParent = btnParent.parentElement;
let btnGreatParent = btnGrandParent.parentElement;
let itemImage = btnGreatParent.children[0].src;
let itemBrand = btnGreatParent.children[1].children[0].textContent;
let itemDescription = btnGreatParent.children[1].children[1].textContent;
let itemPrice = parseFloat(btnGreatParent.children[1].children[3].children[0].textContent); // Convert price to a number
cartNo.style.display = "block";
clearCheck.style.display = "grid";
cartNo.textContent = Number(cartNo.textContent) + 1;
cartDescription.style.display = "none";
noOfCart.textContent = Number(noOfCart.textContent) + 1;
listCart.innerHTML += `<div id="cart-container">
<img src="${itemImage}">
<div id="pro-details">
<div id="first-tag"><p>${itemBrand}</p><span class="delete"><i class="fa-solid fa-trash"></i></span></div>
<p id="pro-description">${itemDescription}</p>
<div id="price-status">
    <div id="minus-plus">
    <button class="minus">-</button>
    <p class="item-value">1</p>
    <button class="plus">+</button>
    </div>
    <p class="price-place">$<span class="price-value">${itemPrice}</span></p>
</div>
</div>
</div>`;

totalPrice += itemPrice; // Add item price to total price

// Set the total price in the checkout button
document.getElementById('total-price').textContent = totalPrice.toFixed(2);

// Add event listener to the plus button inside the newly added cart item
let plusButtons = document.querySelectorAll(".plus");
let minusButtons = document.querySelectorAll(".minus");
let deleteButtons = document.querySelectorAll(".delete");

plusButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        let itemValue = event.target.previousElementSibling;
        itemValue.innerHTML = Number(itemValue.innerHTML) + 1;
        totalPrice += itemPrice; // Increment total price
        document.getElementById('total-price').textContent = totalPrice.toFixed(2); // Update total price

        // Change background color of corresponding minus button
        let minusButton = event.target.parentElement.querySelector('.minus');
        if (minusButton) {
            minusButton.style.backgroundColor = "#05e235"; // Change background color to green
        }
    });
});

minusButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        let itemValue = event.target.nextElementSibling;
        if (Number(itemValue.innerHTML) > 1) {
            itemValue.innerHTML = Number(itemValue.innerHTML) - 1;
            totalPrice -= itemPrice; // Decrement total price
            document.getElementById('total-price').textContent = totalPrice.toFixed(2); // Update total price
        } else {
            event.target.style.backgroundColor = ""; // Reset background color
        }
    });
});

deleteButtons.forEach(button => {
    button.addEventListener("click", function(event) {
        let container = event.target.closest('#cart-container');
        container.remove();
        totalPrice -= itemPrice; // Decrement total price
        cartNo.textContent = Number(cartNo.textContent) - 1;
        noOfCart.textContent = Number(noOfCart.textContent) - 1;
        if(noOfCart.textContent < 1){
            console.log("its okay");
            clearCheck.style.display = "none";
            cartDescription.style.display = "block";
            cartNo.style.display = "none";
        }
        document.getElementById('total-price').textContent = totalPrice.toFixed(2); // Update total price
        
    });
});

function clearCartBtn(){
    clearCart.addEventListener("click",()=>{
        listCart.innerHTML = "";
        clearCheck.style.display = "none";
        cartDescription.style.display = "block";
        cartNo.style.display = "none"; 
        noOfCart.textContent = 0;
    })
}
clearCartBtn();
}




