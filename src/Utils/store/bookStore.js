import { configureStore } from "@reduxjs/toolkit";
import bookSlice from './bookSlice'
import cartSlice from './cartSlice'
import wishListbooksSlice from './wishlistbooksSlice'
import querySearchSlice from './quarySearchSlice'

const bookStore = configureStore({
  reducer: {
    books: bookSlice,
    cart: cartSlice,
    wishlist:wishListbooksSlice,
    querySearch:querySearchSlice,
  },
});

export default bookStore;