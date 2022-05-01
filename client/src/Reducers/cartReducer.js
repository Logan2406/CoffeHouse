const cart = [];

const manageCart = (state=cart,action) =>
{
    switch(action.type)
    {
        case "ADD_TO_CART" : {      console.log(action.payload)
                                    return([...state,action.payload]);}
        
        case "REMOVE_FROM_CART" :{state.splice(action.ind,1);
                                    return([...state]);
                                 };
        
        case "SAVE_PROD" : {
                                console.log("I AM IN SAVE PROD")
                                console.log(action.ind)
                                console.log(action.payload)
                                state[action.ind].prod_quant=action.payload
                                return ([...state]);
        }
        case "DELET_ALL" : {
                                console.log(" I AM IN DELETE ALL")
                                state = [];
                                return(state);
        }



        case "INC_QUANT" :  return cart;
        
        case "DEC_QUANT" :  return cart;
        
        default : return cart;    
    }
}

export default manageCart;