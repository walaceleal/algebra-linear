import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function gaussJordan(matriz, EXTENDER_FLOAT = false) {
    if(EXTENDER_FLOAT)
        return _gaussJordan(matriz);

    const n = matriz.length;
    
    const relatorio = criarRelatorio(Algoritmos.GAUSS_JORDAN);
    criarBloco(relatorio, 'matriz inicial', matriz);
    let operacoes = 0;


    for (let i = 0; i < n; i++) {
        // Verifica pivô nulo
        if (matriz[i][i] === 0) {
            throw new Error("Pivô nulo encontrado. Precisa de pivotamento.");
        }

        // Normaliza a linha do pivô
        const pivo = matriz[i][i];
        for (let j = 0; j <= n; j++) {
            matriz[i][j] /= pivo;

            operacoes += 1;
        }

        criarBloco(relatorio, `normaliza a ${i + 1}ª linha`, matriz);


        // Zera todas as outras linhas
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const fator = matriz[k][i];

                for (let j = 0; j <= n; j++) {
                    matriz[k][j] -= fator * matriz[i][j];
                    operacoes += 1;
                }
            }
        }
        criarBloco(relatorio, `zera os elementos da ${i + 1}ª coluna`, matriz);
    }

    // Extrai solução
    const s = matriz.map(linha => linha[n]);
    
    criarBloco(relatorio, `o vetor b é a solução`, [s]);

    return {x: s, operacoes};
}


import Decimal from 'decimal.js';

function _gaussJordan(matriz) {
    const n = matriz.length;

    const relatorio = criarRelatorio(Algoritmos.GAUSS_JORDAN);
    criarBloco(relatorio, 'matriz inicial', matriz);

    let operacoes = 0;

    // Converte todos os elementos para Decimal
    matriz = matriz.map(linha =>
        linha.map(valor => new Decimal(valor))
    );

    for (let i = 0; i < n; i++) {

        // Verifica pivô nulo
        if (matriz[i][i].isZero()) {
            throw new Error("Pivô nulo encontrado. Precisa de pivotamento.");
        }

        // Normaliza a linha do pivô
        const pivo = matriz[i][i];

        for (let j = 0; j <= n; j++) {
            matriz[i][j] = matriz[i][j].div(pivo);
            operacoes++;
        }

        criarBloco(
            relatorio,
            `normaliza a ${i + 1}ª linha`,
            matriz.map(linha => linha.map(x => x.toString()))
        );

        // Zera todas as outras linhas
        for (let k = 0; k < n; k++) {

            if (k !== i) {
                const fator = matriz[k][i];

                for (let j = 0; j <= n; j++) {
                    matriz[k][j] = matriz[k][j].minus(
                        fator.times(matriz[i][j])
                    );
                    operacoes++;
                }
            }
        }

        criarBloco(
            relatorio,
            `zera os elementos da ${i + 1}ª coluna`,
            matriz.map(linha => linha.map(x => x.toString()))
        );
    }

    // Extrai solução
    const s = matriz.map(linha => linha[n]);

    criarBloco(
        relatorio,
        `o vetor b é a solução`,
        [s.map(x => x.toString())]
    );

    return {
        x: s.map(v => v.toFixed(32)),
        operacoes
    };
}

export default gaussJordan;