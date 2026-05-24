function decomposicaoLU(A, b) {
    console.log('decomposicaoLU', A, b)
    const n = A.length;

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
            }
            U[i][k] = A[i][k] - soma;
        }

        // Construção de L
        L[i][i] = 1;

        for (let k = i + 1; k < n; k++) {
            let soma = 0;
            for (let j = 0; j < i; j++) {
                soma += L[k][j] * U[j][i];
            }

            if (U[i][i] === 0) {
                throw new Error("Pivô zero encontrado.");
            }

            L[k][i] = (A[k][i] - soma) / U[i][i];
        }
    }

    // Resolve Ly = b (substituição direta)
    const y = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        let soma = 0;
        for (let j = 0; j < i; j++) {
            soma += L[i][j] * y[j];
        }
        y[i] = b[i] - soma;
    }

    // Resolve Ux = y (retrosubstituição)
    const x = new Array(n).fill(0);

    for (let i = n - 1; i >= 0; i--) {
        let soma = 0;
        for (let j = i + 1; j < n; j++) {
            soma += U[i][j] * x[j];
        }
        x[i] = (y[i] - soma) / U[i][i];
    }

    //return { L, U, x };
    return x;
}

export default decomposicaoLU;