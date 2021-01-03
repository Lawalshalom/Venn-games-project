const form = document.getElementById("input-form");
const getUser = document.getElementById("get-users");
const success = document.getElementById("success-div");

form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const name = formData.get("name");
    const address = formData.get("address");
    const age = formData.get("age");

    const params = {
        headers: {
        "Content-type": "application/JSON",
        },
        body: JSON.stringify({
            name,
            age,
            address
        }),
        method: "POST"
    }

    async function submitData(params){
        const res = await fetch("https://venn-games-project.herokuapp.com/save-user", params);
        const data = await res.json();
        success.innerHTML = data.success;
    }
    submitData(params).catch(err => console.log(err));
}


getUser.onclick = () => {
    async function getUsers(){
        const res = await fetch("https://venn-games-project.herokuapp.com/get-users", {method: "GET"});
        const data = await res.json();
        console.log(data);
        const users = data.users.split("},");
        users.pop();
        const usersDiv = document.getElementById("users");
        usersDiv.innerHTML = "";
        users.forEach(item => {
            const user = JSON.parse(item+ "}");
            usersDiv.insertAdjacentHTML("beforeend",`
            <div class="user-item">
                <p>Name: ${user.name}</p>
                <p>Age: ${user.age}</p>
                <p>Address: ${user.address}</p>
            </div>`
            )
        })
    }
    getUsers().catch(err => console.log(err));
}