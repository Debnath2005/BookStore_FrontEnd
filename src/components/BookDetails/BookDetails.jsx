import React, { useState } from 'react'
import './BookDetails.scss'
import bookImg from '../../Assest/Image.png'
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import StarPurple500OutlinedIcon from '@mui/icons-material/StarPurple500Outlined';
const BookDetails = () => {
    const [isCard,setISCard]=useState(false)
    const [cardItem,setCardItem]=useState(0)
    const handleCard=()=>{
        setISCard(!isCard)
    }
    const handleIncreaseCard=()=>{
        setCardItem((prev)=>prev+1)
    }
    const handleDecreaseCard=()=>{
        setCardItem((prev)=>(prev > 0 ? prev - 1 : 0))
    }
  return (
    <div className='bookdetails-cnt'>
        <div className='bookdetails-main-cnt'>
            <div className='bookdetails-left-cnt'>
                <img src={bookImg} alt="bookImg" />
                <div className='bookdetails-left-button-cnt'>
                    {
                        isCard===false ? <button className='addToBag' onClick={handleCard}>ADD TO BAG</button>
                                        : 
                                        <div className='cart-button'>
                                            <button onClick={handleDecreaseCard}>-</button>
                                             <span>{cardItem}</span>
                                             <button onClick={handleIncreaseCard}>+</button>
                                        </div>
                    }
                     
                     <button className='wishlist'><FavoriteOutlinedIcon/>  WISHLIST</button>
                </div>
            </div>
            <div className='bookdetails-right-cnt'>
                <div className='bookdetails-right-details-cnt'>
                    <h1>Don't Make Me Think</h1>
                    <h3>by Steve Krug</h3>
                    <div className='bookstore-star-cnt'>
                        <h4>4.5 <StarPurple500OutlinedIcon/> </h4>
                        <span>(20)</span>
                    </div>
                    <h1>RS. 1500</h1>
                </div>
                <div className='bookdetails-right-line-cnt'></div>
                <div className='bookdetails-right-about-cnt'>
                   <h3>Book Details</h3>
                   <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum eum optio dignissimos quo quasi, aut quod provident eaque velit at culpa dicta deleniti voluptatem repellendus! Iusto, ipsum atque mollitia magnam excepturi dignissimos commodi, architecto laborum, eligendi in nobis quia. Nobis aperiam deleniti nesciunt ratione neque dolorem repellendus possimus. Fuga, provident.</p>
                </div>
                <div className='bookdetails-right-line-cnt'></div>
            </div>
        </div>
    </div>
  )
}

export default BookDetails