function initDB() {
    fetch("./users/initDB", {
            method: "GET",
            headers: {
                'accept': 'application/json'
            }
        }).then( function (resp) {
            if(resp.ok) {
                resp.json().then(function (json) {
                    updateUserTable(json);
                })
            }
        })
}

function findAllUsers() {
    fetch("./users", {
        method: "GET",
        headers: {
            'accept': 'application/json'
        }
    }).then( function (resp) {
        if(resp.ok) {
            resp.json().then(function (json) {
                updateUserTable(json);
            })
        }
    })
}

function findById() {
    var id = document.getElementById("inputFindId").value;
    fetch("./users/" + id, {
        method: "GET",
        headers: {
            'accept': 'application/json'
        }
    }).then( function (resp) {
        if(resp.ok) {
            resp.json().then(function (json) {
                updateUserTable([json]);
            })
        }
    })
}

function findBySearch() {
    var searchTerm = document.getElementById("inputSearch").value;
    fetch("./users/search/?key=" + searchTerm, {
        method: "GET",
        headers: {
            'accept': 'application/json'
        }
    }).then( function (resp) {
        if(resp.ok) {
            resp.json().then(function (json) {
                updateUserTable(json);
            })
        }
    })
}

function createOrUpdate() {
    var id = document.getElementById("inputUpdateId").value;
    var fname = document.getElementById("inputFname").value;
    var lname = document.getElementById("inputLname").value;
    var email = document.getElementById("inputEmail").value;
    var pass = document.getElementById("inputPassword").value;

    var uri = "./users";
    var method = "POST";
    if(id !== "") {
        uri += "/" + id;
        method = "PUT";
    }
    var userBody = {
        firstName: fname,
        lastName: lname,
        email: email,
        password: pass
    };

    fetch(uri, {
        method: method,
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(userBody)
    }).then( function (resp) {
        if(resp.ok) {
            resp.json().then(function (json) {
                updateUserTable([json]);
                document.getElementById("inputUpdateId").value = "";
                document.getElementById("inputFname").value = "";
                document.getElementById("inputLname").value = "";
                document.getElementById("inputEmail").value = "";
                document.getElementById("inputPassword").value = "";
            })
        }
    })
}

function fillUpdateForm(user) {
    document.getElementById("inputUpdateId").value = user.id;
    document.getElementById("inputFname").value = user.firstName;
    document.getElementById("inputLname").value = user.lastName;
    document.getElementById("inputEmail").value = user.email;
    document.getElementById("inputPassword").value = user.password;
    document.getElementById("inputFname").focus();
}

function deleteById() {
    var id = document.getElementById("inputDeleteId").value;
    fetch("./users/" + id, {
        method: "DELETE",
        headers: {
            'accept': 'application/json'
        }
    }).then( function (resp) {
        if(resp.ok) {
            findAllUsers();
        }
    })
}

function updateUserTable(users) {
    var tableBody = document.getElementById("tableBody");
    // clear userList
    tableBody.innerHTML = "";

    users.forEach(function (user) {
        var tr = document.createElement("tr");
        var tdActions = document.createElement("td");
        var tdId = document.createElement("td");
        var tdName = document.createElement("td");
        var tdEmail = document.createElement("td");

        var btnUpdateForm = document.createElement("button");
        btnUpdateForm.innerHTML = "edit";
        btnUpdateForm.onclick = function () {
            fillUpdateForm(user);
        };
        tdActions.appendChild(btnUpdateForm);
        tdId.innerHTML = user.id;
        tdName.innerHTML = user.firstName + " " + user.lastName;
        tdEmail.innerHTML = user.email;

        tr.appendChild(tdActions);
        tr.appendChild(tdId);
        tr.appendChild(tdName);
        tr.appendChild(tdEmail);
        tableBody.appendChild(tr);
    });
}