import '../styles/legend.css';
import { createClient } from 'pexels'
import { useEffect } from 'react';
import { useState } from 'react';
import legend from './legend.json';

export default function Legend(props) {
    const [flower, setFlower] = useState(legend[0]);
    const client = createClient('p5xyN9jXP0GYqtDH3Skm3nLWaPFcr2FfOwRIOd5cwgnQbpadWFVzVnE1');
    
    const root = document.querySelector(":root");
    root.style.setProperty("--progress", props.progress);

    function Flower(props) {
        const [img, setImg] = useState();
        useEffect(() => {
            client.photos.show({ id: props.id }).then(photo => {
                props.size === "original" ? setImg(photo.src.original) : setImg(photo.src.large);
            });
        }, [props.id]);
        return (
            <img id={props.id} src={img} className={props.className} />
        )
    }

    function handleFlowerClick(e) {
        document.querySelector(".legend-section").style.display = "none";
        document.querySelector(".flower-info-card").style.display = "grid";
        legend.forEach(flower => {
            if (flower.id.toString() === e.target.id) {
                client.photos.show({ id: flower.id }).then(photo => {
                    document.querySelector(".flower-info-img-container").style.backgroundImage = `url('${photo.src.large}')`;
                });
                setFlower(flower)
            };
        });
    }

    function handleReturnButtonClick(e) {
        document.querySelector(".legend-section").style.display = "flex";
        document.querySelector(".flower-info-card").style.display = "none";
    }

    function handleHomeClick() {
        document.querySelector(".legend-section").style.display = "none";
        document.querySelector(".home-section").style.display = "grid";
    }

    function handleGameClick() {
        document.querySelector(".legend-section").style.display = "none";
        document.querySelector(".game-section").style.display = "flex";
    }

    return (
        <>
            <section className="legend-section">

                <div className="legend-grid">
                    {props.flowersFound.map((flower) => {
                        if (flower.clicked) {
                            return flower ? <div id={flower.id} key={flower.id} className="legend-grid-item" onClick={handleFlowerClick}>
                                <Flower id={flower.id} className="legend-flower-img" />
                                <p id={flower.id} className="legend-flower-title">{flower.title}</p>
                            </div> : null;
                        } else {
                            return flower ? <div id={flower.id} key={flower.id} /> : null;
                        }
                    })
                    }
                </div >

                <div className="legend-progress">
                    <div className="legend-progress-header">
                        <h3 className="legend-progress-heading">Progress</h3>
                        <div className="legend-buttons">
                            <button className="legend-home-button" onClick={handleHomeClick} >Home</button>
                            <button className="legend-game-button" onClick={handleGameClick} >Game</button>
                        </div>
                    </div>
                    <div className="legend-progress-container">
                        <div className="legend-progress-bar"></div>
                    </div>
                </div>
            </section>

            <div className="flower-info-card">
                <div className="flower-main-container">
                    <h1 className="flower-main-heading">{flower.title.toUpperCase()}</h1>
                    <h2 className="flower-main-sub-heading">{flower.genus}</h2>
                    <div className="flower-main">
                        <p className="flower-main-info">
                            {flower.description}
                        </p>
                        <p className="flower-main-info">
                            {flower.apperance}
                        </p>
                    </div>
                    <a href={flower.source.link}>{flower.source.name}, {flower.title}</a>
                    <button className="legend-return-button" onClick={handleReturnButtonClick}>Return</button>
                </div>
                <div className="flower-info-img-container"></div>
            </div>
        </>
    )
}
