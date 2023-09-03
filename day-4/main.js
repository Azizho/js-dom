const form = document.querySelector('.form');
const input = document.querySelector('.input');
const box = document.querySelector('.box');
const form2 = document.querySelector('.form2');
const input2 = document.querySelector('.input2');
const close = document.querySelector('.close');

let array = [];

const render = () => {
    box.innerHTML = array.map((item) => (
        `
            <p>${item.name}</p>
            <button onclick="OnDelete(${item.id})">Delete</button>
            <button onclick="OnEdit(${item.id})">Edit</button>
        `
    )).join('');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let obj = {};

    obj[input.name] = input.value
    array.push(obj);

    input.value = '';


    render();
    console.log(array);
})

const OnDelete = (id) => {
    array = array.filter(el => el.id !== id);
    render();
}

const OnEdit = (id) => {
    form2.style.display = 'block';

    input2.value = array.find(el => el.id === id).name;

    form2.addEventListener('submit', (e) => {
        e.preventDefault()
        let obj = array.find(el => el.id === id);


        obj.name = input2.value;
        array.find(el => el.id === id).name = obj.name;

        render()
    })
}

close.addEventListener('click', () => {
    form2.style.display = 'none';
})