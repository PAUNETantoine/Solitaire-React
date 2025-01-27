/*
@author : Antoine PAUNET
Version : 0.9 Beta
Date    : 27/01/25
--------------------
File : Comp Chrono
*/


import { useEffect, useState } from "react"

function Chronometre({jeuLance, gagner})
{
	const [secondes, setSecondes] = useState(0);
	const [minutes, setMinutes  ] = useState(0);

	useEffect(() => {
		let interval;
		
		if (jeuLance && !gagner) 
		{
		  	interval = setInterval(() => {
				setSecondes(prevSecondes => {
			  		if (prevSecondes === 59) 
					{
						setMinutes(prevMinutes => prevMinutes + 1);
						return 0;
			  		}
			  		return prevSecondes + 1;
				});
		  	}, 1000);
		}
	
		return () => {
		  clearInterval(interval);
		};
	}, [jeuLance, gagner]);
	
	  useEffect(() => {
		if (gagner) {
		  	console.log("Chronomètre terminé !");
		}
	}, [gagner]);

	return (
		<div id="chronometre">
      		<p>Temps : {minutes < 10 ? `0${minutes}` : minutes}:{secondes < 10 ? `0${secondes}` : secondes}</p>
			
		</div>
	)
}

export default Chronometre;