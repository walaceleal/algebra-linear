import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function gaussSeidel(A, b, tol, maxIter, EXTENDER_FLOAT = false) {
    if(EXTENDER_FLOAT)
        return _gaussSeidel(A, b, tol, maxIter);

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


import Decimal from 'decimal.js';

function _gaussSeidel(A, b, tol = 1e-3, maxIter = 400) {

    const relatorio = criarRelatorio(Algoritmos.GAUSS_SEIDEL);

    criarBloco(relatorio, 'matriz A', A);
    criarBloco(relatorio, 'vetor b', [b]);

    let operacoes = 0;

    const n = A.length;

    // Converte para Decimal
    A = A.map(linha =>
        linha.map(valor => new Decimal(valor))
    );

    b = b.map(valor => new Decimal(valor));

    const tolerancia = new Decimal(tol);

    let x = Array.from(
        { length: n },
        () => new Decimal(0)
    );

    let xOld = x.map(v => new Decimal(v));

    criarBloco(
        relatorio,
        'chute inicial',
        [[...x.map(v => v.toString())]]
    );

    for (let iter = 0; iter < maxIter; iter++) {

        // Atualiza x em tempo real (Gauss-Seidel)
        for (let i = 0; i < n; i++) {

            let soma = new Decimal(0);

            for (let j = 0; j < n; j++) {

                if (j !== i) {
                    soma = soma.plus(
                        A[i][j].times(x[j])
                    );

                    operacoes++;
                }
            }

            if (A[i][i].isZero()) {
                throw new Error("Pivô zero na diagonal.");
            }

            x[i] = b[i]
                .minus(soma)
                .div(A[i][i]);

            operacoes++;
        }

        // Critério de parada
        let erro = new Decimal(0);

        for (let i = 0; i < n; i++) {

            const diferenca = x[i]
                .minus(xOld[i])
                .abs();

            if (diferenca.gt(erro)) {
                erro = diferenca;
            }

            operacoes++;
        }

        criarBloco(
            relatorio,
            `${iter + 1}: Atualiza x, erro=${erro.toString()}`,
            [[...x.map(v => v.toString())]]
        );

        if (erro.lt(tolerancia)) {

            return {
                x:  x.map(v => v.toFixed(32)),
                operacoes,
                iteracoes: iter + 1,
                precisao: tolerancia.toString()
            };
        }

        // Copia os valores para próxima iteração
        xOld = x.map(v => new Decimal(v));
    }

    return {
        x:  x.map(v => v.toFixed(32)),
        operacoes,
        iteracoes: maxIter,
        precisao: tolerancia.toString()
    };
}


export default gaussSeidel;