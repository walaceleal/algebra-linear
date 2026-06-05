'use client'

import { Button, Modal } from 'react-bootstrap';
import MetodoNumerico from './metodo-numerico';

import {Algoritmos}  from "../../../tipos";
import { GiSettingsKnobs } from "react-icons/gi";


import './estilo.css';
import AjusteContexto from '@/componentes/AjusteContexto';
import { CiSettings } from 'react-icons/ci';

interface Props {
    exibir: boolean,
    setExibir: Function,
    setExibirDetalhes: Function,
    setExibirParametros: Function
}

function ModalRelatorio({exibir, setExibir, setExibirDetalhes, setExibirParametros}: Props){

    return <Modal dialogClassName='custom-modal-width' scrollable show={exibir} onHide={() => setExibir(false)}>
        <Modal.Header closeButton>
            <Modal.Title className=''>
                <span>Simulação</span>

                <Button onClick={()=> setExibirParametros(true)}  style={{padding: 0, marginLeft: 15}}>
                    <CiSettings size={30} />              
                </Button>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h5>Métodos Diretos</h5>
            <div className='d-flex' style={{gap: 15, flexWrap: 'wrap'}}>
                <MetodoNumerico algoritmo={Algoritmos.ELIMINACAO_GAUSSIANA} setExibirDetalhes={setExibirDetalhes}/>
                <MetodoNumerico algoritmo={Algoritmos.GAUSS_JORDAN}  setExibirDetalhes={setExibirDetalhes}/>
                <MetodoNumerico algoritmo={Algoritmos.LU} setExibirDetalhes={setExibirDetalhes}/>
            </div>
            
            <hr className='w-100'/>

            <h5>Métodos Iterativos</h5>
            <div className='d-flex' style={{gap: 15, flexWrap: 'wrap'}}>
                <MetodoNumerico algoritmo={Algoritmos.GAUSS_SEIDEL} setExibirDetalhes={setExibirDetalhes}/>
                <MetodoNumerico algoritmo={Algoritmos.JACOBI}  setExibirDetalhes={setExibirDetalhes}/>
                <MetodoNumerico algoritmo={Algoritmos.SOR}  setExibirDetalhes={setExibirDetalhes}/>
            </div>
        </Modal.Body>
        <Modal.Footer style={{justifyContent: 'center'}}>
            <Button target='_blank'  href='/relatorio.pdf'>Relatório escrito</Button>
            <Button target='_blank'  href='https://github.com/walaceleal/algebra-linear'>Código Fonte</Button>
        </Modal.Footer>
    </Modal>
}

export default ModalRelatorio;
