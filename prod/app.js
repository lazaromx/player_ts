"use strict";
// const player1: Player = {
//   name: 'John',
//   height: 180,
//   weight: 75,
//   age: 19
// }
// function obtemPlayerForm(form: any) {
//   let player: IPlayer = {
//     name: form.nome.value,
//     heigth: form.altura.value,
//     weigth: form.peso.value,
//     age: form.idade.value,
//   };
//   return player;
// }
function obtemPlayer(params) {
    const player = {
        name: params['nome'].replaceAll('+', ' '),
        heigth: params['altura'],
        weigth: params['peso'],
        age: params['idade'],
    };
    return player;
}
function addTd(dado, classe) {
    const td = document.createElement("td");
    td.textContent = dado;
    td.classList.add(classe);
    return td;
}
function addTr(jogador) {
    console.log(jogador);
    const nomeTd = addTd(jogador.name, "info-nome");
    const alturaTd = addTd(jogador.heigth.toString(), "info-altura");
    const pesoTd = addTd(jogador.weigth.toString(), "info-peso");
    const idadeTd = addTd(jogador.age.toString(), "info-idade");
    let linha = document.createElement("tr");
    linha.classList.add("jogador");
    linha.append(nomeTd, alturaTd, pesoTd, idadeTd);
    return linha;
}
function addPLayerTabela(jogador) {
    let jogadorTr = addTr(jogador);
    let tabela = document.querySelector(".tabela-jogador");
    tabela === null || tabela === void 0 ? void 0 : tabela.appendChild(jogadorTr);
    return jogadorTr;
}
// const button = document.querySelector("#button-add");
// button?.addEventListener("submit", event => {
//   event.preventDefault();
//   let form:any = document.querySelector("#form-adiciona");
//   let player = obtemPlayer(form);
//   addPLayerTabela(player);
//   form.reset();
// });
function getURLParameters() {
    var params = {};
    var parts = window.location.search.substring(1).split('&');
    for (var i = 0; i < parts.length; i++) {
        var pair = parts[i].split('=');
        var key = decodeURIComponent(pair[0]);
        var value = decodeURIComponent(pair[1]);
        params[key] = value;
    }
    return params;
}
