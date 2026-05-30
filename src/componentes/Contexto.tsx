'use client';

import React, { useState } from 'react';

export interface Parametros {
    TAMANHO_MATRIZ_HILBERT: number,
    PRECISAO: number,
    NUMERO_MAX_ITERACOES: number,
    OMEGA: number
}

interface iContexto {
    parametros: Parametros,
    setParametros: React.Dispatch<React.SetStateAction<Parametros>>
}

//@ts-ignore
export const Contexto = React.createContext<iContexto>(null);


function ProvedorContexto(props: React.PropsWithChildren){
    const [parametros, setParametros] = useState<Parametros>({
        TAMANHO_MATRIZ_HILBERT: 2,
        PRECISAO: 1e-2,
        NUMERO_MAX_ITERACOES: 100,
        OMEGA: 1.5
    });

    return <Contexto.Provider value={{parametros, setParametros}}>
        {props.children}
    </Contexto.Provider>
}

export default ProvedorContexto;