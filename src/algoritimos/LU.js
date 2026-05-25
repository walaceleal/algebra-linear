import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function decomposicaoLU(A, b) {
    const n = A.length;

    const relatorio = criarRelatorio(Algoritmos.LU);
    criarBloco(relatorio, "matriz A", A);
    criarBloco(relatorio, "vetor b", [b]);

    let operacoes = 0;

    // Inicializa L e U
    const L = Array.from({ length: n }, () => Array(n).fill(0));
    const U = Array.from({ length: n }, () => Array(n).fill(0));

    // Doolittle
    for (let i = 0; i < n; i++) {

        // Construção de U
        for (let k = i; k < n; k++) {
            let soma = 0;
            for (let j = 0; j < i; j++) {
                soma += L[i][j] * U[j][k];
                operacoes+= 1;
            }
            U[i][k] = A[i][k] - soma;
            operacoes+= 1;
        }

        criarBloco(relatorio, `calcula os elementos da ${i + 1}ª linha de U`, U);


        // Construção de L
        L[i][i] = 1;

        for (let k = i + 1; k < n; k++) {
            let soma = 0;
            for (let j = 0; j < i; j++) {
                soma += L[k][j] * U[j][i];
                operacoes+= 1;
            }

            if (U[i][i] === 0) {
                throw new Error("Pivô zero encontrado.");
            }

            L[k][i] = (A[k][i] - soma) / U[i][i];
            operacoes+= 1;
        }

        criarBloco(relatorio, `calcula os elementos da ${i + 1}ª coluna de L`, L);
    }

    // Resolve Ly = b (substituição direta)
    const y = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        let soma = 0;
        for (let j = 0; j < i; j++) {
            soma += L[i][j] * y[j];
            operacoes+= 1;
        }
        y[i] = b[i] - soma;
        operacoes+= 1;

        criarBloco(relatorio, `substituição direta da ${i + 1}ª componente de y: Sistema (Ly = b)`, [y]);
    }


    // Resolve Ux = y (retrosubstituição)
    const x = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let soma = 0;
        for (let j = i + 1; j < n; j++) {
            soma += U[i][j] * x[j];
            operacoes+= 1;
        }
        x[i] = (y[i] - soma) / U[i][i];
        operacoes+= 1;

        criarBloco(relatorio, `retrosubstituição da ${i + 1}ª componente de x: Sistema (Ux = y)`, [x]);
    }

    //return { L, U, x };
    return {x, operacoes};
}

export default decomposicaoLU;