const box = document.querySelector(".box");

let tabsname = [{ name: "Tab1", content: "Tab1 text", id: 0 }, { name: "Tab2", content: "Tab2 text", id: 1 }, { name: "Tab3", content: "Tab3 text", id: 2 }, { name: "Tab4", content: "Tab4 text", id: 3 }, { name: "Tab5", content: "Tab5 text", id: 4 }];

let id = tabsname[0].id;

const render = () => {
    box.innerHTML = tabsname.map(item => (
        `
        <div class="box__content">
            <button onclick="tab(${item.id})" class=${item.id == id ? "content" : ""}>${item.name}</button>
            ${id === item.id ? `<p>${item.content}</p>` : ""}
        </div>
        `
    )).join("\n");
}

const tab = (itemid) => {
    id = itemid;
    render()
}

render()