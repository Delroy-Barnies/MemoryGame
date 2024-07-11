import '../styles/home.css'
import Game from './Game';
import { createClient } from 'pexels'
import { useEffect } from 'react';
import backgrounds from './backgrounds.json';
import Clock from './Clock';

export default function Home() {
  const date = new Date();
  const client = createClient('p5xyN9jXP0GYqtDH3Skm3nLWaPFcr2FfOwRIOd5cwgnQbpadWFVzVnE1');

  useEffect(() => {
    client.photos.show({ id: backgrounds[0].id }).then(photo => {
      document.querySelector(":root").style.backgroundImage = `url('${photo.src.large2x}')`;
    });
  }, []);

  function handleLegendButtonClick() {
    document.querySelector(".legend-section").style.display = "flex";
    document.querySelector(".home-section").style.display = "none";
  }

  function handleToStartGame() {
    document.querySelector(".game-section").style.display = "flex";
    document.querySelector(".home-section").style.display = "none";
  }

  return (
    <>
      <Game />
      <section className="home-section">
        <div className="home-content">
          <div className="home-header">
            <h1 className="home-heading">MEMORY GAME</h1>
            <h2 className="home-sub-heading">La Sélection Florale</h2>
          </div>
          <div className="home-options">
            <button className="home-start-button" onClick={handleToStartGame}>START</button>
            <button className="home-high-score-button" onClick={handleLegendButtonClick}>LEGEND</button>
          </div>
          <div className="home-footer">
            <div className="home-date-and-time">
              <div className="home-date">{date.toDateString().toUpperCase()}</div>
              <Clock />
            </div>
            <a className="home-github-link" href="https://github.com/Delroy-Barnies/MemoryGame">GITHUB REPOSITORY</a>
          </div>
        </div>
      </section>
    </>
  )
}
