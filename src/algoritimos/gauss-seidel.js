import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function gaussSeidel(A, b, tol = 1e-3, maxIter = 400) {
    const relatorio = criarRelatorio(Algoritmos.GAUSS_SEIDEL);
    criarBloco(relatorio, 'matriz A', A);
    criarBloco(relatorio, 'vetor b', [b]);

    let operacoes = 0;

    const n = A.length;
    let x = new Array(n).fill(0); // chute inicial
    let xOld = [...x];

    criarBloco(relatorio, 'chute inicial', [x]);


    for (let iter = 0; iter < maxIter; iter++) {

        // (x[i] atualizado é usado para atualizar x[i + 1])
        for (let i = 0; i < n; i++) {
            let soma = 0;

            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    soma += A[i][j] * x[j]; 
                    // usa valores já atualizados (Gauss-Seidel)
                    operacoes+= 1;
                }
            }

            if (A[i][i] === 0) {
                throw new Error("Pivô zero na diagonal.");
            }

            x[i] = (b[i] - soma) / A[i][i];
            operacoes+= 1;
        }

        // critério de parada
        let erro = 0;
        for (let i = 0; i < n; i++) {
            erro = Math.max(erro, Math.abs(x[i] - xOld[i]));
            operacoes+= 1;
        }

        criarBloco(relatorio, `${iter}: Atualiza x, erro=${erro.toFixed(5)}`, [x]);

        if (erro < tol) {
            return {x, operacoes, iteracoes: iter + 1, precisao: tol};
        }

        xOld = [...x];
    }

    
    return {x, operacoes, iteracoes: maxIter, precisao: tol};
}

export default gaussSeidel;