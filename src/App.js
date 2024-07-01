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
const [guesses,setGuesse] = useState(3);

//pontuação
const [score,setScore] = useState(0)

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
 console.log(letter)
}
//restarts teh game
const retry = () => {
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
     {gameStage === 'end' && <GameOver retry ={retry}/>}
    </div>
  );
}

export default App;
