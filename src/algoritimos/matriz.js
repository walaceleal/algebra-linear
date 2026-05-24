export function duplicarVetor(A){
    return A.map(e => e);
}

export function duplicarMatriz(A){
    let resposta = [];

    for(let i = 0; i < A.length; i++){
        resposta[i] = [];
        for(let j = 0; j < A[i].length; j++) resposta[i][j] = A[i][j];
    }

    return resposta;
}

export function criarMatrizAumentada(A, b){
    let aumentada = [];

    for(let i = 0; i < A.length; i++){
        aumentada[i] = [];

        for(let j = 0; j < A[i].length; j++){
            aumentada[i][j] = A[i][j];
        }
        aumentada[i].push(b[i]);
    }

    return aumentada;
}