import { createSlice } from "@reduxjs/toolkit";

const booksSlice = createSlice({
  name: "books",
  initialState: {
    booksList: [],
    bookObj:{}
  },
  reducers: {
    assignBookIntoList: (state,action) =>{
        state.booksList=action.payload
    },
    addBookToList: (state, action) => {
        state.booksList.push(action.payload);
    },
    removeBookFromList: (state, action) => {
        state.booksList=state.booksList.filter((book)=>book.id!==action.payload.id)
    },
    updateQuantityoFBook: (state, action) => {
        state.booksList = state.booksList.map((book) => {
            if (book.id === action.payload.id) {
                return { ...book, quantity: action.payload.quantity };
            }
            return book;
        }).filter((book) => book.quantity > 0);
    },
  },
});

export const { assignBookIntoList, removeBookFromList, updateQuantityoFBook } = booksSlice.actions;
export default booksSlice.reducer;