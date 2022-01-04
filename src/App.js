import React, { Component } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  { src: '/img/helmet-1.png', matched: false },
  { src: '/img/potion-1.png', matched: false },
  { src: '/img/ring-1.png', matched: false },
  { src: '/img/scroll-1.png', matched: false },
  { src: '/img/shield-1.png', matched: false },
  { src: '/img/sword-1.png', matched: false },
];

class App extends Component {
  state = {
    cards: [],
    turn: 0,
    choiceOne: null,
    choiceTwo: null,
    disabled: false,
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

  componentDidUpdate() {
    const resetTurn = () => {
      this.setState({
        choiceOne: null,
        choiceTwo: null,
        turn: this.state.turn + 1,
        disabled: false,
      });
    };

    const newCards = (prevCards) => {
      return prevCards.map((card) => {
        if (card.src === this.state.choiceOne.src) {
          return { ...card, matched: true };
        } else {
          return card;
        }
      });
    };

    if (this.state.choiceOne && this.state.choiceTwo) {
      if (this.state.choiceOne.src === this.state.choiceTwo.src) {
        console.log('Cards Match');
        this.setState((prevState) => {
          return {
            cards: newCards(prevState.cards),
          };
        });
        resetTurn();
      } else {
        console.log('Cards Don"t Match');
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }

  render() {
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
                flipped={
                  card === this.state.choiceOne ||
                  card === this.state.choiceTwo ||
                  card.matched
                }
                disabled={
                  this.state.choiceOne && this.state.choiceTwo
                    ? !this.state.disabled
                    : this.state.disabled
                }
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
