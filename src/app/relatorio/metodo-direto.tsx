'use client';

import Formula from '@/componentes/Formula';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import eliminacaoGauss  from '@/algoritimos/eliminacao-gaussiana';
import gaussJordan  from '@/algoritimos/gauss-jordan';
import LU  from '@/algoritimos/LU';
import {criarMatrizAumentada, duplicarMatriz, duplicarVetor} from '@/algoritimos/matriz';
import gaussSeidel from '@/algoritimos/gauss-seidel';
import jacobi from '@/algoritimos/jacobi';
import SOR from '@/algoritimos/SOR';

interface Props {
    nome: string
}

function MetodoDireto({nome}: Props){

    const malCondicionado = {
        A : [
            [0.0001, 1, 1, 1],
            [1,      1, 1, 1],
            [1,      2, 3, 4],
            [1,      3, 6,10]
        ],

        b : [
            1, 
            4,
            10, 
            20
        ]
    }

    const bemCondicionado = {
        A : [
            [10, 1, 1, 1],
            [1, 8, 1, 1],
            [1, 1, 7, 1],
            [1, 1, 1, 6]
        ],

        b : [
           14,
            14,
            14,
            14
        ]
    }


    /**/
    const {A, b} = bemCondicionado;

    const metodos = {
        'Eliminação de Gauss': () => eliminacaoGauss( 
            criarMatrizAumentada(A, b)
        ),
        'Gauss-Jordan': () => gaussJordan(
            criarMatrizAumentada(A,b)
        ),
        'LU': () => LU(
            duplicarMatriz(A), 
            duplicarVetor(b)
        ),
        'Gauss-Seidel': () => gaussSeidel(
            duplicarMatriz(A), 
            duplicarVetor(b)
        ),
        'Jacobi': () => jacobi(
            duplicarMatriz(A), 
            duplicarVetor(b)
        ),
        'SOR': () => SOR(
            duplicarMatriz(A), 
            duplicarVetor(b)
        ),
    }

    const metodoGenerico = () => [0, 1, 2]
    const solucao = (metodos[nome] ?? metodoGenerico)();

    //console.log(solucao); // [2, 3, -1]

    let latex = '';

    for(let i = 0; i < solucao.length; i++){
        latex += `${solucao[i]} \\\\`;
    }


    return <Card className='w-100 text-center'>
        <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-center'> 
                <span>{nome}</span>
                <Button>i</Button>
            </Card.Title>
            <hr className='w-100'/>
            <div className='w-100 d-flex'>
                <div className='w-100'>
                    <Formula latex={`\\( 
                        S = \\begin{pmatrix}
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

export default MetodoDireto;