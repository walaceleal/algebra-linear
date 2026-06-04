'use client'

import { Button, Modal } from 'react-bootstrap';
import MetodoDireto from './metodo-direto';

import {Algoritmos}  from "../../../tipos";

import './estilo.css';
import AjusteContexto from '@/componentes/AjusteContexto';

interface Props {
    exibir: boolean,
    setExibir: Function,
    setExibirDetalhes: Function,
}

function ModalRelatorio({exibir, setExibir, setExibirDetalhes}: Props){

    return <Modal dialogClassName='custom-modal-width' scrollable show={exibir} onHide={() => setExibir(false)}>
        <Modal.Header closeButton>
            <Modal.Title className='d-flex align-items-center justify-content-between w-100'>
                <span>Simulação</span>
                
                <div className='d-flex' style={{gap:10}}>
                    <AjusteContexto nome='Dimensão' propriedade='TAMANHO_MATRIZ_HILBERT' min={2} max={60} step={1} />
                    <AjusteContexto nome='Tolerância' propriedade='PRECISAO' min={1e-15} max={1e-2} step={1e-16} />
                    <AjusteContexto nome='Max. Iterações' propriedade='NUMERO_MAX_ITERACOES' min={1} max={400} step={1}/>
                    <AjusteContexto nome='w' propriedade='OMEGA' min={0.001} max={2.5} step={0.0001}/>
                    <AjusteContexto nome='Float' propriedade='PRECISAO_FLOAT' min={0} max={128} step={1}/>
                </div>
                <div></div>
            </Modal.Title>
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
