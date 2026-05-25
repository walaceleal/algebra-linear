import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function SOR(A, b, omega = 1.25, tol = 1e-15, maxIter = 400) {
    const relatorio = criarRelatorio(Algoritmos.SOR);
    criarBloco(relatorio, 'matriz A', A);
    criarBloco(relatorio, 'vetor b', [b]);
    
    const n = A.length;
    let x = new Array(n).fill(0);
    let xOld = [...x];

    criarBloco(relatorio, 'chute inicial', [x]);


    for (let iter = 0; iter < maxIter; iter++) {

        for (let i = 0; i < n; i++) {
            let soma1 = 0;
            let soma2 = 0;

            // usa valores já atualizados
            for (let j = 0; j < i; j++) {
                soma1 += A[i][j] * x[j];
            }

            // usa valores antigos
            for (let j = i + 1; j < n; j++) {
                soma2 += A[i][j] * xOld[j];
            }

            if (A[i][i] === 0) {
                throw new Error("Pivô zero na diagonal.");
            }

            // fórmula SOR
            x[i] = (1 - omega) * xOld[i] +
                   (omega / A[i][i]) * (b[i] - soma1 - soma2);
        }

        // critério de parada
        let erro = 0;
        for (let i = 0; i < n; i++) {
            erro = Math.max(erro, Math.abs(x[i] - xOld[i]));
        }

        criarBloco(relatorio, `${iter}: atualiza x, erro=${erro.toFixed(8)}`, [xOld, x]);

        if (erro < tol) {
            console.log(`Convergiu em ${iter + 1} iterações`);
            return x;
        }

        xOld = [...x];
    }

    console.log("Número máximo de iterações atingido");
    return x;
}

export default SOR;