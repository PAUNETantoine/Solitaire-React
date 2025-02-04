/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
Ce composant contient tous le canva dans app et permet de dispatcher correctement les différents éléments (pile, pioche...)
*/

function CanvaFrame({handleClicDroit})
{
    return (
        <div onContextMenu={handleClicDroit}>
             <canvas className="Piles" id="canvaFrame" width={window.innerWidth - 35} height={window.innerHeight}/>
        </div>
    )
}

export default CanvaFrame;