const cartContainer = document.querySelector(".cart__items-container");
let actualQuantity = 1
let cartItemList = []
const buyBtn = document.querySelector('.cart__buy-btn')

const products = await fetch("/api/products/").then((res) => res.json());
const cartItem =  (e) => {
    const newItem = document.createElement('div')
    const item = {
        price : products[e].price,
        name : products[e].name,
        imgSrc : products[e].imgSrc,
        quantity : actualQuantity,
        productId : products[e].id,
    }
    newItem.classList.add('item')
    newItem.innerHTML = `<div class="main-header__cart">
    <div class="main-header__cart-item">
        <img src="${products[e].imgSrc}" alt="${products[e].name}" class="main-header__cart-item-img">
        <div class="main-header__cart-item-info">
            <h3 class="main-header__cart-item-name">${products[e].name}</h3>
            <p class="main-header__cart-item-price">$ ${products[e].price}</p>
        </div>
        <div class="main-header__cart-item-quantity">
            <button class="main-header__cart-item-quantity-button restar">-</button>
            <p class="main-header__cart-item-quantity-number">${actualQuantity}</p>
            <button class="main-header__cart-item-quantity-button agregar">+</button>
            </div>
            <div class="main-header__cart-item-total">
                <p class="main-header__cart-item-total-price">$ ${products[e].price * actualQuantity}</p>
            </div>
            <div class="main-header__cart-item-delete">
                <button class="main-header__cart-item-remove">X</button>
            </div>    
    </div>
</div>    
    `
cartContainer.appendChild(newItem)
cartItemList.push(item)
console.log(cartItemList)
}

buyBtn.addEventListener('click', async () => {
    const result = await fetch('/api/carts/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(cartItemList)
    }).then((res) => res.json())
    console.log(result)
    cartItemList = []
    cartContainer.innerHTML = ''
})

const plusOne = (e) => {
    const quantity = e.target.previousElementSibling;
    quantity.innerHTML = Number(quantity.innerHTML) + 1;
}

const minusOne = (e) => {
    const quantity = e.target.nextElementSibling;
    if (quantity.innerHTML > 1) {
        quantity.innerHTML = Number(quantity.innerHTML) - 1;
    }
}

cartContainer.addEventListener('click', e=> {
    if (e.target.classList.contains('agregar')) {
        const agregar = e.target
        agregar.addEventListener('click', plusOne(e))
    }
    if (e.target.classList.contains('restar')) {
        const restar = e.target
        if (actualQuantity >= 1) {
            restar.addEventListener('click', minusOne(e))
        }        
    }
    if (e.target.classList.contains('main-header__cart-item-remove')) {
        const remove = e.target
        remove.parentElement.parentElement.parentElement.remove()
        cartItemList.pop(e)
    }
    if (e.target.classList.contains('.main-header__cart-item-total-price')) {
        cartItemList.addEventListener('change', e=> {
            const sum = 0
            const total = e.target.querySelector('.cart__total')
            const totales = document.querySelectorAll('.main-header__cart-item-total-price')
            for (let i = 0; i < totales.length; i++) {
                total.innerHTML = sum += totales[i]
            }    
        })
    }

})

class Cart {
    constructor() {
        this.cart = {};
        this.client = "Default";
        this.total = 0;
        this.cartItems = 0;
    }
}

class CartItems {
    constructor(id, price) {
        this.id = id;
        this.price = price;
        this.quantity = 1;
        this.subtotal = price;
    }
}

export {cartItem, cartItemList}
