'use client';

import Formula from '@/componentes/Formula';
import React from 'react';
import { Button, Card } from 'react-bootstrap';
import eliminacaoGauss  from '@/algoritimos/eliminacao-gaussiana';
import gaussJordan  from '@/algoritimos/gauss-jordan';
import LU  from '@/algoritimos/LU';
import {criarMatrizAumentada, duplicarMatriz, duplicarVetor, criarMatrizHilbert, raioEspectral} from '@/algoritimos/matriz';
import gaussSeidel from '@/algoritimos/gauss-seidel';
import jacobi from '@/algoritimos/jacobi';
import SOR from '@/algoritimos/SOR';
import { Algoritmos } from '../../../tipos';

interface Props {
    algoritmo: Algoritmos,
    setExibirDetalhes: Function
}

function MetodoDireto({algoritmo, setExibirDetalhes}: Props){
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

    const xHilbert = Array(20).fill(1);
    const matrizHilbert = criarMatrizHilbert(xHilbert);

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
    const {A, b} = matrizHilbert;

    //console.log(raioEspectral, raioEspectral(A));

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
    const solucao = (metodos[algoritmo] ?? metodoGenerico)();

    let latex = '';

    for(let i = 0; i < solucao.length; i++){
        latex += `${solucao[i]} \\\\`;
    }


    return <Card className='w-100 text-center'>
        <Card.Body>
            <Card.Title className='d-flex justify-content-between align-items-center'> 
                <span>{algoritmo}</span>
                <Button onClick={() => setExibirDetalhes(algoritmo)}>i</Button>
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