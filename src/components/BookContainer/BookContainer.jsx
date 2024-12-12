import React from 'react'
import BookCard from '../BookCard/BookCard'
import './BookContainer.scss'
const BookContainer = () => {
  return (
    <div style={{display:'flex', flexWrap:'wrap',gap:'20px',paddingLeft:'160px',marginTop:'20px',marginBottom:'20px'}}>
        <BookCard id='1'/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
        <BookCard/>
    </div>
  )
}

export default BookContainer