let classes = (classes) => document.getElementsByClassName(classes);
let element = (id) => document.getElementById(id);
let entries = [];


function displayTable(){
    let table = element("user-table");
    let entrie = entries;
    let str = `<tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Dob</th>
                    <th>Accepted terms?</th>
                </tr>\n`;
    for(let i=0;i<entrie.length;i++){
        str += `<tr>
                    <td>${entrie[i].name}</td>
                    <td>${entrie[i].email}</td>
                    <td>${entrie[i].password}</td>
                    <td>${entrie[i].dob}</td>
                    <td>${entrie[i].checked}</td>
                </tr>\n`;
    }
    table.innerHTML = str;
}

function dropTable(){
    let obj = localStorage.getItem("entries");
    if(obj){
        entries = JSON.parse(obj);
    }else{
        entries = [];
    }
    return entries;
}

function checkDOB(){
    let age = new Date().getFullYear() - new Date(dob.value).getFullYear();
    if(age < 18 || age>55){
        return false;
    }else{
        return true;
    }
}

function verifier(elem,message,cnd){
    if(cnd){
        elem.style.border = "3px solid red";
        elem.setCustomValidity(message);
        elem.reportValidity();
    }else{
        elem.style.border = "3px solid green";
        elem.setCustomValidity('');

    }
}

entries = dropTable();

let user_name = element("name"),
  dob = element("dob"),
  _email = element("email"),
  password = element("password"),
  terms = element("tc");

let form = element("form");
let errormsg = classes("errormsg");

let message_name = "Username must be at least 3 characters long";
let message_email = "Email must be valid";
let message_agree = "You must agree to the terms and conditions";
let message_dob = "You age must be between 18 and 55 to continue";

user_name.addEventListener("input", (e) => {
    let cond_name = user_name.value.length < 3;
    e.preventDefault();
    verifier(user_name,message_name,cond_name);
});
dob.addEventListener("input", (e) => {
    let cond_dob = !checkDOB();
    e.preventDefault();
    verifier(dob,message_dob,cond_dob);
});

email.addEventListener("input", (e) => {
    let cond_email = !(_email.value.includes("@") && _email.value.includes("."));
    e.preventDefault();
    verifier(_email,message_email,cond_email);
});

tc.addEventListener("input", (e) => {
    let cond_agree = !tc.checked;
    e.preventDefault();
    verifier(terms,message_agree,cond_agree);
});

function makeObject(){
    let check = false;
    if(terms.checked){
        check = true;
    }
    let obj = {
        name: user_name.value,
        email: _email.value,
        password: password.value,
        dob: dob.value,
        checked: check
    }
    return obj;
}

form.addEventListener("submit", (e) => {
    let cond_agree= !tc.checked;
    e.preventDefault();
    if (!cond_agree) {
        let obj = makeObject();
        entries.push(obj);
        localStorage.setItem("entries", JSON.stringify(entries));
    }
    displayTable();
});
window.onload = (event) => {
    displayTable();
};