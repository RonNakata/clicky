import "./DisplayArea.css";
import React from "react";
import friends from "../../friends.json";


// Fisher-Yates shuffle for array
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


class DisplayArea extends React.Component {
  state = {
    results: [],
    score: 0,
    highscore: 0
  }


  handleClick = (event) => {
    let imgName = (event.target.getAttribute("alt"));
    console.log(imgName);
    this.setState({
      results: this.state.results.concat(imgName)
    });

    if (this.state.results.indexOf(imgName) === -1) {
      this.setState({
        score: this.state.score + 1
      });
    }
    else if (this.state.score > this.state.highscore) {
      this.setState({
        results: [],
        highscore: this.state.score,
        score: 0
      });
    }
    else {
      this.setState({
        results:[],
        score: 0
      })
    }
  }

  render() {
    return (
      <div id="flexbox">
      <div id="instructions"> Click a picture to begin, but don't pick the same one twice or the game is over.</div>
        <div id="scorebox"><span id="scoreSpan">Score: {this.state.score} </span>
        <span id="highScoreSpan"> HighScore: {this.state.highscore}</span></div>
        {
          shuffle(friends).map(friend => {
            return (
              <div id="picbox" key={friend.id}>
                <img alt={friend.name} src={friend.image} onClick={this.handleClick} />
              </div>
            )
          })
        }
      </div>
    );
  }
}


export default DisplayArea;
