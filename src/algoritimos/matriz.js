export function duplicarVetor(A){
    return A.map(e => e);
}

export function calcularErro(x, _x){
    let e = 0;

    for(let i = 0; i < x.length; i++){
        e += Math.abs(x[i] - _x[i]);
    }

    return e;
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

export function criarMatrizHilbert(x){
    const n = x.length;

    let A = [];

    for(let i = 0; i < n; i++){
        A[i] = [];
        for(let j = 0; j < n; j++){
            A[i][j] = 1 / (i + j + 1) // 
        }
    }

    let b = [];

    for(let i = 0; i < n; i++){
        b[i] = 0;
        for(let j = 0; j < n; j++){
            b[i] += A[i][j] * x[j];
        }
    }

    return {A, b};
}

export function raioEspectral(matrix) {
    const eig = math.eigs(matrix);
    return Math.max(...eig.values.map(v => math.abs(v)));
}