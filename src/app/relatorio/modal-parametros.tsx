'use client'

import { Modal } from 'react-bootstrap';


import './estilo.css';
import AjusteContexto from '@/componentes/AjusteContexto';

interface Props {
    exibir: boolean,
    setExibir: Function,
}

function ModalParametros({exibir, setExibir}: Props){
    return <Modal scrollable size='lg' show={exibir} onHide={() => setExibir(false)} className='detalhes' backdropClassName='backdrop-detalhes' backdrop="static">
        <Modal.Header closeButton>
            <Modal.Title className='d-flex align-items-center justify-content-between w-100'>
                <span>Parâmetros</span>                
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='d-flex flex-column p-4' style={{gap:50}}>
                <AjusteContexto nome='Dimensão' propriedade='TAMANHO_MATRIZ_HILBERT' min={2} max={60} step={1} />
                <AjusteContexto nome='Tolerância' propriedade='PRECISAO' min={1e-15} max={1e-2} step={1e-16} />
                <AjusteContexto nome='Max. Iterações' propriedade='NUMERO_MAX_ITERACOES' min={1} max={400} step={1}/>
                <AjusteContexto nome='ω (SOR)' propriedade='OMEGA' min={0.001} max={2.5} step={0.0001}/>
                <AjusteContexto nome='Float' propriedade='PRECISAO_FLOAT' min={0} max={128} step={1}/>
            </div>
        </Modal.Body>
    </Modal>
}

export default ModalParametros;
