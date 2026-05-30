'use client'

import { executarMetodo } from "@/algoritimos";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { Algoritmos, RespostaAlgoritmo } from "../../../tipos";

const options = {
  curveType: "none",
  pointSize: 6,
};

interface Intervalo {
    min: number,
    max: number
}

function obterSimulacoes(){
    let json = localStorage.getItem('relatório');

    if(json && false)
        return JSON.parse(json);

    let simulacoes = []

    for(let i = 2; i <= 30; i++){
        let params = {
            TAMANHO_MATRIZ_HILBERT: i, 
             NUMERO_MAX_ITERACOES: 400, 
             OMEGA: 1.5, 
             PRECISAO: 1e-10
        };

        const eliminacao_gaussiana = executarMetodo({ algoritmo: Algoritmos.ELIMINACAO_GAUSSIANA, ...params})
        const gauss_jordan = executarMetodo({ algoritmo: Algoritmos.GAUSS_JORDAN, ...params})
        const lu = executarMetodo({ algoritmo: Algoritmos.LU, ...params})
        
        const jacobi = executarMetodo({ algoritmo: Algoritmos.JACOBI, ...params})
        const gauss_seidel = executarMetodo({ algoritmo: Algoritmos.GAUSS_SEIDEL, ...params})
        const sor = executarMetodo({ algoritmo: Algoritmos.SOR, ...params})

        simulacoes.push([
            i.toString(), 
            eliminacao_gaussiana,
            gauss_jordan,
            lu,
            jacobi,
            gauss_seidel,
            sor,
        ])
    }

    localStorage.setItem("relatorio", JSON.stringify(simulacoes, null, 3));
    return simulacoes;
}

function Grafico() {
    const [simulacoes, setSimulacoes] = useState([]);

    useEffect(()=>{
        setSimulacoes(obterSimulacoes());    
    }, [])

    function filtrar(algoritmos: Algoritmos[], propriedade: keyof RespostaAlgoritmo, intervalo?: Intervalo): any[]{
        let algoritmosFiltrados = [
            Algoritmos.ELIMINACAO_GAUSSIANA, 
            Algoritmos.GAUSS_JORDAN,
            Algoritmos.LU,
            Algoritmos.JACOBI,
            Algoritmos.GAUSS_SEIDEL,
            Algoritmos.SOR,
        ].filter(a => algoritmos.indexOf(a) !== -1);

        let eixoX = '';

        let data : any = [
            [eixoX, ...algoritmosFiltrados]
        ];

        data.push(
            ...simulacoes.map((l => {
                let [i, ...metodos] = l;
                return [i, ...metodos.filter(m => algoritmos.indexOf(m.algoritmo) !== -1).map(m => m[propriedade])]
            })
        ));

        return !intervalo ? data : data.filter( d => +d[0] >= intervalo.min && +d[0] <= intervalo.max );
    }

    
  return (
    <div style={{gap: 10}}>
        <Chart
            chartType="LineChart"
            width="100%"
            height="800px"
            data={filtrar([Algoritmos.ELIMINACAO_GAUSSIANA, Algoritmos.GAUSS_JORDAN, Algoritmos.LU], "operacoes")}
            options={{
                ...options,
                hAxis: { title: "Dimensão da Matriz de Hilbert" },
                vAxis: { title: "Operacoes" },
            }}
        />

        <Chart
            chartType="LineChart"
            width="100%"
            height="800px"
            data={filtrar([Algoritmos.GAUSS_SEIDEL, Algoritmos.JACOBI, Algoritmos.SOR], "operacoes")}
            options={{
                ...options,
                hAxis: { title: "Dimensão da Matriz de Hilbert" },
                vAxis: { title: "Operacoes" },
            }}
        />


        <Chart
            chartType="LineChart"
            width="100%"
            height="800px"
            data={filtrar([Algoritmos.GAUSS_SEIDEL, Algoritmos.SOR], "erro")}
            options={{
                ...options,
                hAxis: { title: "Dimensão da Matriz de Hilbert" },
                vAxis: { title: "Erro" },
            }}
        />

        <Chart
            chartType="LineChart"
            width="100%"
            height="800px"
            data={filtrar([Algoritmos.ELIMINACAO_GAUSSIANA, Algoritmos.GAUSS_JORDAN, Algoritmos.LU], "erro", {min: 0, max: 8})}
            options={{
                ...options,
                hAxis: { minValue: 9,title: "Dimensão da Matriz de Hilbert" },
                vAxis: {  title: "Erro" },
            }}
        />


        <Chart
            chartType="LineChart"
            width="100%"
            height="800px"
            data={filtrar([Algoritmos.ELIMINACAO_GAUSSIANA, Algoritmos.GAUSS_JORDAN, Algoritmos.LU], "erro", {min: 0, max: 20})}
            options={{
                ...options,
                title: 'Erro para matrizes pequenas',
                hAxis: { minValue: 9,title: "Dimensão da Matriz de Hilbert" },
                vAxis: {  title: "Erro" },
            }}
        />
    </div>
  );
}

export default Grafico;