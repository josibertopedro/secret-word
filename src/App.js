//css
import './App.css';

//react
import { useCallback,useEffect,useState} from "react";

//components
import StartScreen from './components/StartScreen';

import { wordsList } from './data/words';
import Jogo from './components/Jogo';
import GameOver from './components/GameOver';


const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);

  const [words] = useState(wordsList)
console.log(words)

//seleção de palavra
const [pickedWord,setpickedWord] = useState("");

//seleção de categoria
const [pickedCategory,setpickeCategory] = useState("")

//ditribuição de letras
const [letters,setLetters] = useState([])

const pickWordAndpickCategory = () => {
  const categories = Object.keys(words)//vai buscar as chaves das categorias em um array de words

  const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]//vai receber de 0 ao numero de categorias que tenho
  console.log(category)

  //pick a random word
  const word = words[category][Math.floor(Math.random()* words[category].length)]
console.log(word)
return {word,category};
}
//palavras adivinhadas
const [guessedLetters,setGuessedLetters] =useState([]);

//letras erradas
const [wrongLettters,setWrongLettters] = useState([])

//tentaivas do usuario
const [guesses,setGuesse] = useState(guessesQty);

//pontuação
const [score,setScore] = useState(50)

//start secret word jogo
const starGame =()=>{

//pick word and pick category
const{word,category}=  pickWordAndpickCategory();

//create an array of letters
let wordLetters = word.split("");

wordLetters = wordLetters.map((l)=> l.toLowerCase())

console.log(word,category)
console.log(wordLetters)

//fill states
setpickedWord(word);
setpickeCategory(category);
setLetters(wordLetters);

  setGameStage(stages[1].name)
}

//process the letter input
const verifyLetter = (letter) => {

const normalizedLetter = letter.toLowerCase()
//check if letter has alread been ulitized (se ja foi ultilizada)

if(guessedLetters.includes(normalizedLetter)||
 wrongLettters.includes(normalizedLetter)){
  return;
 }
// push guessed letter or remove a guess(vicluir as letras)
if(letters.includes(normalizedLetter)){
setGuessedLetters((actualGuessedLettes)=>[
  ...actualGuessedLettes,
  normalizedLetter
])
}else{
  setWrongLettters((actualWrongletters)=>[
    ...actualWrongletters,
    normalizedLetter
  ])

  setGuesse((actualuesses) => actualuesses -1)
}
console.log(guessedLetters)
console.log(wrongLettters)
 console.log(letter)
};

const clearLetterStates = () =>{
setGuessedLetters([]);
setWrongLettters([]);

}

useEffect(()=>{
if(guesses <=0){

//reset all states(zera o game)
clearLetterStates() //limpa os states das letras


setGameStage(stages[2].name)
}

},[guesses])
 
//restarts teh game
const retry = () => {

  setScore(0);
  setGuesse(guessesQty);
  setGameStage(stages[0].name)
}

  return (
    <div className="App">
      {gameStage === 'start' && <StartScreen starGame={starGame}/>}
     {gameStage === 'game' && <Jogo 
     verifyLetter={verifyLetter}
      pickedWord={pickedWord}
       pickedCategory={pickedCategory}
        letters={letters}
        guessedLetters={guessedLetters}
        wrongLettters={wrongLettters}
        guesses={guesses}
        score={score}/>}
     {gameStage === 'end' && <GameOver retry ={retry} score={score}/>}
    </div>
  );
}

export default App;
