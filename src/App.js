import React, { useEffect, useState } from "react";
import "./App.scss";
import TwitterIcon from "@mui/icons-material/Twitter";
function App() {
  const backgroundColors = [
    "#FC6343",
    "#E0FC43",
    "#43F8FC",
    "#A143FC",
    "#FC43C8",
  ];
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesAndAuthors, setQuotesAndAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState(backgroundColors[0]);
  const fetchQuotes = async () => {
    const response = await fetch(
      "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
    );
    const data = await response.json();

    setQuotesAndAuthors(data.quotes);
    setLoading(false);
  };
  useEffect(() => {
    fetchQuotes();
  }, []);

  const randomNumberGenerate = (length) => {
    let current = Math.floor(Math.random() * (length - 0) + 0);
    setRandomNumber(current);
  };

  const randomBG = () => {
    let current = Math.floor(Math.random() * (backgroundColors.length - 0) + 0);
    setBackgroundColor(backgroundColors[current]);
  };
  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Loading ....</h1>
        </header>
      </div>
    );
  }
  const { author, quote } = quotesAndAuthors[randomNumber];
  return (
    <div className="wrapper" style={{ backgroundColor: backgroundColor }}>
      <div className="App" id="quote-box">
        <div className="App-header" id="text">
          <p id="new-quote">" {quote} "</p>
          <p id="author">- {author}</p>
          <div className="twitter-div">
            <a
              id="tweet-quote"
              href={`http://www.twitter.com/intent/tweet?text=${quote} - ${author}`}
              style={{ color: backgroundColor }}
            >
              <TwitterIcon />
            </a>
            <button
              onClick={() => {
                randomNumberGenerate(quotesAndAuthors.length);
                randomBG();
              }}
              style={{
                backgroundColor: backgroundColor,
                width: "100px",
              }}
              className="btn-main"
            >
              New Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
