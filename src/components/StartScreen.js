
import './StartScreen.css'

const StartScreen = ({starGame}) => {
  return (
    <div className='start'>
        <h1>Secret Word</h1>
        <p>Clique no botão para comerçar o jogo</p>
        <button onClick={starGame}>Comerçar o jogo</button>
    </div>
  );
};

export default StartScreen