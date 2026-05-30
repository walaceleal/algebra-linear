import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { Contexto, Parametros } from './Contexto';

interface Props {
    nome: string;
    propriedade: keyof Parametros;
    min: number;
    max: number;
    step: number;
}

function AjusteContexto({nome, propriedade, min, max, step = 1}: Props){
    const {parametros, setParametros} = React.useContext(Contexto);

    function atualizarParametro (evento: any) {

        setParametros(p => {
            p[propriedade] = +evento.target.value;

            console.log({p})
            return {...p}
        })
    }

    function f(num: string | number){
        if(+num <= 0.1)
            return (+num).toExponential(0)

        return num;
    }

    return <div className='text-center' style={{position: 'relative'}}>
        <Form.Label style={{fontSize: 14, margin: 0}}>{nome}</Form.Label>


        <div className='d-flex justify-content-between' style={{position: 'absolute', width: '100%', padding:'0 2%', bottom: -10}}>
            <Form.Label style={{fontSize: 14, margin: 0}}>{f(min)}</Form.Label>
            <Form.Label style={{fontSize: 14, margin: 0}}>{f(parametros[propriedade])}</Form.Label>
            <Form.Label style={{fontSize: 14, margin: 0}}>{f(max)}</Form.Label>
        </div>
        
        <Form.Range defaultValue={parametros[propriedade]} onMouseUp={atualizarParametro} onKeyUp={atualizarParametro}  step={step} min={min} max={max} />
    </div>
}

export default AjusteContexto;