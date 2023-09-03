interface IPlayer {
	name: string;
	heigth: number;
	weigth: number;
	age: number;
}

// class Utils {
// public static getURLParameters() {
function getURLParameters() {
	let params: Record<string, string> = {};
	let parts = window.location.search.substring(1).split("&");

	for (var i = 0; i < parts.length; i++) {
		var pair = parts[i].split("=");
		var key = decodeURIComponent(pair[0]);
		var value = decodeURIComponent(pair[1]);
		params[key] = value;
	}
	return params;
}

function isRecordEmpty(obj: Record<string, unknown>): boolean {
	const keys = Object.keys(obj);
	return keys.length === 0 || keys[0] === "";
}

// public static obtemPlayer(params: any): IPlayer {
function obtemPlayer(params: any): IPlayer {
	const player: IPlayer = {
		name: params["nome"].replaceAll("+", " "),
		heigth: params["altura"],
		weigth: params["peso"],
		age: params["idade"],
	};

	return player;
}

// class DBManager {
let players: IPlayer[];

// constructor() {
const dbplayers = localStorage.getItem("players");
players = dbplayers ? JSON.parse(dbplayers) : [];
// }

function save() {
	localStorage.setItem("players", JSON.stringify(players));
}

function insert(player: IPlayer): IPlayer {
	const p = get(player.name);
	if (!p) {
		players.push(player);
		save();
		return player;
	}
	return p;
}

function get(name: string): IPlayer | undefined {
	return players.find((p) => p.name === name);
}

function getAll(): IPlayer[] {
	return players;
}

function update(name: string, update: IPlayer): IPlayer | null {
	const player = get(name);

	if (player) {
		player.name = update.name;
		player.age = update.age;
		player.heigth = update.heigth;
		player.weigth = update.weigth;

		save();
		return player;
	}
	return null;
}

function remove(name: string): boolean {
	const playerIndex = players.findIndex((p) => p.name === name);
	if (playerIndex !== -1) {
		players.splice(playerIndex, 1);
		save();
		return true;
	}
	return false;
}
//   }

// export default DBManager;

// class App {

// private static addTd(dado: string, classe: string): HTMLTableCellElement {
function addTd(dado: string, classe: string): HTMLTableCellElement {
	const td = document.createElement("td");

	td.textContent = dado;
	td.classList.add(classe);

	return td;
}

// private static addTr(jogador: IPlayer): HTMLTableRowElement {
function addTr(jogador: IPlayer): HTMLTableRowElement {
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

// public static addPLayerTabela(jogador: IPlayer): HTMLTableRowElement {
function addPLayerTabela(jogador: IPlayer): HTMLTableRowElement {
	let jogadorTr = addTr(jogador);
	let tabela: HTMLTableElement = document.querySelector(".tabela-jogador")!;

	//players = JSON.parse(localStorage.getItem('jogador')!) || [];

	tabela.appendChild(jogadorTr);

	return jogadorTr;
}

function CarregarDados() {
	var params = getURLParameters(); //se tem parametros está adicionando
	console.log(params);
	const addPlayer = !isRecordEmpty(params);

	if (addPlayer) {
		console.log("obtemplayer");
		const player = obtemPlayer(params);
		console.log("insert", player);

		insert(player);
	}

	const players = getAll();
	console.log("getAll", players);
	players.forEach((player) => {
		console.log("add tr");
		addPLayerTabela(player);
	});
}
CarregarDados();

// }
// export default App;

// let players: Array<IPlayer> = [];

// // function obtemPlayerForm(form: any) {
// //   let player: IPlayer = {
// //     name: form.nome.value,
// //     heigth: form.altura.value,
// //     weigth: form.peso.value,
// //     age: form.idade.value,
// //   };

// //   return player;
// // }

// function obtemPlayer(params: any): IPlayer {
// 	const player: IPlayer = {
// 		name: params["nome"].replaceAll("+", " "),
// 		heigth: params["altura"],
// 		weigth: params["peso"],
// 		age: params["idade"],
// 	};

// 	return player;
// }

// function addTd(dado: string, classe: string): HTMLTableCellElement {
// 	const td = document.createElement("td");

// 	td.textContent = dado;
// 	td.classList.add(classe);

// 	return td;
// }

// function addTr(jogador: IPlayer): HTMLTableRowElement {
// 	console.log(jogador);
// 	const nomeTd = addTd(jogador.name, "info-nome");
// 	const alturaTd = addTd(jogador.heigth.toString(), "info-altura");
// 	const pesoTd = addTd(jogador.weigth.toString(), "info-peso");
// 	const idadeTd = addTd(jogador.age.toString(), "info-idade");

// 	let linha = document.createElement("tr");
// 	linha.classList.add("jogador");
// 	linha.append(nomeTd, alturaTd, pesoTd, idadeTd);

// 	return linha;
// }

// function addLocalStorage(jogador: IPlayer): void {
// 	players.push(jogador);
// 	localStorage.setItem("jogador", JSON.stringify(players));

// 	addPLayerTabela(jogador);
// }

// function addPLayerTabela(jogador: IPlayer): HTMLTableRowElement {
// 	let jogadorTr = addTr(jogador);
// 	let tabela: HTMLTableElement = document.querySelector(".tabela-jogador")!;

// 	//players = JSON.parse(localStorage.getItem('jogador')!) || [];

// 	tabela.appendChild(jogadorTr);

// 	return jogadorTr;
// }

// // const button = document.querySelector("#button-add");
// // button?.addEventListener("submit", event => {
// //   event.preventDefault();

// //   let form:any = document.querySelector("#form-adiciona");

// //   let player = obtemPlayer(form);

// //   addPLayerTabela(player);

// //   form.reset();

// // });
