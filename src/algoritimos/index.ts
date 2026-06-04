import eliminacaoGauss from "./eliminacao-gaussiana";
import gaussJordan from "./gauss-jordan";
import gaussSeidel from "./gauss-seidel";
import jacobi from "./jacobi";
import { calcularErro, criarMatrizAumentada, criarMatrizHilbert, duplicarMatriz, duplicarVetor } from "./matriz";
import SOR from "./SOR";
import LU from './LU';
import { Algoritmos, RespostaAlgoritmo } from "../../tipos";
import Decimal from "decimal.js";

interface Params {
    algoritmo: Algoritmos, 
    TAMANHO_MATRIZ_HILBERT: number, 
    PRECISAO?: number, 
    NUMERO_MAX_ITERACOES?: number, 
    OMEGA?: number;
    PRECISAO_FLOAT: number
}

export function executarMetodo({algoritmo, TAMANHO_MATRIZ_HILBERT, PRECISAO = 0, NUMERO_MAX_ITERACOES = 0, OMEGA = 0, PRECISAO_FLOAT = 0}: Params) : RespostaAlgoritmo{
    if(Decimal.precision !== PRECISAO_FLOAT){
        Decimal.set({precision: PRECISAO_FLOAT})
    }

    const xHilbert = Array(TAMANHO_MATRIZ_HILBERT).fill(1);
    const matrizHilbert = criarMatrizHilbert(xHilbert);

    const {A, b} = matrizHilbert;

    const metodos = {
        'Eliminação de Gauss': () => eliminacaoGauss( 
            criarMatrizAumentada(A, b),
            true
        ),
        'Gauss-Jordan': () => gaussJordan(
            criarMatrizAumentada(A,b),
            true
        ),
        'LU': () => LU(
            duplicarMatriz(A), 
            duplicarVetor(b),
            true
        ),
        'Gauss-Seidel': () => gaussSeidel(
            duplicarMatriz(A), 
            duplicarVetor(b),
            PRECISAO,
            NUMERO_MAX_ITERACOES,
            true
        ),
        'Jacobi': () => jacobi(
            duplicarMatriz(A), 
            duplicarVetor(b),
            PRECISAO,
            NUMERO_MAX_ITERACOES,
            true
        ),
        'SOR': () => SOR(
            duplicarMatriz(A), 
            duplicarVetor(b),
            OMEGA,
            PRECISAO,
            NUMERO_MAX_ITERACOES,
            true
        ),
    }

    let inicio = performance.now();
    let solucao = metodos[algoritmo]();
    let tempo = performance.now() - inicio;

    const operacoes = solucao.operacoes;
    const iteracoes = solucao.iteracoes || 1;
    const precisao = solucao.precisao || '∞';

    solucao = solucao.x || solucao;

    let erro = calcularErro(solucao, xHilbert);

    return {solucao, operacoes, precisao, iteracoes, erro, algoritmo, tempo}
}