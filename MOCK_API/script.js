let tBody = document.querySelector("#tbody");
let idBtn = document.querySelector("#id");

function getApi() {
    tBody.innerHTML = "";
    fetch("https://northwind.vercel.app/api/orders")
        .then((info) => info.json())
        .then((data) => {
            let sorted
            if (asc === 'asc') {
                asc = 'desc'
                sorted = data.sort((a, b) => a.id - b.id);
                console.log('asc');
            } else {
                asc = 'asc'
                sorted = data.sort((a, b) => b.id - a.id);
                console.log('desc');
            }
            sorted.forEach((el) => {
                let trEL = document.createElement("tr");
                trEL.innerHTML = `
                <td>${el.id}</td>
                <td>${el.shipName}</td>
                <td>${el.orderDate}</td>
                <td>${el.shipAddress.city}</td>
                <td><button  onclick=deleteBtn(${el.id})>Delete</button></td>
                `;
                
                tBody.append(trEL);
            })
        }
        );
}
getApi();

function deleteBtn(id) {
    fetch(`${"https://northwind.vercel.app/api/orders"}/${id}`, {
        method: "DELETE",
    }).then(() => getApi());
}
let asc = "asc";


idBtn.addEventListener('click', () => {
    getApi()
})