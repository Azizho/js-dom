const box = document.querySelector(".box");
const btns = document.querySelector(".btns");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const inputs = document.querySelectorAll(".inputs")
const modalForm = document.querySelector(".modal-form")
const form = document.querySelector(".form")
const selects = document.querySelector(".selects")
const postInput = document.querySelectorAll(".post-input")

let id = 0;

const renderBtns = () => {
    btns.innerHTML = `
        <button class="${id == 0 ? "content" : ""}" id="posts">posts</button>
        <button class="${id == 1 ? "content" : ""}" id="comments">comments</button>
    `
}

renderBtns()

const siteUrl = 'http://localhost:3000/'

const render = (data, id) => {
    box.innerHTML = data.map(item => `
        <h4>${item.title}</h4>
        <p>${item.author}</p>
        <button data-delete="${item.id}" class="${id}">Delete</button>
        <button data-update="${item.id}" class="${id}">Update</button>
    `).join("")
}

const getData = async (id) => {
    try {
        const res = await fetch(siteUrl + id);
        const data = await res.json();
        render(data, id)
    } catch (error) {
        console.log(error);
    }
}

getData('posts')

btns.addEventListener('click', (e) => {
    if (e.target.id) {
        if (id == 0) {
            id = 1;
        } else {
            id = 0;
        }
        renderBtns()
        getData(e.target.id);
    }
})

box.addEventListener("click", async (e) => {
    const update = Number(e.target.dataset.update);
    const ClassName = e.target.className;
    if (Number(e.target.dataset.delete) && ClassName) {
        try {
            await fetch(siteUrl + `${e.target.className}/${Number(e.target.dataset.delete)}`, {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
            })
            getData(e.target.className);
        } catch (error) {
            console.log(error);
        }
    }

    const updateData = {}
    if (update && ClassName) {
        modal.style.display = "block";
        modalForm.addEventListener("submit", async (event) => {
            event.preventDefault();


            for (i of inputs) {
                updateData[i.name] = i.value;
                i.value = ""
            }

            try {
                await fetch(siteUrl + `${e.target.className}/${e.target.dataset.update}`, {
                    method: "PUT",
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(updateData)
                })
                getData(e.target.className);
                modal.style.display = "none"
            } catch (error) {
                console.log(error);
            }
        })

    }
})

const PostData = {};
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    for (i of postInput) {
        PostData[i.name] = i.value;

    }

    try {
        await fetch(siteUrl + selects.value, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(PostData)
        }
        )
        getData(selects.value)
    } catch (error) {
        console.log(error);
    }

})

close.addEventListener("click", () => {
    modal.style.display = "none"
})