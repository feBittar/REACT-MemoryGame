import { useEffect, useState } from 'react';
import './Components/SingleCard.css'
import SingleCard from './Components/SingleCard';
import React from 'react'


const cardImages = [
  { "src": "/assets/Token-Ckukktukmass.png", matched: false },
  { "src": "/assets/Token-golvroger.png", matched: false },
  { "src": "/assets/Token-mrkings.png", matched: false },
  { "src": "/assets/Token-mrqueens.png", matched: false },
  { "src": "/assets/Token-Ryze.png", matched: false },
  { "src": "/assets/Token-Shen.png", matched: false },
  { "src": "/assets/Token-Tyler.png", matched: false },
  { "src": "/assets/Token-zed.png", matched: false }
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState([null])
  const [choiceTwo, setChoiceTwo] = useState([null])
  const [disabled, setDisabled] = useState(false)


  // shuffle cards
  const shuffleCards = () => {

    let lastId = 0
    const shuffledCards = [...cardImages, ...cardImages].sort(() => Math.random() - 0.5).map((card) => ({ ...card, id: lastId++ }))
    resetValues()
    setCards(shuffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }
  // autostart the game 

  useEffect(() => {
    shuffleCards()
    
  }, [])

  // handle choice
  const handleChoice = (card) => {
    // Stop the user from being able to click the first card twice
    if (card.id === choiceOne?.id ||card.id === choiceTwo?.id ) return;
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)

  }

  // run after choiceOne or choiceTwo receive new values 

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetValues()
      }
      if (choiceOne.src !== choiceTwo.src) {
        setTimeout(() => {

          resetValues()
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo])


  // reset states/vars
  const resetValues = () => {
    setTurns(prevTurns => prevTurns+1)
    setChoiceOne(null)
    setChoiceTwo(null)
    setDisabled(false)
  }

  return (
    <div className="App">
      <h1>Runarcana Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className='container'>
        {cards.map(card => (
          <SingleCard handleChoice={handleChoice} card={card} key={card.id} flipped={card === choiceOne || card === choiceTwo || card.matched} disabled={disabled} />
        ))}
      </div>
      <p>Turns:{turns}</p>
    </div>
  );
}

export default App;
