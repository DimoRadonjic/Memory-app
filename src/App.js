import React from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/helmet-1.png' },
  { src: '/img/potion-1.png' },
  { src: '/img/ring-1.png' },
  { src: '/img/scroll-1.png' },
  { src: '/img/shield-1.png' },
  { src: '/img/sword-1.png' },
];

class App extends React.Component {
  state = {
    cards: [],
    turn: 0,
    choiceOne: null,
    choiceTwo: null,
  };

  shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    this.setState({ cards: shuffledCards, turn: 0 });
  };

  handleChoice = (card) => {
    this.state.choiceOne
      ? this.setState({ choiceTwo: card })
      : this.setState({ choiceOne: card });
  };

  render() {
    console.log(this.state.cards);
    return (
      <div className='App'>
        <h1>Magic Match</h1>
        <button onClick={this.shuffleCards}>New Game</button>
        <div className='card-grid'>
          {this.state.cards.map((card) => {
            return (
              <SingleCard
                card={card}
                key={card.id}
                handleChoice={this.handleChoice}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
