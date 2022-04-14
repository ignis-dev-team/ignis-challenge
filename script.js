const sendTeams = document.getElementById("send-teams");
// const teamsBlock = document.getElementById("teams-block");
const roundsDiv = document.getElementById("rounds");

const getTeams = () => {
    let teams = document.getElementById("teams-input").value;
    teams = teams.trim();
    return teams;
};

const createRounds = () => {
    const rangeRounds = Object.keys(participants).length * 2;
    const rounds = [];

    for (let index = 1; index <= rangeRounds; index++) {
        rounds.push([[]]);
    }

    return rounds;
};

const verifyTeam = (rounds, t, a, game) => {
    for (let i = 0; i < rounds.length; i++) {
        let round = rounds[i];
        if (round[0].includes(t) || round[0].includes(a)) {
            //   rounds[i + 5].push(game);
        } else {
            round[0] += ` ${a} ${t}`;
            round.push(game);
            return round;
        }
    }
};

const organizeRounds = () => {
    const rounds = createRounds();
    for (let t of Object.keys(participants)) {
        for (let a of Object.keys(participants)) {
            if (t !== a) {
                let house = participants[t].house;
                let game = [t, a, house];
                verifyTeam(rounds, t, a, game);
            }
        }
    }
    //   console.log(rounds);
    return rounds;
};

const verifyDoubleRound = (rounds) => {
    // console.log(rounds[1]);

    for (let roundIndex = 0; roundIndex < rounds.length; roundIndex++) {
        // let round = rounds[roundIndex] 
        let states = {}
        for (let index = 1; index < rounds[roundIndex].length; index++) {
            let game = rounds[roundIndex][index]
            if (Object.keys(states).includes(game[2])) {
                states[game[2]] += 1
            } else {
                states[game[2]] = 1
            }
        }

        for (let state of Object.keys(states)) {
            if (states[state] > 1) {
                let games = []
                for (let game of rounds[roundIndex]) {
                    if (game.includes(state)) {
                        game.push('(RODADA DUPLA)')
                    }
                    games.push(game)
                    rounds[roundIndex] = games
                    // console.log(games);
                    console.log(rounds[roundIndex]);
                }
            }
        }
    }

    // console.log(states);
    return rounds
}

const populateRoundsDiv = (rounds) => {
    for (let i = 0; i < rounds.length; i++) {
        let round = document.createElement("div");
        let roundHero = document.createElement("h3");
        // roundHero.innerText = `Rodada ${i + 1}`;
        roundHero.innerText = `-------------------------------------------------------`;
        round.appendChild(roundHero);


        for (let k = 1; k < rounds[i].length; k++) {
            let game = rounds[i][k];
            let roundParagraph = document.createElement("p");
            let paragraph = `${game[0]} vs ${game[1]} - ${game[2]
                } - Rodada ${i + 1}`

            if (game[3]) {
                paragraph = `${paragraph} ${game[3]}`
            }
            roundParagraph.innerText = paragraph;


            round.appendChild(roundParagraph);
        }

        roundsDiv.appendChild(round);
    }
};

const btnSendTeams = () => {
    roundsDiv.innerHTML = "";
    participants = {};
    teams = getTeams();

    const splited = teams.split(/\n/);

    for (let string of splited) {
        const list = string.split(";");
        participants[list[0]] = {
            house: list[1],
        };
    }

    let rounds = organizeRounds();
    rounds = verifyDoubleRound(rounds)
    populateRoundsDiv(rounds);
};

sendTeams.addEventListener("click", btnSendTeams);
