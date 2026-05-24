//const Matriz = require("./matriz");
import {duplicarMatriz} from "@/algoritimos/matriz";

export let blocos = {};

export function criarRelatorio(algoritmo){
    blocos[algoritmo] = [];
    return blocos[algoritmo];
}

export function criarBloco(relatorio, titulo, matriz){
    const _m = duplicarMatriz(matriz);
    relatorio.push({titulo, matriz: _m});
}