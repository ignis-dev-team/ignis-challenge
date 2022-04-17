var times = []
var jogosDeIda = []
var jogosDeVolta = []
var rodadasIda = []
var rodadasVolta = []
var tabLid
var priTurno
var segTurno
function torneio() {

    console.log(document.getElementById('resultado').innerHTML = '')
    console.log(document.getElementById('champion').innerHTML = '')

    console.log('Todos os Times')
    times = getData()
    if (times.length % 2 == 0) {
        console.log(times)
        console.log('\n-----------------\n')
        console.log('Todos os possiveis jogos')

        jogosDeIda = arranjaJogadasIda(times)
        console.log('1° Turno')
        console.log(jogosDeIda)

        jogosDeVolta = arranjaJogadasVolta(times)
        console.log('2° Turno')
        console.log(jogosDeVolta)
        console.log('\n-----------------\n')
        rodadasIda = gerarRodadas(jogosDeIda, times.length)
        rodadasVolta = gerarRodadas(jogosDeVolta, times.length)
        console.log('Rodada Ida')
        console.log(rodadasIda)
        console.log('Rodada Volta')
        console.log(rodadasVolta)
        priTurno = '1° TURNO\n' + toPrint(rodadasIda)
        segTurno = '2° TURNO\n' + toPrint(rodadasVolta)

        console.log(newElement(segTurno, '65', '20'))
        console.log(newElement(priTurno, '65', '20'))

        console.log('\n-----------------\n')
        console.log('Gerar pontuação aleatoria')
        rodadasIda = gerarPontuacao(rodadasIda)
        console.log('Rodada Ida')
        console.log(rodadasIda)
        rodadasVolta = gerarPontuacao(rodadasVolta)
        console.log('Rodada Volta')
        console.log(rodadasVolta)
        console.log('\n-----------------\n')
        times = times.sort(compare)
        console.log('Tabela de Pontos')
        console.log(times)
        tabLid = 'TABELA DE LÍDERES\n' + tabelaDeLideres(times)
        newElement(tabLid, '25', '20')
        console.log('\n--------------------------\n')
        console.log('EXERCICIO\n'+priTurno+'\n'+segTurno+'\n'+tabLid)
        champion(times[0].nome)
        
    } else {
        window.alert('Favor informar um numero par de times')
    }



}
function toPrint(rodadas) {
    let str = ''
    for (let index = 0; index < rodadas.length; index++) {
        str += '\nRODADA ' + (index + 1).toString() + '\n'
        for (let index2 = 0; index2 < rodadas[index].length; index2++) {
            str += 'JOGO ' + (index2 + 1).toString() + ': '
            str += rodadas[index][index2].jogo.timeA.nome + ' VS ' + rodadas[index][index2].jogo.timeB.nome
            str += ' - ' + rodadas[index][index2].jogo.timeA.estado
            rodadas[index][index2].dupla ? str += ' (Rodada Dupla)\n' : str += '\n'

        }

    }
    return str
}
function tabelaDeLideres(times) {
    let str = ''
    for (let index = 0; index < times.length; index++) {
        str += (index + 1).toString() + '° - ' + times[index].nome.toString() + ' (' + times[index].pontos.toString() + ')\n'
    }
    return str
}


function gerarPontuacao(rodadas) {
    rodadas.forEach(rodada => {
        rodada.forEach(element => {
            element.jogo.val = getRandomInt(0, 3)
            if (element.jogo.val == 0) {
                element.jogo.timeA.pontos += 1
                element.jogo.timeB.pontos += 1
            } else if (element.jogo.val == 1) {
                element.jogo.timeA.pontos += 3
            } else if (element.jogo.val == 2) {
                element.jogo.timeB.pontos += 3
            }
        });
    });
    return rodadas
}

function gerarRodadas(game, ntimes) {
    let rodadas = []
    let jogos = game
    let run = true
    while (run) {
        while (jogos.length > 0) {
            let rodada = []
            jogos.forEach(jogo => {
                let flag = true
                rodada.forEach(element => {
                    if (element.jogo.timeA == jogo.timeA || element.jogo.timeA == jogo.timeB || element.jogo.timeB == jogo.timeA || element.jogo.timeB == jogo.timeB) {
                        flag = false
                    }

                });
                if (flag) {
                    rodada.push({ jogo: jogo, dupla: false })
                    jogos = arrayRemove(jogos, jogo)
                }
            });

            for (let index = 0; index < rodada.length; index++) {
                for (let index2 = 0; index2 < rodada.length; index2++) {
                    if (rodada[index].jogo.timeA.nome != rodada[index2].jogo.timeA.nome) {
                        if (rodada[index].jogo.timeA.estado == rodada[index2].jogo.timeA.estado) {
                            rodada[index2].dupla = true
                            rodada[index].dupla = true
                        }
                    }

                }

            }

            rodadas.push(rodada)
        }


        if (rodadas.length == (ntimes - 1)) {
            run = false
        } else {
            rodadas = []
            jogos = shuffleArray(game)
        }
    }
    return rodadas
}

function arranjaJogadasIda(times) {
    let jogadas = []

    times.map((timeA) => {
        times.map((timeB) => {
            if (timeA != timeB)
                jogadas.push({ timeA: timeA, timeB: timeB, val: '' })
        })
        times = arrayRemove(times, timeA)
    })

    return jogadas
}

function arranjaJogadasVolta(times) {
    let jogadas = []

    times.map((timeA) => {
        times.map((timeB) => {
            if (timeA != timeB)
                jogadas.push({ timeA: timeB, timeB: timeA, val: '' })
        })
        times = arrayRemove(times, timeA)
    })

    return jogadas
}

function getData() {
    let input = document.getElementById("timesinput").value
    input = input.toString()
    input = input.split("\n")
    let times = []
    input.map((time) => {
        [nome, estado] = time.split(";")
        times.push({ nome: nome, estado: estado, pontos: 0 })
    })
    return times
}

function arrayRemove(arr, value) {

    return arr.filter(function (ele) {
        return ele != value;
    });
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function champion(champion) {
    
    document.getElementById('champion').innerHTML = (champion + ' é o campeão ');
    document.getElementById('champion').style.opacity = 1
    
}
    

function compare(a, b) {
    if (a.pontos > b.pontos)
        return -1;
    if (a.pontos < b.pontos)
        return 1;
    return 0;
}
function newElement(str, col, row) {
    var divNova = document.createElement('textarea');
    var conteudoNovo = document.createTextNode(str.toString());
    divNova.appendChild(conteudoNovo);
    divNova.setAttribute('readonly', 'true')
    divNova.setAttribute('cols', col)
    divNova.setAttribute('rows', row)
    divNova.setAttribute('overflow-y:', 'hidden')
    var divAtual = document.getElementById("resultado");

    divAtual.insertAdjacentElement('afterbegin', divNova)
}