import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function jacobi(A, b, tol = 1e-3, maxIter = 400) {
    const relatorio = criarRelatorio(Algoritmos.JACOBI);
    criarBloco(relatorio, 'matriz A', A);
    criarBloco(relatorio, 'vetor b', [b]);

    const n = A.length;
    let x = new Array(n).fill(0);     // chute inicial
    let xNovo = new Array(n).fill(0);

    let operacoes = 0;
    criarBloco(relatorio, 'chute inicial', [x]);


    for (let iter = 0; iter < maxIter; iter++) {

        // calcula nova iteração
        for (let i = 0; i < n; i++) {
            let soma = 0;

            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    soma += A[i][j] * x[j];
                    operacoes+= 1;
                }
            }

            if (A[i][i] === 0) {
                throw new Error("Pivô zero na diagonal.");
            }

            xNovo[i] = (b[i] - soma) / A[i][i];
            operacoes+= 1;
        }


        // critério de parada
        let erro = 0;
        for (let i = 0; i < n; i++) {
            erro = Math.max(erro, Math.abs(xNovo[i] - x[i]));
            operacoes+= 1;
        }
        
        criarBloco(relatorio, `${iter}: atualiza x, erro=${erro.toFixed(5)}`, [b]);

        if (erro < tol) {
            console.log(`Convergiu em ${iter + 1} iterações`);
            return {x: xNovo, operacoes, iteracoes: iter + 1, precisao: tol};
        }

        // atualiza para próxima iteração
        x = [...xNovo];
    }

    console.log("Número máximo de iterações atingido");
    return {x, operacoes, iteracoes: maxIter, precisao: tol}
}

export default jacobi;