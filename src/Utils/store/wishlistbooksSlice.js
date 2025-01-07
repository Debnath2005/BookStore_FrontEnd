import { createSlice } from "@reduxjs/toolkit";

const  wishListbooksSlice = createSlice({
    name: "wishListBooks",
    initialState: {
        wishListBooksList: [],
        wishListBooksObj: {},
    },
    reducers: {
         assingBooksIntoWishList:(state,action)=>{
            state.wishListBooksList=action.payload;
         //   console.log(state.wishListBooksList)
         },
        addBookToWishList: (state, action) => {
            state.wishListBooksList.push(action.payload);
        },
        // removeBookFromWishList: (state, action) => {
        //     state.wishListBooksList=state.wishListBooksList.filter((book)=>book._id!==action.payload.id)
        // }

        removeBookFromWishList: (state, action) => {  
            state.wishListBooksList=state.wishListBooksList.filter((book)=>{
                // console.log(book._id)
                if(book.product_id._id!==action.payload )
                    return book
            })
        }
    }
});

export const { addBookToWishList, removeBookFromWishList, assingBooksIntoWishList} = wishListbooksSlice.actions;
export default wishListbooksSlice.reducer;