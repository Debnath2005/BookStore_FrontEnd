import { createSlice } from "@reduxjs/toolkit";

const cartSlice=createSlice({
    name:"carts",
    initialState:{
        cartList:[],
        cartObj:{},
        userDetails:'',
        orderList:[],
        addressDetails:[]
    },
    reducers:{
        assignCartIntoList: (state,action) =>{
            state.cartList=action.payload
        },
        assignOrderList: (state,action)=>{
            state.orderList=action.payload
        },
        assignAddressList: (state,action)=>{
            state.addressDetails=action.payload
        },
        assignUserDetails: (state,action)=>{
            //console.log(action.payload);
            state.userDetails=action.payload
        },
        addCartItem: (state,action)=>{
            console.log(action.payload);
            state.cartList.push(action.payload)
        },
        removeBookFromCartList: (state, action) => {
            state.cartList=state.cartList.filter((book)=>{
             
                if(book._id!==action.payload )
                    return book
            })
        },
        updateQuantityInCart: (state,action) =>{
            state.cartList = state.cartList.map((book) => {
                
                if (book._id === action.payload.id){
                    return { ...book, quantityToBuy: action.payload.quantityToBuy};
                }
                return book;
            })
        }
    }
})


export const { assignCartIntoList,assignUserDetails,removeBookFromCartList,addCartItem,updateQuantityInCart,assignOrderList, assignAddressList } = cartSlice.actions;
export default cartSlice.reducer;