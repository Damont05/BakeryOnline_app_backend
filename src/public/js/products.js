
const socket = io();

let ulProducts = document.querySelector('ul')
let liNewProduct = document.createElement('li')

socket.on("newProduct", newProduct => {
    console.log("viene importado: " , newProduct.id);
    liNewProduct.innerHTML=newProduct.id + ' - ' +newProduct.title
    ulProducts.append(liNewProduct);
})
