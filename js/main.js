$(document).ready(function() {
    getUsers();
});

var users = [
  "p4ntz",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "noobs2ninjas"
];


function getUsers() {
  for (var i = 0; i < users.length; i++) {
    getUsersInfo(users[i]);
  }
}

const app = document.getElementById("data");

function getUsersInfo(name) {
  $.getJSON("https://wind-bow.glitch.me/twitch-api/streams/" + name + "?callback=?", function(data1) {
    $.getJSON("https://wind-bow.glitch.me/twitch-api/users/" + name + "?format=json", function(data2) {

      const card = document.createElement("div");
      card.className = "twitch-players__card";
      app.appendChild(card);

      createPlayerLogo(card, data2);

      const playerDetails = document.createElement("div");
      playerDetails.className = "twitch-players__card__details";
      card.appendChild(playerDetails);

      const playerLink = document.createElement("a");
      playerLink.setAttribute("href", "https://www.twitch.tv/" + name);
      playerLink.setAttribute("target", "_blank");
      playerDetails.appendChild(playerLink);

      showPlayerDetails(playerDetails, playerLink, data2);
      createPlayerStatus(playerDetails, playerLink, data1);
    });
  });
}

function createPlayerLogo(card, data) {
  const logoContainer = document.createElement("div");
  logoContainer.className = "twitch-players__card__logo";
  card.appendChild(logoContainer);
  const logos = document.createElement("img");
  logos.src = data.logo;
  logoContainer.appendChild(logos);
}

function showPlayerDetails(playerDetails, playerLink, data) {
  const names = document.createElement("h3");
  names.textContent = data.display_name;
  names.className = "text text--family-orbitron text--theme-light-cyan text--s-medium";
  playerDetails.appendChild(names);
  playerLink.appendChild(names);
}

function showOnlineStatus(data, status, playerLink) {
  const onlinePlayer = document.createElement("span");
  const game = document.createElement("h4");
  game.className = "text text--family-orbitron text--theme-light-cyan";
  game.textContent = "GAME - " + data.stream.game;
  onlinePlayer.className = "text text--family-palatino text--theme-white text--status-online";
  $(onlinePlayer).text("Online ");
  status.appendChild(onlinePlayer);
  playerLink.appendChild(game);
}

function showOfflineStatus(status) {
  const offlinePlayer = document.createElement("span");
  offlinePlayer.className = "text text--family-palatino text--theme-white";
  $(offlinePlayer).text("Offline");
  status.appendChild(offlinePlayer);
}

function createPlayerStatus(playerDetails, playerLink, data) {
  const status = document.createElement("div");
  status.className = "twitch-players__card__details__status";
  playerDetails.appendChild(status);

  if (data.stream !== null) {
    showOnlineStatus(data, status, playerLink);

  } else if (data.stream === null) {
    showOfflineStatus(status);
  }
}
