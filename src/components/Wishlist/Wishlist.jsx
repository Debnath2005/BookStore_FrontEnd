import React from 'react'
import './Wishlist.scss'
import cartImg from '../../Assest/Image.png'
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import { wishlistRemoveApi } from '../../Utils/Api';
import { removeBookFromWishList } from '../../Utils/store/wishlistbooksSlice';
import logoutImg from '../../Assest/Page-1.png'
import { useNavigate } from 'react-router-dom';
const Wishlist = () => {
    const wishlistData=useSelector((store)=>store.wishlist.wishListBooksList)
    console.log(wishlistData);
    const dispatch=useDispatch()
    
    const navigate=useNavigate()

    const handleRemove=(bookId)=>{
        dispatch(removeBookFromWishList(bookId))
        wishlistRemoveApi(`bookstore_user/remove_wishlist_item/${bookId}`)
        .then((result)=>{
            const {data}=result
            console.log(data);

        })
    }
  return (
    <div className='wishlist-cnt'>
        <div style={{marginBottom:"20px",color:'#9D9D9D', cursor:"pointer"}}><span onClick={()=>navigate("/")}>Home</span> / <span style={{color:"black"}}>My Wishlist</span></div>
        <div>
            
            {
                localStorage.getItem('bookStore-token') ?
                 <div>
                    <div className='mywishlist-cnt'>
                        <h3>My Wishlist ({wishlistData.length})</h3>
                    </div>
                    {
                    wishlistData.map((book,index)=>{
                        return <div className='wishlist-all-items-cnt' key={index}>
                        <div className='wishlist-item-cnt'>
                            <div className='wishlist-img-cnt'>
                                <img src={cartImg} alt="bookimg" />
                            </div>
                            <div>
                                <span>{book?.product_id?.bookName}</span>
                                <br />
                                <span id='author'>{book?.product_id?.author}</span>
                                <h4>Rs. {book?.product_id?.discountPrice}</h4>
                            </div>
                        </div>
                        <div onClick={()=>handleRemove(book.product_id._id)} style={{cursor:"pointer"}}> 
                          <DeleteIcon/>
                        </div>
                    </div>
                    })
                 }
                </div>
                
                :
                <div className='wishlist-logout-cnt' style={{marginTop:"20px"}}>
                    <div style={{textAlign:"center"}}>
                        <h2 style={{margin:"0"}}>PLEASE LOG IN</h2>
                        <div style={{color:"#9D9D9D"}}>Login to view items in your wishlist.</div>
                    </div>
                   <img src={logoutImg} alt="img" />
                    <button>LOGIN/SIGNUP</button>
                </div>

            }
            
            
        </div>
    </div>
  )
}

export default Wishlist