//********************************************************
/*
*              BAKERY 'ENTREAMASADOS'
*   AUTHOR                : Luis Daniel Montero Falcon
*/
//********************************************************

console.log('ENTRO AL home.JS');

// //Required
//import  productsModel  from '/src/dao/models/products.model.js';

 
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

//Cargando productos del json y mostrando en la vista
showProducts();

async function showProducts() { 

    try {
        //json productos
        const url = 'http://localhost:8080/api/products'
        console.log(url);

        //get al json con los productos
        await fetch(url)
            .then( (res) => res.json())
            .then( (data) => {
            //recorriendo array para mostrar contenido, creando nodo hijo
            data.forEach((produc) => {
                const{id,name,price,weight,cant,img} =  produc;
                let divProducts = document.createElement("div");
                divProducts.className = "card";  
            
                divProducts.innerHTML =  `
                    <img src="${produc.img}">
                    <h3 class="name-product">${produc.name}</h3>
                    <h6 class="weight">${produc.weight}</h6>
                    <hr>
                    <div class="price">$${produc.price}</div>
                `; 
                //se agrega el nodo hijo al nodo padre
                content.append(divProducts);
                let btnDiv = document.createElement("div");
                let btnAdd = document.createElement("button");
                btnAdd.innerText = "agregar";
                btnDiv.className = "agregar";
                btnDiv.append(btnAdd);
                divProducts.append(btnDiv);

                //Agregando evento click al boton para instanciar la clase "Cart" y almacenar el pedido en un arrays
                btnAdd.addEventListener("click",() =>{
                    const repeat = listOrder.some((repeatProduct) => repeatProduct.id === produc.id);
                    if (repeat) {
                        listOrder.map((prod) => {
                            if (prod.id === produc.id) {
                                prod.cant++; 
                            } 
                        });
                    } else { 
                        const createOrder = new Cart(produc.id,produc.img,produc.name,produc.cant,produc.price);
                        Cart.saveOrder(createOrder,listOrder);
                        cartCount();
                        localSave();
                    }
                    //Agregando alerta con libreria toastify 
                    Toastify({
                        text: "Agregado a la canasta",
                        duration: 1000,
                        newWindow: true,
                        close: true,
                        gravity: "bottom", 
                        position: "right", 
                        stopOnFocus: true, 
                        style: {
                        background: "#ee9246",
                        color:"#000000"
                        }
                    }).showToast();
                });
            });
        });
        
    } catch (error) {
        console.log("error inicial, al cargar productos o al guardarlos en la canasta de pedidos");
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
