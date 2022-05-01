export const addToCart = ({name,img,quantity,prodId,price}) =>
{
    console.log("this is action :"+name);
    return(
        {
            type:"ADD_TO_CART",
            payload:{prod_name:name,prod_img:img,prod_id:prodId,prod_price:price,prod_quant:quantity}
        }
    )
}


export const removeFromCart = (i) =>
{
    return(
        {
            type:"REMOVE_FROM_CART",
            ind:i
        }
    )
}

export const saveProd = ({i,quantity}) =>
{
    return(
        {
            type:"SAVE_PROD",
            ind:i,
            payload:quantity
        }
    )
}

export const deleteAll = () =>
{
    return(
        {
            type:"DELETE_ALL"
        }
    )
}



export const increaseQuant = (ind) =>
{
    return(
        {
            type:"INC_QUANT",
        }
    )
}

export const decreaseQuant = (ind) =>
{
    return(
        {
            type:"DEC_QUANT",
        }
    )
}