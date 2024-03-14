



/*
const socket = io();

let ulProducts = document.querySelector('ul')
let liNewProduct = document.createElement('li')

socket.on("newProduct", newProduct => {
    console.log("viene importado: " , newProduct.id);
    liNewProduct.innerHTML=newProduct.id + ' - ' +newProduct.title
    ulProducts.append(liNewProduct);
})
*/

const comprar=async(idProducto, idCarrito)=>{
    console.log({idProducto, idCarrito})
    // let prueba=document.getElementById("carritoId")
    // console.log("Carrito tomado desde imput oculto:",prueba.value)

    // let respuesta=await fetch("/api/carritos/"+idCarrito+"/producto/"+idProducto,
    // {method:"post"})
    // let datos=await respuesta.json()

    // console.log("DATOOOOS>",datos)
    // if(respuesta.status===200){
    //     alert("Producto agregado al carrito...!!!")
    // }else{
    //     alert("Error... :(")
    // }

}