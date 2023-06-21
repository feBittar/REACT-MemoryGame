import React from 'react'
import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped, disabled }) {
    const handleClick = () => {
        if (!disabled) handleChoice(card)
    }


    return (
        <div className='card' >
            <div className={flipped ? 'flipped' : ''}>
                <img className='front' src={card.src} alt='card front'></img>
                <span className='back' onClick={handleClick}>◐</span>
            </div>
        </div>
    )
}

export default SingleCard