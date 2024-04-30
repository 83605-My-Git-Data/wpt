let refToUserName = document.getElementById('name');
let refToPassword = document.getElementById('password');

function SubmitData(){
   
    
    if(refToUserName.value === "" || refToPassword.value === ""){
        alert("Fields cannot be blank..!")
    }

    let lowerCaseName = refToUserName.value.toLowerCase();
    let lowerCasePassword = refToPassword.value.toLowerCase();
    

    if(lowerCaseName === "sachin" && lowerCasePassword === "sachin@123"){
       
        window.sessionStorage.setItem("name",lowerCaseName);
        window.sessionStorage.setItem("password",lowerCasePassword);
        window.location.href = 'home.html'
    }
    else{
       
        alert("Invalid user")
    }
}



function getData(){
    let user = window.sessionStorage.getItem("name")

    return `<h2>&nbsp${user} </h2>`
}

let refToWelcome = document.getElementById('welcome');

refToWelcome.innerHTML = refToWelcome.innerHTML+ getData();

function LogOut(){
    window.sessionStorage.clear();
    window.location.href = 'index.html'
}


function getFoodData(){
    let helper = new XMLHttpRequest();

    helper.onreadystatechange = ()=>{
        if(helper.readyState == 4 && helper.status == 200){
            let reply =  JSON.parse(helper.responseText);
            // let data = reply.data;

            let refToTableBody = document.getElementById('tableBody');
            refToTableBody.innerHTML = "";

            for(let i = 0;i<reply.length;i++){
                let row = ` <tr>
                <th scope="row">${reply[i].itemNo}</th>
                <td><img src="${reply[i].image}" height="100px" width="100px" alt=""></td> 
                <td>${reply[i].itemName}</td> 
                <td>${reply[i].price}</td>  
                <td><button type="button" class="btn btn-primary" onClick="addToCart()">Add To Cart</button></td>   
              </tr>`

              refToTableBody.innerHTML += row;
            }

            
        }

    }


    helper.open('GET',"http://127.0.0.1:5500/CartAssignment/data.json")
    helper.send();
}