'use client'

import React from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import MetodoDireto from './metodo-direto';
import MetodoIterativo from './metodo-iterativo';

import './estilo.css';

interface Props {
    exibir: boolean
    setExibir: Function
}

function ModalRelatorio({exibir, setExibir}: Props){
    return <Modal dialogClassName='custom-modal-width' scrollable show={exibir} onHide={() => setExibir(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Simulação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Métodos Diretos</h5>
            <div className='d-flex' style={{gap: 15}}>
                <MetodoDireto nome='Eliminação de Gauss' />
                <MetodoDireto nome='Gauss-Jordan' />
                <MetodoDireto nome='LU' />
            </div>
            
            <hr className='w-100'/>

            <h5>Métodos Iterativos</h5>
            <div className='d-flex' style={{gap: 15}}>
                <MetodoDireto nome='Gauss-Seidel' />
                <MetodoDireto nome='Jacobi' />
                <MetodoDireto nome='SOR' />
            </div>
        </Modal.Body>
        <Modal.Footer style={{justifyContent: 'center'}}>
            <Button>Relatório escrito</Button>
            <Button target='_blank'  href='https://github.com/walaceleal/algebra-linear'>Código Fonte</Button>
        </Modal.Footer>
    </Modal>
}

export default ModalRelatorio;
