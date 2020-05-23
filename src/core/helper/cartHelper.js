export const AddItemToCart = (item,next) => {
    let cart = []

    if(typeof window !== undefined) {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.push({
            ...item,
            count:1             //count is the quantity of the products in the cart
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}


export const loadCart = () => {
    if(typeof window !== undefined) {
        if(localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"))
        }
}
}

export const removeItemFromcart = (productId) => {
    let cart = []
    if(typeof window !== undefined) {
        if(localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"))
        }
        cart.map((product,i)=>{
            if(product._id===productId){
                cart.splice(i,1)
            }
        })
        localStorage.setItem("cart",JSON.stringify(cart))
        
    }
    return cart;
}


export const cartEmpty = next => {
    if(localStorage.getItem("cart")) {
        localStorage.removeItem("cart")
        let cart = []
        localStorage.setItem("cart",JSON.stringify(cart))
        next();
    }
}