import React, { useState, useEffect } from 'react';

const Symbol = ({ areCorrect }) => {
    const [urlIndex, setUrlIndex] = useState(0);
    const imagenes = ['checked.png', 'no.png'];

    useEffect(() => {
        setUrlIndex(areCorrect ? 1 : 0);
        console.log(imagenes[urlIndex])

    }, [areCorrect]);

    return (
        <div>
            <img src={imagenes[urlIndex]}  style={{ width: '100%', height: 'auto' }} />
        </div>
    );
};


export default Symbol;
