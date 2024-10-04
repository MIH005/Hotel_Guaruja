const hotel = "Hotel Guarujá";
const MAX_HOSPEDES = 15;
let hospedes = [];
let diaria;
let totalHospedagem = 0;
let gratuidade = 0;
let meia = 0;

function main() {
    alert("Bem-vindo ao " + hotel + "!");

    if (!login()) {
        alert("Você não conseguiu fazer login. Programa encerrado.");
        return;
    }

    diaria = obterDiaria();
    if (diaria <= 0) {
        alert("Valor inválido. Programa encerrado.");
        return;
    }

    menuOperacoes();

    alert("O valor total das hospedagens é: R$" + totalHospedagem.toFixed(2) + "; " + gratuidade + " gratuidade(s); " + meia + " meia(s)");

    consultarCombustiveis();
    consultarArCondicionado();
}

function login() {
    const nome = prompt("Digite seu nome:");
    const senha = prompt("Digite a senha (2678):");

    if (senha === "2678") {
        alert("Bem-vindo ao " + hotel + ", " + nome + "!");
        return true;
    }
    return false;
}

function obterDiaria() {
    let diariaValor;
    do {
        diariaValor = parseFloat(prompt("Qual o valor padrão da diária?"));
        if (isNaN(diariaValor) || diariaValor <= 0) {
            alert("Por favor, insira um valor válido para a diária.");
        }
    } while (isNaN(diariaValor) || diariaValor <= 0);
    
    return diariaValor;
}

function menuOperacoes() {
    while (true) {
        const opcao = prompt("Selecione uma opção:\n1 - Cadastrar hóspede\n2 - Pesquisar hóspede\n3 - Listar hóspedes\n4 - Sair");
        
        if (opcao === "1") {
            cadastrarHospede();
        } else if (opcao === "2") {
            pesquisarHospede();
        } else if (opcao === "3") {
            listarHospedes();
        } else if (opcao === "4") {
            alert("Muito obrigado e até logo!");
            break;
        } else {
            alert("Opção inválida.");
        }
    }
}

function cadastrarHospede() {
    if (hospedes.length >= MAX_HOSPEDES) {
        alert("Máximo de cadastros atingido.");
        return;
    }

    const nomeHospede = prompt("Qual o nome do hóspede?");
    if (nomeHospede) {
        hospedes.push(nomeHospede);
        alert("Hóspede " + nomeHospede + " foi cadastrada(o) com sucesso!");
    } else {
        alert("Nome do hóspede não pode estar vazio.");
    }
}

function pesquisarHospede() {
    const nomeHospede = prompt("Qual o nome do hóspede?");
    
    if (nomeHospede) {
        if (hospedes.includes(nomeHospede)) {
            alert("Hóspede " + nomeHospede + " foi encontrada(o)!");
        } else {
            alert("Hóspede " + nomeHospede + " não foi encontrada(o)!");
        }
    } else {
        alert("Nome do hóspede não pode estar vazio.");
    }
}

function listarHospedes() {
    if (hospedes.length === 0) {
        alert("Não há hóspedes cadastrados.");
        return;
    }

    let lista = "Hóspedes cadastrados:\n";
    for (let i = 0; i < hospedes.length; i++) {
        lista += (i + 1) + ". " + hospedes[i] + "\n";
    }
    alert(lista);
}

function consultarCombustiveis() {
    alert("Vamos verificar o posto mais barato para abastecer o carro do hotel.");
    const tanqueLitros = 42;

    const postos = [
        {
            nome: "Wayne Oil",
            alcool: parseFloat(prompt("Qual o valor do álcool no posto Wayne Oil?")),
            gasolina: parseFloat(prompt("Qual o valor da gasolina no posto Wayne Oil?"))
        },
        {
            nome: "Stark Petrol",
            alcool: parseFloat(prompt("Qual o valor do álcool no posto Stark Petrol?")),
            gasolina: parseFloat(prompt("Qual o valor da gasolina no posto Stark Petrol?"))
        }
    ];

    let resultado = "";

    postos.forEach(posto => {
        if (posto.alcool < posto.gasolina * 0.7) {
            resultado += "Abastecer com álcool no " + posto.nome + " é mais barato.\n";
        } else {
            resultado += "Abastecer com gasolina no " + posto.nome + " é mais barato.\n";
        }
    });

    let menorCusto = Infinity;
    let postoMaisBarato = "";
    
    postos.forEach(posto => {
        const custoAlcool = posto.alcool * tanqueLitros;
        const custoGasolina = posto.gasolina * tanqueLitros;

        if (custoAlcool < menorCusto) {
            menorCusto = custoAlcool;
            postoMaisBarato = `${posto.nome} (álcool)`;
        }
        if (custoGasolina < menorCusto) {
            menorCusto = custoGasolina;
            postoMaisBarato = `${posto.nome} (gasolina)`;
        }
    });

    alert("O posto mais barato é " + postoMaisBarato + " com o valor de R$" + menorCusto.toFixed(2));
}

function consultarArCondicionado() {
    let menorValor = Infinity;
    let empresaMenorValor = "";

    do {
        const nomeEmpresa = prompt("Qual o nome da empresa?");
        const valorPorAparelho = parseFloat(prompt("Qual o valor por aparelho?"));
        const quantidadeAparelhos = parseInt(prompt("Qual a quantidade de aparelhos?"));
        const percentualDesconto = parseFloat(prompt("Qual a porcentagem de desconto?"));
        const quantidadeMinimaDesconto = parseInt(prompt("Qual a quantidade mínima para desconto?"));

        if (valorPorAparelho > 0 && quantidadeAparelhos > 0) {
            let custoTotal = valorPorAparelho * quantidadeAparelhos;

            if (quantidadeAparelhos >= quantidadeMinimaDesconto) {
                custoTotal -= custoTotal * (percentualDesconto / 100);
            }

            if (custoTotal < menorValor) {
                menorValor = custoTotal;
                empresaMenorValor = nomeEmpresa;
            }
        } else {
            alert("Valores inválidos. Tente novamente.");
        }
    } while (confirm("Deseja cadastrar outra empresa?"));

    alert("A empresa com o menor valor é " + empresaMenorValor + " com o valor total de R$" + menorValor.toFixed(2));
}

main();
