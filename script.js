const sendTeams = document.getElementById("send-teams");

const getTeams = () => {
  let teams = document.getElementById("teams-input").value;
  return teams;
};

const logTeams = () => {
  teams = getTeams();
  console.log(teams);
};

sendTeams.addEventListener("click", logTeams);
