import React from 'react'
import './BookCard.scss'

import { useNavigate } from 'react-router-dom';
import {bookImg} from '../../Utils/bookImg'

const BookCard = ({bookItem}) => {
  //console.log(bookItem);
  const navigate=useNavigate()
  const handleBook=(bookId)=>{
    navigate(`/bookDetails/${bookId}`)
  }
  const randomIndex= ()=>{
    return Math.floor(Math.random() * 18);
  }
  
  return (
    <div className='bookcard-cnt' onClick={()=>{handleBook(bookItem._id)}}>
        <div className='baokcard-img-cnt'>
            <img src={bookImg[randomIndex()]} alt="book" />
        </div>
        <div className='bookcard-name-details'>
            <h4>{bookItem.bookName}</h4>
            <span>{bookItem.author}</span>
            <div className='bookstore-star-cnt'>
                <h4>4.5 &#9733;</h4>
                <span>({bookItem.quantity})</span>
            </div>
            <div style={{display:'flex',gap:'15px'}}>
              <h4 id='price'>RS {bookItem.discountPrice}</h4>
              <s style={{color:'#878787'}}><h4 id='price' style={{color:'#878787'}}>RS {bookItem.price}</h4></s>
            </div>
            
        </div>
    </div>
  )
}

export default BookCard