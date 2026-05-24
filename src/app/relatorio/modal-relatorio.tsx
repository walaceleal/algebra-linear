'use client'

import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import MetodoDireto from './metodo-direto';
import MetodoIterativo from './metodo-iterativo';

import {Algoritmos}  from "../../../tipos";

import './estilo.css';

interface Props {
    exibir: boolean,
    setExibir: Function,
    setExibirDetalhes: Function,
}

function ModalRelatorio({exibir, setExibir, setExibirDetalhes}: Props){
    return <Modal dialogClassName='custom-modal-width' scrollable show={exibir} onHide={() => setExibir(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Simulação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Métodos Diretos</h5>
            <div className='d-flex' style={{gap: 15}}>
                <MetodoDireto algoritmo={Algoritmos.ELIMINACAO_GAUSSIANA} setExibirDetalhes={setExibirDetalhes}/>
                <MetodoDireto algoritmo={Algoritmos.GAUSS_JORDAN}  setExibirDetalhes={setExibirDetalhes}/>
                <MetodoDireto algoritmo={Algoritmos.LU} setExibirDetalhes={setExibirDetalhes}/>
            </div>
            
            <hr className='w-100'/>

            <h5>Métodos Iterativos</h5>
            <div className='d-flex' style={{gap: 15}}>
                <MetodoDireto algoritmo={Algoritmos.GAUSS_SEIDEL} setExibirDetalhes={setExibirDetalhes}/>
                <MetodoDireto algoritmo={Algoritmos.JACOBI}  setExibirDetalhes={setExibirDetalhes}/>
                <MetodoDireto algoritmo={Algoritmos.SOR}  setExibirDetalhes={setExibirDetalhes}/>
            </div>
        </Modal.Body>
        <Modal.Footer style={{justifyContent: 'center'}}>
            <Button>Relatório escrito</Button>
            <Button target='_blank'  href='https://github.com/walaceleal/algebra-linear'>Código Fonte</Button>
        </Modal.Footer>
    </Modal>
}

export default ModalRelatorio;
