import { ProductManager } from "../service/products.service.js";

const productManager = new ProductManager();

// export const login=(req,res)=>{
//     res.status(200).render("login")
// }


export const getProducts=async(req,res)=>{

    let products=await productManager.getProducts();

    console.log("PRODUCTS VIEWA CONTROLLER: " , products);

    // map a productos, para agregar una propiedad carrito_id
    // if(!products){
    //     res.setHeader('Content-Type','application/json');
    //     return res.status(500).json({error:`Error inesperado en el servidor - Intente más tarde, o contacte a su administrador`})
    // }

    // res.setHeader('Content-Type','text/html')
    // res.status(200).render("products",{
    //     products, 
    //     usuario:req.user,
    //     helpers:{
    //         mayuscula(valor) {return valor.toUpperCase()},
    //         resaltar(dato) {return `<b>${dato}</b>`},
    //         carrito() {return `"${req.user.carrito_id}"`}
    //     }
    // })
}