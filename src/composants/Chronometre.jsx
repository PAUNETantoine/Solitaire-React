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
						setMinutes(minutes + 1);
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
			setMinutes(0);
			setSecondes(0);
		}
	}, [gagner]);

	useEffect(() => {
		if (!jeuLance) {
			setMinutes(0);
			setSecondes(0);
		}
	}, [jeuLance]);

	return (
		<div id="chronometre">
      		<p id="temps">Temps : {minutes < 10 ? `0${minutes}` : minutes}:{secondes < 10 ? `0${secondes}` : secondes}</p>
			
		</div>
	)
}

export default Chronometre;