import React, { useState ,useRef} from 'react'
import './Jogo.css'
const Jogo = ({
    verifyLetter, 
    pickedWord,
    pickedCategory,
    letters,
    guessedLetters,
    wrongLettters,
    guesses,
    score
    }) => {
        const[letter,setLetter] = useState("");

        const letterInputRef = useRef(null)

        const handleSubmit = (e)=>{
            e.preventDefault();

            verifyLetter(letter)
            setLetter("");
            letterInputRef.current.focus();
        };

  return (
   <div className='game'>
    <p className='points'>
    <span>Pontuação: {score}</span>
    </p>
    <h1>Adivinha a Palavra:</h1>

    <h3 className='tip'>
        Dica sobre a palavra:<span> {pickedCategory}</span>
    </h3>
    <p>Voçê ainda tem {guesses} tentativas(s).</p>
    <div className='wordContainer'>
       {letters.map((letter,i)=>(
        guessedLetters.includes(letter) ?(
        <span key={i} className='letter'>{letter}</span>
        ):(
                <span key={i} className='blankSquare'></span>)
       ))}
    </div>
    <div className='letterContainer'>
        <p>Tente adivinha uma letra:</p>
        <form onSubmit={handleSubmit}>
        <input 
        type='text'
         name='letter'
          maxLength="1" 
          required 
          onChange={(e)=>setLetter(e.target.value)}
          value={letter}
          ref={letterInputRef}
          ></input>
        <button>jogar!</button>
        </form>
    </div>
    <div className='worngLettersContainer'>
    <p>Letras já utilizadas:</p>
   {wrongLettters.map((letter,i)=>(
    <span key={i}>{letter}, </span>
   ))}
    </div>
   </div>

    
  )
}

export default Jogo