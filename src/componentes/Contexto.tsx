'use client';

import React, { useEffect, useState } from 'react';
import Decimal from 'decimal.js';

export interface Parametros {
    TAMANHO_MATRIZ_HILBERT: number,
    PRECISAO: number,
    NUMERO_MAX_ITERACOES: number,
    OMEGA: number;
    PRECISAO_FLOAT: number,
}

interface iContexto {
    parametros: Parametros,
    setParametros: React.Dispatch<React.SetStateAction<Parametros>>
}

//@ts-ignore
export const Contexto = React.createContext<iContexto>(null);


function ProvedorContexto(props: React.PropsWithChildren){
    const [parametros, setParametros] = useState<Parametros>({
        TAMANHO_MATRIZ_HILBERT: 15,
        PRECISAO: 1e-2,
        NUMERO_MAX_ITERACOES: 100,
        OMEGA: 0.27,
        PRECISAO_FLOAT: 22,
    });

    useEffect(()=>{
        Decimal.set({ precision: parametros.PRECISAO_FLOAT });
    }, [parametros])

    return <Contexto.Provider value={{parametros, setParametros}}>
        {props.children}
    </Contexto.Provider>
}

export default ProvedorContexto;