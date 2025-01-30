/*Ce composant contient tous le canva dans app et permet de dispatcher correctement les différents éléments*/
function CanvaFrame({handleClicDroit})
{
    return (
        <div onContextMenu={handleClicDroit}>
             <canvas className="Piles" id="canvaFrame" width={window.innerWidth - 25} height={window.innerHeight}/>
        </div>
    )
}

export default CanvaFrame;