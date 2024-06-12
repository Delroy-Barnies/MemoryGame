import '../styles/game.css'
import { createClient } from 'pexels'
import { useState } from 'react';
import { uniqueId } from 'lodash';
import stages from './stages.json';
import legend from './legend.json';
import Legend from './Legend';
import backgrounds from './backgrounds.json';

export default function Game() {
    const [currentBoard, setCurrentBoard] = useState(stages[0]);
    const [currentStage, setCurrentStage] = useState(0);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [level, setLevel] = useState(1);
    const client = createClient('p5xyN9jXP0GYqtDH3Skm3nLWaPFcr2FfOwRIOd5cwgnQbpadWFVzVnE1');

    function Flower(props) {
        const [img, setImg] = useState();
        client.photos.show({ id: props.id }).then(photo => {
            props.size === "original" ? setImg(photo.src.original) : setImg(photo.src.large);
        });
        return (
            <img id={props.id} src={img} className={props.className} />
        )
    }

    function changeBackground(num) {
        client.photos.show({ id: backgrounds[num].id }).then(photo => {
            document.querySelector(":root").style.backgroundImage = `url('${photo.src.large2x}')`;
        });
    }

    function handleMoveClick(e) {
        let isGameOver = false;
        currentBoard.forEach(flower => {
            if (flower.id.toString() === e.target.id) {
                legend.forEach(legendFlower => {
                    if (legendFlower.id === flower.id) legendFlower.clicked = true;
                });
                if (flower.clicked) isGameOver = true;
                else flower.clicked = true;
            };
        });
        if (isGameOver) {
            resetGame();
        } else {
            if (isNextStage(currentBoard)) changeStage();
            let newBoard = currentBoard.slice();
            newBoard = newBoard.sort(() => Math.random() - 0.5);
            const newScore = score + 1;
            const newLevel = level >= 5 ? 1 : level + 1;
            const newBestScore = newScore > bestScore ? newScore : bestScore;
            setBestScore(newBestScore);
            setLevel(newLevel);
            setScore(newScore);
            setCurrentBoard(newBoard);
        }
    }

    function resetGame() {
        const newBestScore = score > bestScore ? score : bestScore;
        changeBackground(0);
        resetStages();
        setBestScore(newBestScore);
        setLevel(1);
        setScore(0);
        setCurrentBoard(stages[0]);
        setCurrentStage(0);
    }

    function resetStages() {
        stages.forEach(stage => {
            stage.forEach(level => {
                level.clicked = false;
            });
        });
    }

    function changeStage() {
        if (currentStage < 3) {
            const newStageIndex = currentStage + 1;
            currentBoard.length = 0;
            let newBoard = currentBoard;
            stages[newStageIndex].forEach(flower => { newBoard.push(flower); })
            changeBackground(newStageIndex);
            setCurrentBoard(newBoard);
            setCurrentStage(newStageIndex);
        }
    }

    function isNextStage(flowers) {
        let isDone = true;
        flowers.forEach(flower => {
            if (flower.clicked === false) isDone = false;
        });
        return isDone;
    }

    function getProgress() {
        return ((100 * bestScore) / 20).toString() + "%";
    }

    function handleHomeClick() {
        document.querySelector(".game-section").style.display = "none";
        document.querySelector(".home-section").style.display = "grid";
    }

    function handleLegendClick() {
        document.querySelector(".legend-section").style.display = "flex";
        document.querySelector(".game-section").style.display = "none";
    }

    return (
        <>
            <section className="game-section">
                <h1 className="game-heading">Memory Game | Floral</h1>
                <div className="game-grid">
                    {currentBoard.map((flower) => {
                        return flower ? <div className="game-grid-item" key={uniqueId()}>
                            <div id={flower.id} className="game-card" onClick={handleMoveClick} >
                                <Flower id={flower.id} className="game-flower-img" />
                                <p id={flower.id} className="game-flower-title">{flower.title}</p>
                            </div>
                        </div> : null;
                    })
                    }
                </div >
                <div className="game-stats">
                    <div className="game-score-container">
                        <h2 className="game-score">Score : {score}</h2>
                        <h2 className="game-score">Best Score : {bestScore}</h2>
                    </div>
                    <div className="game-level-container">
                        <h2 className="game-level">level : {level}/5</h2>
                        <h2 className="game-level">Stage : {currentStage + 1}/5</h2>
                    </div>
                    <div className="game-buttons">
                        <button className="game-home-button" onClick={handleHomeClick}>Home</button>
                        <button className="game-legend-button" onClick={handleLegendClick}>Legend</button>
                    </div>
                </div>
            </section>
            <Legend progress={getProgress()} flowersFound={legend} />
        </>
    )
}
