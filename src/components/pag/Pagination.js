import React, { useState, useEffect } from "react";
import axios from "axios";
import CardPoke from "../layoutPokedex/CardPoke";
import "./pag.css";

const Pages = ({ number, pag, handlePage }) => {
    return (
        <>
            {number === pag ? (
                <span className="decoration" onClick={() => handlePage(number)}>
                    {number}
                </span>
            ) : (
                <span onClick={() => handlePage(number)}>{number}</span>
            )}
        </>
    );
};

const Item = ({ number }) => {
    const url = number.pokemon.url;
    const [poke, setPoke] = useState();

    useEffect(() => {
        const res = axios(url);
        res.then((response) => setPoke(response.data));
    }, [number, url]);

    return <>{poke && <CardPoke pokemon={poke} key={poke} />}</>;
};

function Pagination({ array, totalForPag }) {
    const [pag, setPag] = useState(1);
    const [item, setItem] = useState(1);

    const total = array.length;
    const TotalPag = Math.ceil(total / totalForPag);
    const ArrayTotalPag = [];
    const TotalItems = [];

    for (let i = 0; i < TotalPag; i++) {
        ArrayTotalPag.push(i + 1);
    }

    for (let i = 0; i < total; i++) {
        TotalItems.push(i + 1);
    }

    const handleNext = () => {
        setPag(pag - 1);
        setItem(item - totalForPag);
    };

    const handlePrevius = () => {
        setPag(pag + 1);
        setItem(item + totalForPag);
    };

    let c = item - 1;
    let d = c + totalForPag;

    const handlePage = (data) => {
        setPag(data);
        setItem(data * totalForPag - (totalForPag - 1));
    };

    let a = 0;
    let b = 0;

    if (pag >= 6) {
        a = pag - 6;
        b = pag + 4;
    }

    // if (pag >= TotalPag - 4) {
    //     a = TotalPag - 10;
    // }
    return (
        <div className="pagination">
            pagina {pag} de {TotalPag}
            <div className="pag-span">
                {pag >= 6
                    ? ArrayTotalPag.slice(a, b).map((e) => (
                          <Pages
                              key={e}
                              number={e}
                              pag={pag}
                              handlePage={handlePage}
                          />
                      ))
                    : ArrayTotalPag.slice(0, 10).map((e) => (
                          <Pages
                              key={e}
                              number={e}
                              pag={pag}
                              handlePage={handlePage}
                          />
                      ))}
            </div>
            {pag !== 1 && (
                <button className="btn-pag" onClick={() => handleNext()}>
                    ⏮️
                </button>
            )}
            {pag === TotalPag ? null : (
                <button className="btn-pag" onClick={() => handlePrevius()}>
                    ⏭️
                </button>
            )}
            <div className="flex">
                {array.slice(c, d).map((e) => (
                    <Item key={e.pokemon.name} number={e} />
                ))}
            </div>
        </div>
    );
}

export default Pagination;
