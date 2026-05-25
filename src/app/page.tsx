'use client'

import React, { useState } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import ModalRelatorio from './relatorio/modal-relatorio';
import ModalDetalhes from './relatorio/modal-detalhes';
import ProvedorContexto from '@/componentes/Contexto';

type Props = React.PropsWithChildren & {

}

function PaginaRelatorio(props: Props){
    const [exibirModal, setExibirModal] = useState(false);
    const [exibirDetalhes, setExibirDetalhes] = useState(null);

    function iniciarAnalise(){
        setExibirModal(true);
    }

    return <ProvedorContexto>
        <div style={{padding: 30}}>
            <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                <div>RELATORIO 1 DE ALGEBRA LINEAR COMPUTACIONAL</div>
                <div>data de entrega: até 04-06-2026</div>
            </div>

            <div>
                Considere um sistema linear de ordem 15 que tem a matriz de Hilbert como matriz dos coeficientes e que
                a solução exata seja o vetor que possui todas as componentes iguais a 1. Resolva o sistema linear usando
                os seguintes m ́etodos:
                <ul style={{padding: "10px 30px"}}>
                    <li>Eliminação de Gauss</li>
                    <li>Gauss-Jordan</li>
                    <li>LU</li>
                    <li>Gauss-Seidel</li>
                    <li>Jacobi</li>
                    <li>SOR</li>
                </ul>
            </div>

            <div>
                <div>Considerações:</div>
                <ol style={{padding: '10px 30px'}}>
                    <li>Utilize tipos diferentes ( int, float, double) e fa ̧ca uma an ́alise dos erros de arredondamento na
            solução encontrada</li>
                    <li>Compare as soluções num ́ericas e diga qual  ́e o m ́etodo mais indicado dentre os 6 m ́etodos para
            resolver este tipo de sistema</li>
                    <li>Matriz de Hilbert:</li>
                </ol>

                <div style={{padding: '0px 40px'}}>
                    hij = 1 i + j − 1, i = 1, · · · , n; j = 1, · · · , n
                </div>
            </div>

            <hr className='w-100 mt-5' />
            <div className='d-flex justify-content-center w-100 p-3'>
                <Button variant='primary' onClick={iniciarAnalise}>Resolver Sistema</Button>
            </div>


            <ModalRelatorio exibir={exibirModal} setExibir={setExibirModal} setExibirDetalhes={setExibirDetalhes}/>
            <ModalDetalhes exibir={exibirDetalhes} setExibir={setExibirDetalhes}/>
        </div>
    </ProvedorContexto>
}

export default PaginaRelatorio;