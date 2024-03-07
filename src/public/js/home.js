//********************************************************
/*
*              BAKERY 'ENTREAMASADOS'
*   AUTHOR                : Luis Daniel Montero Falcon
*/
//********************************************************

console.log('ENTRO AL home.JS');
 
//Se almacena(getlocalstorage) el localstorage para trabajar siempre con los mismos datos 
let listOrder = JSON.parse(localStorage.getItem("listOrder")) || [];
//recupero el nodo del html donde le creare un nodo hijo con el contenido(productos) 
const content = document.getElementById("content");
//obtener los productos de la canasta
const getCart = document.getElementById("getCart");
//obtener del html el div nodo padre
const cartContainer = document.getElementById("cart-container");
const containerPay = document.getElementById("container-pay");
const cantCart  =document.getElementById("cantCart");
//IVA
const IVA = 0.21;
const addProductCart = document.querySelectorAll('addCart');



document.addEventListener('DOMContentLoaded', function () {

    console.log("ENTRO EN ELÑ EVENTLISTENER");

    var carUsuario= "{{user.first_name}}";
    console.log("CARUAURIOOO: ",carUsuario)
})


//contador de productos de la canasta
const cartCount=()=>{
    cantCart.style.display = "block";
    const carritoLength = listOrder.length;
    localStorage.setItem("carritoLength", JSON.stringify(carritoLength));
    cantCart.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};
cartCount();




showProducts();
async function showProducts() { 
    console.log('----------entro ee el showproducts metodo---------');
    try {
      //Agregando alerta con libreria toastify 
      Toastify({
        text: `Bienvenido`,
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "bottom", 
        position: "right", 
        stopOnFocus: true, 
        style: {
        background: "#ee9246",
        color:"#000012"
        }
    }).showToast();
        
    } catch (error) {
        console.log("error inicial, al cargar productos o al guardarlos en la canasta de pedidos", error)
    }
}



//Obtener IVA
function getIVA(total,IVA){
    return (total*IVA) + total;
}
//Funcion generar numero de seguimiento de pedido aleatorio
function getRandom() {
    return Math.floor(Math.random()*10000000);
}
//Funcion obtener fecha del dia de la compra
function getDate(){
    return new Date().toLocaleDateString();
}
//set localstorage
const localSave = () => {
    localStorage.setItem("listOrder", JSON.stringify(listOrder));
};


