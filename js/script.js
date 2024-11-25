const sNameI = document.getElementById("sName");
const sUrlI = document.getElementById("sUrl");
const innerDataTable = document.getElementById("innerDataTable");
const addB = document.getElementById("add");
const visitB = document.getElementById("visit");
const deleteRowB = document.getElementById("delete");
let data = [];
if (localStorage.getItem("data")) {
    data = JSON.parse(localStorage.getItem("data"));
    display();
}
function run() {
    if(sNameI.classList.contains("is-valid") && sUrlI.classList.contains("is-valid")) {
        if(addBM()){
        display();
        clearInput();
        }
    }else{
        Swal.fire({
            template:"#message-1"
          });
    }
}
function addBM() {
    let found=false;
    data.forEach(element => {
        if(String(element.name).toLowerCase()==sNameI.value.toLowerCase()){
            found=true;
            return;
        }  
    });
    if (!found) {
        let bookmarkvalue = {
            name: sNameI.value.trim(),
            url: sUrlI.value.trim()
        }
        data.push(bookmarkvalue);
        localStorage.setItem("data", JSON.stringify(data));
        return true;
    }
    else{
        Swal.fire({
            template:"#message-2"
          });
          return false;
    }
}
function deleteBM(index) {
    data.splice(index, 1);
    localStorage.setItem("data", JSON.stringify(data));
    display();
}

function openUrl(index) {
    let urlvalue=data[index].url;
    const regex = /(https?:\/\/)/;
    if(!regex.test(urlvalue))
    {
        urlvalue="https://"+urlvalue;
    }
    window.open(urlvalue, "_blank",)
}
function display() {
    let container = "";
    for (let i = 0; i < data.length; ++i) {
        container += `
            <tr>
                <td>${i + 1}</td>
                <td>${data[i].name}</td>
                <td><button class="btn fw-semibold" id="visit" onclick="openUrl(${i})"><i class="fa-solid fa-eye"></i> Visit</button>
                </td>
                <td><button class="btn fw-semibold" id="delete" onclick="deleteBM(${i})"><i class="fa-solid fa-trash-can pe-1"></i>Delete</button></td>
            </tr>
                    `
    }
    innerDataTable.innerHTML = container;
}
function clearInput(){
    sNameI.value="";
    sUrlI.value="";
    sNameI.classList.remove('is-valid');
    sUrlI.classList.remove('is-valid');
}
// validation
sNameI.addEventListener('keyup', () => {
    const regex = /[a-zA-Z0-9]{3,}$/;
    if (!regex.test(sNameI.value)) {
        sNameI.setCustomValidity('Must be greater than 2 characters and Witout special characters.');
        sNameI.classList.add('is-invalid');
        sNameI.classList.remove('is-valid');
    } else {
        sNameI.setCustomValidity('');
        sNameI.classList.add('is-valid');
        sNameI.classList.remove('is-invalid');
    }
});
sUrlI.addEventListener('keyup', () => {
    const regex = /^(https?:\/\/)?[a-zA-Z0-9]{3,}\.[a-zA-Z]{2,}/;
    if (!regex.test(sUrlI.value)) {
        sUrlI.setCustomValidity('Must be greater than 3 characters and contain a "." followed by at least 2 characters.');
        sUrlI.classList.add('is-invalid');
        sUrlI.classList.remove('is-valid');
    } else {
        sUrlI.setCustomValidity('');
        sUrlI.classList.add('is-valid');
        sUrlI.classList.remove('is-invalid');
    }
});
sUrlI.addEventListener('keyup',(event)=>{
    if(event.key=="Enter"){
        run();
    }
})
let customMassage=`
 <template id="my-template">
        <swal-title>
            <div class="d-flex row text-dark text-start">
                <div class="d-flex p-1">
                    <span class="rounded-circle icon-style ms-1"
                        style="width: 20px;height: 20px; background-color: #f15f5d;"></span>
                    <span class="rounded-circle icon-style ms-1"
                        style="width: 20px;height: 20px; background-color: #febe2e;"></span>
                    <span class="rounded-circle icon-style ms-1"
                        style="width: 20px;height: 20px; background-color: #4db748;"></span>
                </div>
                <h3 class="fs-5 pt-2 ">Site Name or Url is not valid, Please follow the rules below :</h3>
                <p class=" fs-5 fw-normal"><i class="fa-solid fa-arrow-right pe-2"></i>Site name must contain at least 3 characters</p>
                <p class=" fs-5 fw-normal"><i class="fa-solid fa-arrow-right pe-2"></i>Site URL must be a valid one</p>
        </swal-title>
        </div>
    </template>`