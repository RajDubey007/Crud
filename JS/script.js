
let fname = document.getElementById('fname');
let lname = document.getElementById('lname');
let email = document.getElementById('email');
let password = document.getElementById('password');

let inputAddress = document.getElementById('inputAddress');


let errname = document.getElementById("errname");
let errlname = document.getElementById("errlname");
let erremail = document.getElementById("erremail");
let errpass = document.getElementById("errpass");
let errinputAdderss = document.getElementById("errinputAdderss");

let tbody = document.getElementById('View');



let isedit = false;
let isindex;
let getData = () => {
    let data = JSON.parse(localStorage.getItem('studentsdata'));
    if (data) {
        return data;
    } else {
        return [];
    }

};


let adds = getData();

const addData = () => {

    if (isedit) {
        let obj = {
            id: isindex ? isindex : Math.floor(Math.random() * 10000),
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            password: password.value,
            inputAddress: inputAddress.value
        };

        let data = [...adds];

        const updatdeta = data.map((recode) => {
            if (recode.id == isindex) {
                return recode = obj;
            }
            else {
                return recode;
            }
        });

        adds = updatdeta;

        if (fname.value == "") {
            errname.innerHTML = "please enter the name";
        }
        if (lname.value == "") {
            errlname.innerHTML = "please enter the last name";
        }

        if (email.value === "") {
            erremail.innerHTML = "please enter the email"
        }

        if (password.value == "") {
            errpass.innerHTML = "please enter the pass";
        }

        if (inputAddress.value == "") {
            errinputAdderss.innerHTML = "please enter the inputAdderss"
        }

        isedit = false;
        isindex = undefined;

    }
    else {
        let obj = {
            id: isindex ? isindex : Math.floor(Math.random() * 10000),
            fname: fname.value,
            lname: lname.value,
            email: email.value,
            password: password.value,
            inputAddress: inputAddress.value
        };

        adds = [...adds, obj];

        console.log("Adds", obj);
        console.log("ADSDS2", adds)
    }

    dataDisplay();
    localStorage.setItem('studentsdata', JSON.stringify(adds));
    fname.value = '';
    lname.value = '';
    email.value = '';
    password.value = '';
    inputAddress.value = '';
    isedit = true;
    isindex = id;

    return false;

};


// edit      


const singleRec = (id) => {
    console.log("id", id);

    let data = [...adds];


    let singleRec = data.filter((d) => {
        return d.id === id;
    });

    console.log("Edit Id", singleRec[0]); // single record

    fname.value = singleRec[0].fname;
    lname.value = singleRec[0].lname;
    email.value = singleRec[0].email;
    password.value = singleRec[0].password;
    inputAddress.value = singleRec[0].inputAddress;
    localStorage.setItem('studentsdata', JSON.stringify(data));
    isedit = true;
    isindex = id;
}



// delete

const deletdeta = (id) => {
    let data = [...adds];

    let deletdeta = data.filter((del) => {
        return del.id !== id;
    });
    localStorage.setItem('studentsdata', JSON.stringify(deletdeta));
    adds = deletdeta;
    dataDisplay();
};



// view


const dataDisplay = () => {

    tbody.innerHTML = '';

    adds.forEach(rec => {
        tbody.innerHTML += `<tr>
            <td>${rec.id}</td>
            <td>${rec.fname}</td>
            <td>${rec.lname}</td>
            <td>${rec.email}</td>
            <td>${rec.password}</td>
            <td>${rec.inputAddress}</td>
            <td>
                <button type="button" class="btn btn-primary"  onclick="singleRec(${rec.id})">Edit</button>
                <button type="button" class="btn btn-danger" onclick="deletdeta(${rec.id})">Delete</button>
            </td>
        </tr>`;

    });
};


dataDisplay();
