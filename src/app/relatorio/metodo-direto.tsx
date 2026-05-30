'use client';

import Formula from '@/componentes/Formula';
import React, { useContext } from 'react';
import { Button, Card } from 'react-bootstrap';
import eliminacaoGauss  from '@/algoritimos/eliminacao-gaussiana';
import gaussJordan  from '@/algoritimos/gauss-jordan';
import LU  from '@/algoritimos/LU';
import {criarMatrizAumentada, duplicarMatriz, duplicarVetor, criarMatrizHilbert, calcularErro} from '@/algoritimos/matriz';
import gaussSeidel from '@/algoritimos/gauss-seidel';
import jacobi from '@/algoritimos/jacobi';
import SOR from '@/algoritimos/SOR';
import { Algoritmos } from '../../../tipos';
import { TbSum } from "react-icons/tb";
import { MdErrorOutline } from "react-icons/md";
import { SlLoop } from "react-icons/sl";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { Contexto } from '@/componentes/Contexto';
import { executarMetodo } from '@/algoritimos';



interface Props {
    algoritmo: Algoritmos,
    setExibirDetalhes: Function
}

function MetodoDireto({algoritmo, setExibirDetalhes}: Props){
    const {parametros} = useContext(Contexto);

    const {solucao, operacoes, precisao, iteracoes, erro} = executarMetodo({ ...parametros, algoritmo,  });


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
                <div className='d-flex flex-column align-items-start' style={{minWidth: 75, gap: 1}}>
                    <div>
                        <TbSum fontSize={20} color='red' style={{transform: 'translateY(-2px)', marginRight: 5}} />
                        <span>{operacoes}</span>
                    </div>
                    <div>
                        <MdErrorOutline fontSize={20} color='red' style={{transform: 'translateY(-1px)', marginRight: 5}} />
                        <span>{erro > 1000 ? '∞' : erro.toFixed(2)}</span>
                    </div>
                    {precisao != null && <div>
                            <IoMdCheckmarkCircleOutline fontSize={20} style={{transform: 'translateY(-1px)', marginRight: 5}} />
                            <span>{ Number.isNaN(+precisao) ? precisao : (+precisao).toExponential(0)}</span>
                        </div>
                    }

                    {iteracoes != null && <div>
                            <SlLoop  fontSize={20} style={{transform: 'translateY(-1px)', marginRight: 5}} />
                            <span>{iteracoes}</span>
                        </div>
                    }
                </div>
            </div>
        </Card.Body>
    </Card>
}

export default MetodoDireto;