'use client';

import Formula from '@/componentes/Formula';
import React from 'react';
import { Button, Card } from 'react-bootstrap';


interface Props {
    nome: string
}

function MetodoIterativo({nome}: Props){
    let latex = '';

    for(let i = 1; i <= 15; i++){
        latex += `0.${i}${(3*i)%10} \\\\`;
    }


    return <Card className='w-100 text-center'>
        <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-center'> 
                <span>{nome}</span>
                <Button>i</Button>
            </Card.Title>
            <hr className='w-100'/>
            <div className='w-100 d-flex'>
                <div className='w-100 d-flex  justify-content-evenly'>
                    <Formula latex={`\\( 
                        S = \\begin{pmatrix}
                            ${latex}
                        \\end{pmatrix}
                    \\)`} />

                    <Formula latex={`\\( 
                        x_0 = \\begin{pmatrix}
                            ${latex}
                        \\end{pmatrix}
                    \\)`} />
                </div>
                <div>
                    <div>q = N^2</div>
                    <div>i = 328</div>
                    <div>e = 0.33</div>
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default MetodoIterativo;