function jacobi(A, b, tol = 1e-15, maxIter = 100) {
    const n = A.length;
    let x = new Array(n).fill(0);     // chute inicial
    let xNovo = new Array(n).fill(0);

    for (let iter = 0; iter < maxIter; iter++) {

        // calcula nova iteração
        for (let i = 0; i < n; i++) {
            let soma = 0;

            for (let j = 0; j < n; j++) {
                if (j !== i) {
                    soma += A[i][j] * x[j];
                }
            }

            if (A[i][i] === 0) {
                throw new Error("Pivô zero na diagonal.");
            }

            xNovo[i] = (b[i] - soma) / A[i][i];
        }

        // critério de parada
        let erro = 0;
        for (let i = 0; i < n; i++) {
            erro = Math.max(erro, Math.abs(xNovo[i] - x[i]));
        }

        if (erro < tol) {
            console.log(`Convergiu em ${iter + 1} iterações`);
            return xNovo;
        }

        // atualiza para próxima iteração
        x = [...xNovo];
    }

    console.log("Número máximo de iterações atingido");
    return x;
}

export default jacobi;