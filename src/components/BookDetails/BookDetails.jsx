import React, { useMemo, useState } from 'react'
import './BookDetails.scss'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { bookImg } from '../../Utils/bookImg';
import { AddCartItemApi, AddWishlistItemApi, UpdateCartItemApi } from '../../Utils/Api';
import { addCartItem, updateQuantityInCart } from '../../Utils/store/cartSlice';
import { addBookToWishList } from '../../Utils/store/wishlistbooksSlice';
import { useEffect } from 'react';

const BookDetails = () => {
    //const [isCard,setISCard]=useState(false)
    
    const [isFav,setIsFav]=useState(false)
    
    const {bookId}=useParams()
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const bookData=useSelector((store) => store.books.booksList)
    const cartData=useSelector((store) => store.cart.cartList);
     const wishlistData=useSelector((store)=>store.wishlist.wishListBooksList)
     console.log("bookDetails--",cartData);
    
    const bookDetail = bookData?.find((book) => book._id === bookId);
    //   console.log(bookDetail);
    const cartItem=cartData?.find((book) => book.product_id._id === bookId);
    const wishlist = wishlistData?.find((book) => book.product_id._id === bookId);
    const [quantity,setQuantity]=useState(cartItem!==undefined?cartItem.quantityToBuy:0)

    // console.log(cartData);
    // console.log(cartItem);
    
    // if(cartItem){
    //     setQuantity(cartItem.quantityToBuy)
    //     console.log(quantity)
    // }
    useEffect(() => {
        if (wishlist !== undefined) {
            setIsFav(true);
        }
        // if(cartItem){
        //     setQuantity(cartItem.quantityToBuy)
        // }
        
    }, [wishlistData]);

    // useEffect(()=>{
    //     console.log(cartData);
        
    // },[cartData])
    
    const randomIndex= ()=>{
        return Math.floor(Math.random() * 18);
    }
    const handleCard=(action)=>{
        // setISCard(!isCard)
        if(action==='addToCart'){
            setQuantity(1)
           
            if(localStorage.getItem('bookStore-token')){
                
                AddCartItemApi(`bookstore_user/add_cart_item/${bookId}`)
                .then((res)=>{
                    const {data}=res 
                    dispatch(addCartItem({
                        product_id:{
                            author: bookDetail.author,
                            bookName: bookDetail.bookName,
                            discountPrice: bookDetail.discountPrice, 
                            _id:data.result.product_id
                        },
                        _id:bookDetail._id,
                        // quantityToBuy: data.result.quantityToBuy,   
                        quantityToBuy:1
                    }))
                    console.log(data);
                })
                .catch((error)=>{
                    console.log(error);
                })
            }
            else{
                dispatch(addCartItem({
                    product_id:{
                        author: bookDetail.author,
                        bookName: bookDetail.bookName,
                        discountPrice: bookDetail.discountPrice, 
                    } 
                ,
                    quantityToBuy:quantity,   
                }))
            }
            
        }
        else if(action==='updateIncQuantity'){
            setQuantity(quantity+1)
            if(localStorage.getItem('bookStore-token')){
                UpdateCartItemApi(`bookstore_user/cart_item_quantity/${cartItem._id}`,{quantityToBuy:quantity})
                .then((result)=>{
                    const {data}=result
                    console.log(data);
                    dispatch(updateQuantityInCart({id:cartItem._id,quantityToBuy:quantity}))  
                })
            }
            else{
                dispatch(updateQuantityInCart({id:cartItem._id,quantityToBuy:quantity}))  
            } 

        }
        else if(action==='updateDecQuantity'){
            setQuantity(quantity-1)
            if(localStorage.getItem('bookStore-token')){
                UpdateCartItemApi(`bookstore_user/cart_item_quantity/${cartItem._id}`,{quantityToBuy:quantity})
                .then((result)=>{
                    const {data}=result
                    console.log(data);
                    dispatch(updateQuantityInCart({id:cartItem._id,quantityToBuy:quantity}))  
                })
            }
            else{
                dispatch(updateQuantityInCart({id:cartItem._id,quantityToBuy:quantity}))  
            } 

        }

        else if(action==='addtoWishlist'){
            // setQuantity(quantity+1)
            setIsFav(true)
            if(localStorage.getItem('bookStore-token')){
                AddWishlistItemApi(`bookstore_user/add_wish_list/${bookId}`)
                .then((result)=>{
                    const {data}=result
                    console.log(data);
                    dispatch(addBookToWishList({
                        product_id:{
                            author: bookDetail.author,
                            bookName: bookDetail.bookName,
                            discountPrice: bookDetail.discountPrice, 
                        } 
                    }))
                })
            }
            
        }
        
    }
    // const handleIncreaseCard=()=>{
    //     setCardItem((prev)=>prev+1)
    // }
    // const handleDecreaseCard=()=>{
    //     setCardItem((prev)=>(prev > 1 ? prev - 1 : 1))
    // }
    // const handleFav=()=>{
    //     setIsFav(!isFav)
    // }
  return (
    <div className='bookdetails-cnt'>
        <div style={{marginBottom:"20px",color:'#9D9D9D', cursor:"pointer",paddingLeft:"160px",marginTop:'20px'}}><span onClick={()=>navigate(-1)}>Home</span> / <span style={{color:"black"}}>Book Details</span></div>
        <div className='bookdetails-main-cnt'>
            <div className='bookdetails-left-cnt'>
                <img src={bookImg[useMemo(()=>randomIndex(),[])]} alt="bookImg" />
                <div className='bookdetails-left-button-cnt'>
                    {
                       quantity===0 ? <button className='addToBag' onClick={()=>handleCard('addToCart')}>ADD TO BAG</button>
                                        : 
                                        <div className='cart-button1'>
                                            <button onClick={()=>handleCard('updateDecQuantity')}>-</button>
                                             {/* <span>{cartItem?.quantityToBuy}</span> */}
                                             {/* <span>{cartItem?.quantityToBuy}</span> */}
                                             <span>{cartItem===undefined ? 1: cartItem?.quantityToBuy}</span>
                                             <button onClick={()=>handleCard('updateIncQuantity')}>+</button>
                                        </div>
                    }

                    <button className='wishlist' onClick={()=>handleCard('addtoWishlist')}><FavoriteIcon className={isFav===true?'active':''} />  WISHLIST</button>
                </div>
            </div>
            <div className='bookdetails-right-cnt'>
                <div className='bookdetails-right-details-cnt'>
                    <h1>{bookDetail?.bookName}</h1>
                    <h3>{bookDetail?.author}</h3>
                    <div className='bookstore-star-cnt'>
                        <h4>4.5 &#9733; </h4>
                        <span>({bookDetail?.quantity})</span>
                    </div>
                    <h1>RS. {bookDetail?.discountPrice}</h1>
                </div>
                <div className='bookdetails-right-line-cnt'></div>
                <div className='bookdetails-right-about-cnt'>
                   <h3>Book Details</h3>
                   <p>{bookDetail?.description}</p>
                </div>
                <div className='bookdetails-right-line-cnt'></div>
            </div>
        </div>
    </div>
  )
}

export default BookDetails