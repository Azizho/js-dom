import DataData from "/data.js";

const products = document.querySelector(".products")
const cart = document.querySelector(".cart")
const total = document.querySelector(".total")

const localCart = localStorage.getItem("cart")
const localData = localStorage.getItem("data")

let cartData = localCart ? JSON.parse(localCart) : [];
let data = localData ? JSON.parse(localData) : [...DataData];

const renderData = () => {
    localStorage.setItem("data", JSON.stringify(data));
}

const renderLocal = () => {
    localStorage.setItem("cart", JSON.stringify(cartData))
}
renderLocal()
renderData()


if (total.textContent == " ") {
    total.style.display = "none"
} else {
    total.style.display = "inline-block"
}

const totalrender = () => {
    total.textContent = cartData.reduce((acc, item) => {
        return acc + Number(item.userPrice)
    }, 0) + "$"
}
const productsrender = () => {
    products.innerHTML = data.map(item => {
        const cartFilter = cartData.find(el => el.id === item.id);
        if (item.count > 0) {
            return (
                `
                    <div class="item">
                        <img
                        src=${item.img}
                        alt=""
                        />
                        <h2>${item.name}</h2>
                        <strong>${item.price}$</strong>
                        <p>Количество: ${item.count}</p>
                        ${!cartFilter ? `<button data-productid=${item.id} class="add-cart">Добавить в корзину</button>` : `<button data-productid=${item.id} class="remove-cart">Удалить с корзины</button>`}
                    </div >
            `
            )
        }
    }).join("")
}
const cartrender = () => {
    cart.innerHTML = cartData.map(item => {

        if (item.count > 0) {
            return (
                `
                    <div class="item">
                        <img
                        src=${item.img}
                        alt=""
                        />
                        <h2>${item.name}</h2>
                        <strong>${item.price}$</strong>
                        <p>Количество: ${item.userCount}</p>
                        <div class="item__buttons">
                            <button data-addcount=${item.id}>+</button>
                            <button data-recount=${item.id}>-</button>
                        </div>
                    </div >
            `
            )
        }
    }).join("")
}
products.addEventListener("click", e => {
    if (e.target.className == "add-cart" && e.target.dataset.productid) {
        let item = cartData.some((item) => item.id === Number(e.target.dataset.productid))
        if (!item) {
            let product = data?.find((item) => item.id === Number(e.target.dataset.productid))
            cartData.push({ ...product, userCount: 1, userPrice: product.price })
            product.count = product.count - 1
        }
    }

    if (e.target.className == "remove-cart" && e.target.dataset.productid) {
        let item = cartData.some((item) => item.id === Number(e.target.dataset.productid))
        let cartItem = cartData?.find((item) => item.id === Number(e.target.dataset.productid))
        if (item) {
            let product = data?.find((item) => item.id === Number(e.target.dataset.productid))
            product.count += cartItem.userCount
            cartData = cartData?.filter((item) => item.id !== Number(e.target.dataset.productid))
        }
    }

    productsrender()
    cartrender()
    totalrender()
    renderLocal()
    renderData()
})

cart.addEventListener("click", e => {
    if (e.target.dataset.addcount) {
        for (let i of data) {
            if (Number(e.target.dataset.addcount) === i.id && i.count > 0) {
                i.count -= 1;

                cartData.forEach(el => {
                    if (el.id === i.id) {
                        el.userCount += 1;
                        el.userPrice = i.price * el.userCount;
                    }
                })
            }
        }
    }

    else if (e.target.dataset.recount) {
        for (let i of cartData) {
            if (Number(e.target.dataset.recount) === i.id) {
                if (i.userCount === 1) {
                    cartData = cartData.filter(item => item.id !== i.id)
                } else {
                    i.userCount -= 1;
                }


                data.forEach(el => {
                    if (el.id === i.id) {
                        el.count += 1;
                        i.userPrice = el.price * i.userCount;
                    }
                })
            }
        }
    }

    cartrender()
    productsrender()
    totalrender()
    renderLocal()
    renderData()
})

productsrender()
cartrender()