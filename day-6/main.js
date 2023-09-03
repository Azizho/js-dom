const form = document.querySelector('.form');
const email = document.querySelector('.form__email');
const password = document.querySelector('.form__password');
const repeat = document.querySelector('.form__repeat-password');
const content = document.querySelector('.content');


const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (emailRegex.test(email.value) && passwordRegex.test(password.value) && repeat.value == password.value) {
        email.classList.remove("valid")
        repeat.classList.remove("valid")
        password.classList.remove("valid")
        form.style.display = "none"
        content.style.display = "block"
        content.textContent = "Добро пожаловать на сайт! " + email.value
    } else if (repeat.value != password.value) {
        password.classList.add("valid")
        repeat.classList.add("valid")
        setTimeout(() => {
            password.classList.remove("valid")
            repeat.classList.remove("valid")
        }, 3000)
    } else if (!emailRegex.test(email.value)) {
        email.classList.add("valid")
        setTimeout(() => {
            email.classList.remove("valid")

        }, 3000)
    } else if (!passwordRegex.test(password.value)) {
        password.classList.add("valid")
        setTimeout(() => {
            password.classList.remove("valid")

        }, 3000)
    }
})