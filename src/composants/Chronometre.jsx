/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
File : Comp Chrono
*/


import { useEffect, useRef, useState } from "react"

function Chronometre({jeuLance, gagner})
{
	const secondesRef = useRef(0);
	const minutesRef = useRef(0);

	const [secondes, setSecondes] = useState(0);
	const [minutes, setMinutes  ] = useState(0);

	useEffect(() => {
		let interval;
	
		if (jeuLance && !gagner) 
		{
		  	interval = setInterval(() => {
				secondesRef.current += 1;
	
				if (secondesRef.current > 59) 
				{
			  		secondesRef.current = 0;
			  		minutesRef.current += 1;
			  		setMinutes(minutesRef.current);
				}
	
				setSecondes(secondesRef.current);
		  	}, 1000);
		}
	
		return () => {
		  	clearInterval(interval);
		};
	  }, [jeuLance, gagner]);


	useEffect(() => {
		if (!jeuLance) 
		{
			setMinutes(0);
			setSecondes(0);
			secondesRef.current = 0;
			minutesRef.current = 0;
		}
	}, [jeuLance]);

	return (
		<div id="chronometre" className="txtZones">
      		<p id="temps">Temps : {minutes < 10 ? `0${minutes}` : minutes}:{secondes < 10 ? `0${secondes}` : secondes}</p>
		</div>
	)
}

export default Chronometre;