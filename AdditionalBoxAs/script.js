
let refToTable = document.getElementById('table');

function addIntoRecord(){

    let no = document.getElementById('ino').value;
let name = document.getElementById('iname').value;
let address = document.getElementById('iaddress').value;


        let data =  `<tr>
        <td>${no}</td>
        <td>${name}</td>
        <td>${address}</td>
    </tr>`

      refToTable.innerHTML += data;
}

function clearData(){
    let no = document.getElementById('ino')
    let name = document.getElementById('iname')
    let address = document.getElementById('iaddress')

    no.value="";
    name.value = "";
    address.value = "";
}