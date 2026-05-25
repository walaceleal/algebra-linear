'use client'

import React, { useContext, useEffect } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import MetodoDireto from './metodo-direto';
import MetodoIterativo from './metodo-iterativo';

import {Algoritmos}  from "../../../tipos";

import './estilo.css';
import { Contexto } from '@/componentes/Contexto';

interface Props {
    exibir: boolean,
    setExibir: Function,
    setExibirDetalhes: Function,
}

function ModalRelatorio({exibir, setExibir, setExibirDetalhes}: Props){
    const {parametros, setParametros} = useContext(Contexto);

    return <Modal dialogClassName='custom-modal-width' scrollable show={exibir} onHide={() => setExibir(false)}>
        <Modal.Header closeButton>
            <Modal.Title className='d-flex align-items-center justify-content-between w-100'>
                <span>Simulação</span>
                
                {/*<span>
                    <div className='d-flex mx-5' style={{gap: 10}}>
                        <span>Dimensão Matriz:</span>
                        <Button onClick={() => setParametros(p => ({...p, TAMANHO_MATRIZ_HILBERT: 2}))}>2</Button>
                        <Button onClick={() => setParametros(p => ({...p, TAMANHO_MATRIZ_HILBERT: 4}))}>4</Button>
                        <Button onClick={() => setParametros(p => ({...p, TAMANHO_MATRIZ_HILBERT: 8}))}>8</Button>
                        <Button onClick={() => setParametros(p => ({...p, TAMANHO_MATRIZ_HILBERT: 16}))}>16</Button>
                    </div>
                    <div className='d-flex mx-5 mt-3' style={{gap: 10}}>
                        <span>Precisao:</span>
                        <Button onClick={() => setParametros(p => ({...p, PRECISAO: 1e-2}))}>1e-2</Button>
                        <Button onClick={() => setParametros(p => ({...p, PRECISAO: 1e-4}))}>1e-4</Button>
                        <Button onClick={() => setParametros(p => ({...p, PRECISAO: 1e-8}))}>1e-8</Button>
                        <Button onClick={() => setParametros(p => ({...p, PRECISAO: 1e-16}))}>1e-16</Button>
                    </div>
                    <div className='d-flex mx-5 mt-3' style={{gap: 10}}>
                        <span>Iterações:</span>
                        <Button onClick={() => setParametros(p => ({...p, NUMERO_MAX_ITERACOES: 100}))}>100</Button>
                        <Button onClick={() => setParametros(p => ({...p, NUMERO_MAX_ITERACOES: 200}))}>200</Button>
                        <Button onClick={() => setParametros(p => ({...p, NUMERO_MAX_ITERACOES: 400}))}>400</Button>
                        <Button onClick={() => setParametros(p => ({...p, NUMERO_MAX_ITERACOES: 800}))}>800</Button>
                    </div>

                    
                </span>*/}
                <div className='d-flex' style={{gap:10}}>
                    <div className='text-center'><Form.Label style={{fontSize: 14, margin: 0}}>Dimensão</Form.Label><Form.Range step={1} min={0} max={5} /></div>
                    <div className='text-center'><Form.Label style={{fontSize: 14, margin: 0}}>Precisão</Form.Label><Form.Range step={1} min={0} max={5} /></div>
                    <div className='text-center'><Form.Label style={{fontSize: 14, margin: 0}}>Iterações</Form.Label><Form.Range step={1} min={0} max={5} /></div>
                    <div className='text-center'><Form.Label style={{fontSize: 14, margin: 0}}>ω</Form.Label><Form.Range step={1} min={0} max={5} /></div>
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
