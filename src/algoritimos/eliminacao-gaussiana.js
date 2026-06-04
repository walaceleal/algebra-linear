import Decimal from 'decimal.js';

import {criarBloco, criarRelatorio} from "@/algoritimos/relatorio";
import { Algoritmos } from "../../tipos";

function eliminacaoGauss(matriz, EXTENDER_FLOAT = false) {
    if(EXTENDER_FLOAT)
        return _eliminacaoGauss(matriz);

    const n = matriz.length;

    let operacoes = 0;

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

                operacoes += 1;
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

            operacoes += 1;
        }

        x[i] = (matriz[i][n] - soma) / matriz[i][i];

        operacoes += 1;

        criarBloco(relatorio, `retrosubstituição ${i + 1}ª variável`, [x])
    }

    return {x, operacoes};
}

function _eliminacaoGauss(matriz) {
    const n = matriz.length;

    let operacoes = 0;

    // Converte toda a matriz para Decimal
    matriz = matriz.map(linha =>
        linha.map(valor => new Decimal(valor))
    );

    const relatorio = criarRelatorio(Algoritmos.ELIMINACAO_GAUSSIANA);

    criarBloco(
        relatorio,
        "matriz inicial",
        matriz.map(linha => linha.map(v => v.toString()))
    );

    // Eliminação
    for (let k = 0; k < n - 1; k++) {

        const pivo = matriz[k][k];

        if (pivo.isZero()) {
            throw new Error("Pivô nulo encontrado. Precisa de pivotamento.");
        }

        for (let i = k + 1; i < n; i++) {

            const fator = matriz[i][k].div(pivo);

            for (let j = k; j <= n; j++) {

                matriz[i][j] = matriz[i][j].minus(
                    fator.times(matriz[k][j])
                );

                operacoes++;
            }
        }

        criarBloco(
            relatorio,
            `eliminação da ${k + 1}ª coluna`,
            matriz.map(linha => linha.map(v => v.toString()))
        );
    }

    // Retrosubstituição
    const x = Array.from(
        { length: n },
        () => new Decimal(0)
    );

    for (let i = n - 1; i >= 0; i--) {

        let soma = new Decimal(0);

        for (let j = i + 1; j < n; j++) {

            soma = soma.plus(
                matriz[i][j].times(x[j])
            );

            operacoes++;
        }

        x[i] = matriz[i][n]
            .minus(soma)
            .div(matriz[i][i]);

        operacoes++;

        criarBloco(
            relatorio,
            `retrosubstituição ${i + 1}ª variável`,
            [[...x.map(v => v.toString())]]
        );
    }

    return {
        x: x.map(v => v.toFixed(32)),
        operacoes,
        relatorio
    };
}

export default eliminacaoGauss;