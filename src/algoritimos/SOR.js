import { Algoritmos } from "../../tipos";
import { criarBloco, criarRelatorio } from "./relatorio";

function SOR(A, b, omega, tol, maxIter, EXTENDER_FLOAT) {
    if(EXTENDER_FLOAT)
        return _SOR(A,b,omega, tol, maxIter);

    const relatorio = criarRelatorio(Algoritmos.SOR);
    criarBloco(relatorio, 'matriz A', A);
    criarBloco(relatorio, 'vetor b', [b]);
    
    let operacoes = 0;

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
                operacoes+= 1;
            }

            // usa valores antigos
            for (let j = i + 1; j < n; j++) {
                soma2 += A[i][j] * xOld[j];
                operacoes+= 1;

            }

            if (A[i][i] === 0) {
                throw new Error("Pivô zero na diagonal.");
            }

            // fórmula SOR
            x[i] = (1 - omega) * xOld[i] + (omega / A[i][i]) * (b[i] - soma1 - soma2);
            operacoes+= 1;
        }

        // critério de parada
        let erro = 0;
        for (let i = 0; i < n; i++) {
            erro = Math.max(erro, Math.abs(x[i] - xOld[i]));
            operacoes+= 1;
        }

        criarBloco(relatorio, `${iter}: atualiza x, erro=${erro.toFixed(8)}`, [xOld, x]);

        if (erro < tol) {
            console.log(`Convergiu em ${iter + 1} iterações`);
            return {x, operacoes, iteracoes: iter + 1, precisao: tol}
        }

        xOld = [...x];
    }

    console.log("Número máximo de iterações atingido");
    return {x, operacoes, iteracoes: maxIter, precisao: tol}
}


import Decimal from 'decimal.js';

function _SOR(A, b, omega = 1.25, tol = 1e-3, maxIter = 400) {

    const relatorio = criarRelatorio(Algoritmos.SOR);

    criarBloco(relatorio, 'matriz A', A);
    criarBloco(relatorio, 'vetor b', [b]);

    let operacoes = 0;

    const n = A.length;

    // Converte para Decimal
    A = A.map(linha =>
        linha.map(valor => new Decimal(valor))
    );

    b = b.map(valor => new Decimal(valor));

    const w = new Decimal(omega);
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

        for (let i = 0; i < n; i++) {

            let soma1 = new Decimal(0);
            let soma2 = new Decimal(0);

            // usa valores já atualizados
            for (let j = 0; j < i; j++) {
                soma1 = soma1.plus(
                    A[i][j].times(x[j])
                );
                operacoes++;
            }

            // usa valores da iteração anterior
            for (let j = i + 1; j < n; j++) {
                soma2 = soma2.plus(
                    A[i][j].times(xOld[j])
                );
                operacoes++;
            }

            if (A[i][i].isZero()) {
                throw new Error("Pivô zero na diagonal.");
            }

            // termo Gauss-Seidel
            const gs = b[i]
                .minus(soma1)
                .minus(soma2)
                .div(A[i][i]);

            // fórmula SOR
            x[i] = Decimal(1)
                .minus(w)
                .times(xOld[i])
                .plus(
                    w.times(gs)
                );

            operacoes++;
        }

        // critério de parada
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
            `${iter + 1}: atualiza x, erro=${erro.toString()}`,
            [
                xOld.map(v => v.toString()),
                x.map(v => v.toString())
            ]
        );

        if (erro.lt(tolerancia)) {

            console.log(`Convergiu em ${iter + 1} iterações`);

            return {
                x: x.map(v => v.toFixed(32)),
                operacoes,
                iteracoes: iter + 1,
                precisao: tolerancia.toString()
            };
        }

        xOld = x.map(v => new Decimal(v));
    }

    console.log("Número máximo de iterações atingido");

    return {
        x: x.map(v => v.toFixed(32)),
        operacoes,
        iteracoes: maxIter,
        precisao: tolerancia.toString()
    };
}

export default SOR;