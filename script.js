const sendTeams = document.getElementById("send-teams");
const teamsBlock = document.getElementById("teams-block");

const getTeams = () => {
  let teams = document.getElementById("teams-input").value;
  teams = teams.trim();
  return teams;
};

const logTeams = () => {
  participants = {};
  teams = getTeams();
  teamsBlock.innerText = teams;

  const splited = teams.split(/\n/);

  for (let string of splited) {
    const list = string.split(";");
    participants[list[0]] = {
      house: list[1],
    };
  }
};

sendTeams.addEventListener("click", logTeams);
