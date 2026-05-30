import eliminacaoGauss from "./eliminacao-gaussiana";
import gaussJordan from "./gauss-jordan";
import gaussSeidel from "./gauss-seidel";
import jacobi from "./jacobi";
import { calcularErro, criarMatrizAumentada, criarMatrizHilbert, duplicarMatriz, duplicarVetor } from "./matriz";
import SOR from "./SOR";
import LU from './LU';
import { Algoritmos, RespostaAlgoritmo } from "../../tipos";

interface Params {
    algoritmo: Algoritmos, 
    TAMANHO_MATRIZ_HILBERT: number, 
    PRECISAO?: number, 
    NUMERO_MAX_ITERACOES?: number, 
    OMEGA?: number
}

export function executarMetodo({algoritmo, TAMANHO_MATRIZ_HILBERT, PRECISAO = 0, NUMERO_MAX_ITERACOES = 0, OMEGA = 0}: Params) : RespostaAlgoritmo{
    const xHilbert = Array(TAMANHO_MATRIZ_HILBERT).fill(1);
    const matrizHilbert = criarMatrizHilbert(xHilbert);

    const {A, b} = matrizHilbert;

    const metodos = {
        'Eliminação de Gauss': () => eliminacaoGauss( 
            criarMatrizAumentada(A, b)
        ),
        'Gauss-Jordan': () => gaussJordan(
            criarMatrizAumentada(A,b)
        ),
        'LU': () => LU(
            duplicarMatriz(A), 
            duplicarVetor(b)
        ),
        'Gauss-Seidel': () => gaussSeidel(
            duplicarMatriz(A), 
            duplicarVetor(b),
            PRECISAO,
            NUMERO_MAX_ITERACOES
        ),
        'Jacobi': () => jacobi(
            duplicarMatriz(A), 
            duplicarVetor(b),
            PRECISAO,
            NUMERO_MAX_ITERACOES
        ),
        'SOR': () => SOR(
            duplicarMatriz(A), 
            duplicarVetor(b),
            1.05,
            PRECISAO,
            NUMERO_MAX_ITERACOES
        ),
    }

    let solucao = metodos[algoritmo]();
    const operacoes = solucao.operacoes || 0;
    const iteracoes = solucao.iteracoes || 1;
    const precisao = solucao.precisao || '∞';

    solucao = solucao.x || solucao;

    let erro = calcularErro(solucao, xHilbert);

    return {solucao, operacoes, precisao, iteracoes, erro, algoritmo}
}