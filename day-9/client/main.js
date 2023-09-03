const form = document.querySelector('.form');
const input = document.querySelector('.input');
const todo = document.querySelector('.todo');

const backendUrl = "http://localhost:3555/todo"

const render = (data) => {
    data?.length ? todo.innerHTML = data.map(item => `
        <div>
            <input ${item.completed ? "checked" : ""} type="checkbox" data-check="${item.id}">
            <h3 class="${item.completed ? "compleded" : ""}">${item?.text}</h3>
            <button onclick="deleteItem(${item.id})"><img src="./img/bin.png"></button>
            <button onclick="updateItem(${item.id})"><img src="./img/edit.png"></button>
        </div>
    `).join("") : todo.innerHTML = `<h2>Ваш список пуст :(</h2>`
}

const getServer = () => {
    fetch(backendUrl).then(res => res.json()).then(data => {
        render(data)
    }).catch(err => console.log(err))
}

getServer()

todo.addEventListener('click', (e) => {
    if (Number(e.target.dataset.check)) {
        if (e.target.checked) {
            fetch(`${backendUrl}/${Number(e.target.dataset.check)}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ completed: true })
            }).catch(err => console.log(err)).finally(() => {
                getServer();
            }
            )
        }
        else {
            fetch(`${backendUrl}/${Number(e.target.dataset.check)}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ completed: false })
            }).catch(err => console.log(err)).finally(() => {
                getServer()
            })
        }
    }
})

const deleteItem = (id) => {
    if (Number(id)) {
        fetch(`${backendUrl}/${Number(id)}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .catch(err => console.log(err)).finally(getServer())
    }
}

const updateItem = (id) => {
    const newText = prompt("New Text: ")
    if (Number(id)) {
        fetch(`${backendUrl}/${Number(id)}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ text: newText })
            })
            .catch(err => console.log(err)).finally(() => {
                getServer()
            })
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault()
    fetch(backendUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ completed: false, text: input.value })
    }).then((res) => res.json()).then(data => console.log(data)).catch(err => console.log(err)).finally(() => {
        getServer()
    })
})