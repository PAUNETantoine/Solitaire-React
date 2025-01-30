function StartGame({handleGameStart})
{
    return (
        <div id="zoneLancementJeu" className="zoneLancementJeu">
            <h1>Solitaire-React</h1>
            <button onClick={handleGameStart}><img src={process.env.PUBLIC_URL + '/images/play.png'}></img></button>
            <h3>Par Antoine PAUNET</h3>
        </div>
    )
}

export default StartGame;