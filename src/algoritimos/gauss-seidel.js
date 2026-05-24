import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function gaussSeidel(A, b, tol = 1e-15, maxIter = 100) {
    const relatorio = criarRelatorio(Algoritmos.GAUSS_SEIDEL);
    criarBloco(relatorio, 'matriz A', A);
    criarBloco(relatorio, 'vetor b', [b]);

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
                }
            }

            if (A[i][i] === 0) {
                throw new Error("Pivô zero na diagonal.");
            }

            x[i] = (b[i] - soma) / A[i][i];
        }

        // critério de parada
        let erro = 0;
        for (let i = 0; i < n; i++) {
            erro = Math.max(erro, Math.abs(x[i] - xOld[i]));
        }

        criarBloco(relatorio, `${iter}: Atualiza x, erro=${erro.toFixed(5)}`, [x]);

        if (erro < tol) {
            console.log(`Convergiu em ${iter + 1} iterações`);
            return x;
        }

        xOld = [...x];
    }

    console.log("Número máximo de iterações atingido");
    console.log("x", x)
    return x;
}

export default gaussSeidel;