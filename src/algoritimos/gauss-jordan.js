function gaussJordan(matriz) {
    const n = matriz.length;

    for (let i = 0; i < n; i++) {

        // Verifica pivô nulo
        if (matriz[i][i] === 0) {
            throw new Error("Pivô nulo encontrado. Precisa de pivotamento.");
        }

        // Normaliza a linha do pivô
        const pivo = matriz[i][i];
        for (let j = 0; j <= n; j++) {
            matriz[i][j] /= pivo;
        }

        // Zera todas as outras linhas
        for (let k = 0; k < n; k++) {
            if (k !== i) {
                const fator = matriz[k][i];

                for (let j = 0; j <= n; j++) {
                    matriz[k][j] -= fator * matriz[i][j];
                }
            }
        }
    }

    // Extrai solução
    return matriz.map(linha => linha[n]);
}

export default gaussJordan;