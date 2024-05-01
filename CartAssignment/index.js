let refToUserName = document.getElementById('name');
let refToPassword = document.getElementById('password');
let refTobillingBody = document.getElementById('billingBody');
let refToTableBody = document.getElementById('tableBody');


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

           
            refToTableBody.innerHTML = "";
           

            for(let i = 0;i<reply.length;i++){
                let row = `<tr id=tr${reply[i].itemNo}>
                <th scope="row">${reply[i].itemNo}</th>
                <td><img src="${reply[i].image}" height="100px" width="100px" alt=""></td> 
                <td>${reply[i].itemName}</td> 
                <td>${reply[i].price}</td>  
                <td><button type="button" class="btn btn-primary" onClick="addToCart(${reply[i].itemNo})">Add To Cart</button></td>   
              </tr>`

              refToTableBody.innerHTML += row;

              

             


            }


            
        }

    }


    helper.open('GET',"http://127.0.0.1:5500/CartAssignment/data.json")
    helper.send();
}

let addedItems = [];

function addToCart(itemNo){

    

    

    
    
    fetch("http://127.0.0.1:5500/CartAssignment/data.json")
    .then(res=>res.json())
    .then(reply=>{

        if(addedItems.includes(itemNo)){
            alert("already added item")
        }
        
        else{
        
            let row = `<tr id=trBill${itemNo}>
            <th scope="row">${reply[itemNo-1].itemNo}</th>
            <td>${reply[itemNo-1].itemName}</td> 
            <td id="price${itemNo}">${reply[itemNo-1].price}</td>  
            <td><button onclick="increaseCount(${itemNo})">+</button>
            <div id="quantity${itemNo}">1</div> 
            <button onclick="decreaseCount(${itemNo})">-</button>
            </td>
            <td id=total${itemNo}>${reply[itemNo-1].price} RS </td>
            </tr>`
        
          refTobillingBody.innerHTML += row;

          addedItems.push(itemNo);
          calculateFinalTotal();
         
            }
        }

    )
    .catch(err=>{
        console.log("error while getting data"+err);
    })



}




function increaseCount(item){
    let refToQuantity = document.getElementById(`quantity${item}`);
    let count = parseInt(refToQuantity.innerHTML);
    ++count;
    refToQuantity.innerHTML = count;

    finalPrice(item,count);

  

   


}

function decreaseCount(item) {
    let refToQuantity = document.getElementById(`quantity${item}`);
    let count = parseInt(refToQuantity.innerHTML);


    if (count <= 0) {
        let deletingRow = document.getElementById(`trBill${item}`);

        let parent = deletingRow.parentNode;
        console.log(parent);
        

       
        
        
            refTobillingBody.removeChild(deletingRow); 
            let index = addedItems.indexOf(item);

            
            for(let i = index;i<addedItems.length-1;i++){
                addedItems[i] = addedItems[i+1];
               }
               addedItems.pop();
            
            calculateFinalTotal(); 
       
        return;
    }
    --count;
    refToQuantity.innerHTML = count;

    finalPrice(item, count);
}


function finalPrice(itemNo,qt){
    // let refTototal = document.getElementById(`total${itemNo}`);
    let refToPrice = document.getElementById(`price${itemNo}`)
    let price = parseInt( refToPrice.innerText);
    let total = price*qt;

    document.getElementById(`total${itemNo}`).innerText = total +" RS";
    calculateFinalTotal();

}


function calculateFinalTotal(){
    let row = document.querySelectorAll('#billingBody tr');
    let finalBill = 0;

    row.forEach(row =>{
        let total = parseInt( row.querySelector('td:last-child').innerText);
        finalBill += total;

    })

    document.getElementById('totalBill').innerText = 'Total Amount: '+finalBill;
}
