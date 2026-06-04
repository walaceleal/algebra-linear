import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function jacobi(A, b, tol, maxIter, EXTENDER_FLOAT=false) {
    if(EXTENDER_FLOAT)
        return _jacobi(A,b,tol, maxIter);
    
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


import Decimal from 'decimal.js';

function _jacobi(A, b, tol = 1e-3, maxIter = 400) {
    const relatorio = criarRelatorio(Algoritmos.JACOBI);

    criarBloco(relatorio, 'matriz A', A);
    criarBloco(relatorio, 'vetor b', [b]);

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

    let xNovo = Array.from(
        { length: n },
        () => new Decimal(0)
    );

    let operacoes = 0;

    criarBloco(
        relatorio,
        'chute inicial',
        [[...x.map(v => v.toString())]]
    );

    for (let iter = 0; iter < maxIter; iter++) {

        // Calcula nova iteração
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

            xNovo[i] = b[i]
                .minus(soma)
                .div(A[i][i]);

            operacoes++;
        }

        // Critério de parada
        let erro = new Decimal(0);

        for (let i = 0; i < n; i++) {

            const diferenca = xNovo[i]
                .minus(x[i])
                .abs();

            if (diferenca.gt(erro)) {
                erro = diferenca;
            }

            operacoes++;
        }

        criarBloco(
            relatorio,
            `${iter + 1}: atualiza x, erro=${erro.toString()}`,
            [[...xNovo.map(v => v.toString())]]
        );

        if (erro.lt(tolerancia)) {
            console.log(`Convergiu em ${iter + 1} iterações`);

            return {
                x: xNovo.map(v => v.absoluteValue().greaterThan(10) ? '∞' : v.toFixed(32)), // vetor Decimal
                operacoes,
                iteracoes: iter + 1,
                precisao: tolerancia.toString()
            };
        }

        // Próxima iteração
        x = xNovo.map(v => new Decimal(v));
    }

    console.log("Número máximo de iterações atingido");

    return {
        x: x.map(v => v.absoluteValue().greaterThan(1e5) ? '±∞' : v.toFixed(32)),
        operacoes,
        iteracoes: maxIter,
        precisao: tolerancia.toString()
    };
}

export default jacobi;