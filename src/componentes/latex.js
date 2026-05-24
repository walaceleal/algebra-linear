function renderizarEquacao(matriz, id_div){

}

function f(t){
    return t.toFixed(8);
}
//L_1 <- L_1 + b * L_2
function formatarCelula(matriz, i, j){
    const valor = f(matriz[i][j]);
    return valor;
}

function colorir(expressao, cor){
    return `{ \\color{ ${cor} } ${expressao} }`;
}

function formatarMatriz(matrizAumentada, destaques){
    let resultado = [];

    for(let i = 0; i < matrizAumentada.length; i++){
        resultado[i] = [];
        for(let j = 0; j < matrizAumentada[i].length; j++){
            const valor = matrizAumentada[i][j];
            resultado[i][j] = formatarCelula(matrizAumentada, i, j)
        }
    }

    return resultado.map(equacao => equacao.join('&')).join('\\\\');
}

function renderizarMatriz(matrizAumentada, destaques){

    let elementos = formatarMatriz(matrizAumentada, destaques);

    let formaMatricial = `
    \\[
        \\left[
        \\begin{array}{cccc|c}
            ${elementos}
        \\end{array}
    \\right]
    \\]
    `;
    
    return formaMatricial;
}

export default {
    renderizarMatriz
}