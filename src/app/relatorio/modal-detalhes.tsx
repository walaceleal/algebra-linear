'use client'

import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import MetodoDireto from './metodo-direto';
import MetodoIterativo from './metodo-iterativo';
import {blocos} from '@/algoritimos/relatorio';
import latex from '@/componentes/latex';


import './estilo.css';
import Formula from '@/componentes/Formula';
import { Algoritmos } from '../../../tipos';

interface Props {
    exibir: Algoritmos | null
    setExibir: Function
}

function ModalDetalhes({exibir, setExibir}: Props){
    const algoritmo : Algoritmos | null  = exibir;//'jacobi'//'gaussSeidel'//'LU' //'gaussJordan'//'eliminacaoGauss';

    return <Modal scrollable size='xl' show={exibir != null} onHide={() => setExibir(null)} className='detalhes' dialogClassName='custom-modal-width' backdropClassName='backdrop-detalhes' backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title>Detalhes da Simulação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>{algoritmo}</h5>

            {/*@ts-ignore*/
            blocos[algoritmo]?.map((b, i) => (<React.Fragment key={i}>
                <h6 className='text-center'>{b.titulo}</h6>
                <Formula latex={latex.renderizarMatriz(b.matriz)} />
            </React.Fragment>))}
        </Modal.Body>
    </Modal>
}

export default ModalDetalhes;
