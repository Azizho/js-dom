const options = [
    {
        id: 1,
        name: "carrot",
        description: "Морковка - стань лучше видеть!",
        price: 1000,
        image: "./img/carrot.jpg"
    },
    {
        id: 2,
        name: "Potato",
        description: "Карторшка - божественная еда!",
        price: 3000,
        image: "./img/potato.jpg"
    },
    {
        id: 3,
        name: "Onion",
        description: "Лук - ай глаза!",
        price: 12,
        image: "./img/onion.jpg"
    }
    , {
        id: 4,
        name: "carrot",
        description: "Морковка - стань лучше видеть!",
        price: 1000,
        image: "./img/carrot.jpg"
    },
    {
        id: 5,
        name: "carrot",
        description: "Морковка - стань лучше видеть!",
        price: 1000,
        image: "./img/carrot.jpg"
    },
    {
        id: 6,
        name: "carrot",
        description: "Морковка - стань лучше видеть!",
        price: 1000,
        image: "./img/carrot.jpg"
    }, {
        id: 7,
        name: "carrot",
        description: "Морковка - стань лучше видеть!",
        price: 1000,
        image: "./img/carrot.jpg"
    }

]

const shop = document.querySelector(".shop");


shop.innerHTML = options.map(item =>
(
    `
        <div class="shop__item">
            <img src="${item.image}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <p>Цена: ${item.price}$</p>
        </div>
    `
)
).join("\n")