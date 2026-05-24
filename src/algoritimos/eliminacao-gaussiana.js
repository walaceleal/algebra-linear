import {criarBloco, criarRelatorio} from "@/algoritimos/relatorio";
import { Algoritmos } from "../../tipos";

function eliminacaoGauss(matriz) {
    const n = matriz.length;

    const relatorio = criarRelatorio(Algoritmos.ELIMINACAO_GAUSSIANA);
    criarBloco(relatorio, "matriz inicial", matriz);

    // Etapa de eliminação (triangular superior)
    for (let k = 0; k < n - 1; k++) {

        // Verifica pivô nulo
        if (matriz[k][k] === 0) {
            throw new Error("Pivô nulo encontrado. Precisa de pivotamento.");
        }

        for (let i = k + 1; i < n; i++) {
            const fator = matriz[i][k] / matriz[k][k];

            for (let j = k; j <= n; j++) {
                matriz[i][j] = matriz[i][j] - fator * matriz[k][j];
            }
        }

        criarBloco(relatorio, `eliminação da ${k + 1}ª coluna`, matriz);
    }

    // Retrosubstituição
    const x = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let soma = 0;

        for (let j = i + 1; j < n; j++) {
            soma += matriz[i][j] * x[j];
        }

        x[i] = (matriz[i][n] - soma) / matriz[i][i];

        criarBloco(relatorio, `retrosubstituição ${i + 1}ª variável`, [x])
    }

    return x;
}

export default eliminacaoGauss;