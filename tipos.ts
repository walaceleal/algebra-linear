export enum Algoritmos {
    ELIMINACAO_GAUSSIANA='Eliminação de Gauss',
    GAUSS_JORDAN='Gauss-Jordan',
    LU='LU',
    GAUSS_SEIDEL='Gauss-Seidel',
    JACOBI='Jacobi',
    SOR='SOR',
}

export interface RespostaAlgoritmo {
    solucao: any[], 
    operacoes: number,
    precisao: number,
    iteracoes: number, 
    erro: number, 
    algoritmo: Algoritmos
}