/*
@author : Antoine PAUNET
Version : 1.0
Date    : 04/02/25
--------------------
File : Comp Chrono
*/


import { useEffect, useRef, useState } from "react"

function Chronometre({partieLance, gagner})
{
    const secondesRef = useRef(0);
    const minutesRef = useRef(0);
    const intervalRef = useRef(null);

	const [secondes, setSecondes] = useState(0);
	const [minutes, setMinutes  ] = useState(0);

	useEffect(() => {
        if (partieLance && !gagner) {
            // Réinitialiser le chrono au début d'une nouvelle partie
            secondesRef.current = 0;
            minutesRef.current = 0;
            setSecondes(0);
            setMinutes(0);

            intervalRef.current = setInterval(() => {
                secondesRef.current += 1;

                if (secondesRef.current > 59) {
                    secondesRef.current = 0;
                    minutesRef.current += 1;
                    setMinutes(minutesRef.current);
                }

                setSecondes(secondesRef.current);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [partieLance, gagner]); // Se déclenche à chaque changement de partieLance ou gagner


	return (
		<div id="chronometre" className="txtZones">
      		<p id="temps">Temps : {minutes < 10 ? `0${minutes}` : minutes}:{secondes < 10 ? `0${secondes}` : secondes}</p>
		</div>
	)
}

export default Chronometre;