var host = window.location.origin;

//Ranking Tables
function loadStandingsAPI(season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/standings?season=${season}&league=39`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadUpcomingGames(season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?league=39&season=${season}&next=10`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

async function getHomeData() {
    console.log("Viewing API Data");

    //Standings
    const currentStandingsAPI = await loadStandingsAPI("2023");
    const currentStandings = currentStandingsAPI["response"][0]["league"]["standings"][0]

    //Homepage Table
    const table = document.getElementById('homeTable')

    for (let i = 0; i < 5; i++) {
        const data = currentStandings[i]
        const row = document.createElement('tr')

        if (data["rank"] == `${parseInt(i) + 1}`) {
            const cell1 = document.createElement('td')
            cell1.innerHTML = `${i + 1}.`
            const cell2 = document.createElement('td')
            cell2.innerHTML = data["team"]["name"]
            const cell3 = document.createElement('td')
            cell3.innerHTML = data["all"]["played"]
            const cell4 = document.createElement('td')
            cell4.innerHTML = data["all"]["win"]
            const cell5 = document.createElement('td')
            cell5.innerHTML = data["all"]["lose"]
            const cell6 = document.createElement('td')
            cell6.innerHTML = data["points"]
            const cell7 = document.createElement('td')
            cell7.innerHTML = data["goalsDiff"]

            row.appendChild(cell1)
            row.appendChild(cell2)
            row.appendChild(cell3)
            row.appendChild(cell4)
            row.appendChild(cell5)
            row.appendChild(cell6)
            row.appendChild(cell7)
            table.appendChild(row)
        }
    }

    //Upcoming Games (Home Page)
    const upcomingGamesAPI = await loadUpcomingGames('2023')
    const upcomingGames = upcomingGamesAPI["response"]

    const lst = document.getElementById('upcomingGamesList')

    if (upcomingGames.length != 0) {
        for (let i = 0; i < 10; i++) {
            const newFixture = document.createElement('li')
            newFixture.innerHTML = `${upcomingGames[i]["teams"]["home"]["name"]} vs. ${upcomingGames[i]["teams"]["away"]["name"]} | ${upcomingGames[i]["fixture"]["date"]}`
            lst.appendChild(newFixture)
        }
    } else {
        const newFixture = document.createElement('li')
        newFixture.innerHTML = "No more upcoming games! Check back next season."
        lst.appendChild(newFixture)
    }
}

async function getRankingsData() {
    //Rankings Page Table
    const currentStandingsAPI = await loadStandingsAPI("2023");
    const currentStandings = currentStandingsAPI["response"][0]["league"]["standings"][0]

    const rankingsTable = document.getElementById('rankingsTable')

    for (i in currentStandings) {
        const data = currentStandings[i]
        const row = document.createElement('tr')

        const cell1 = document.createElement('td')
        cell1.innerHTML = `${parseInt(i) + 1}.`
        const cell2 = document.createElement('td')
        cell2.innerHTML = `<img src=\"${data["team"]["logo"]}\" width=\"30px\" height=\"30px\">`;
        const cell3 = document.createElement('td')
        cell3.innerHTML = data["team"]["name"]
        const cell4 = document.createElement('td')
        cell4.innerHTML = data["all"]["played"]
        const cell5 = document.createElement('td')
        cell5.innerHTML = data["all"]["win"]
        const cell6 = document.createElement('td')
        cell6.innerHTML = data["all"]["lose"]
        const cell7 = document.createElement('td')
        cell7.innerHTML = data["all"]["draw"]
        const cell8 = document.createElement('td')
        cell8.innerHTML = data["points"]
        const cell9 = document.createElement('td')
        cell9.innerHTML = data["goalsDiff"]

        row.appendChild(cell1)
        row.appendChild(cell2)
        row.appendChild(cell3)
        row.appendChild(cell4)
        row.appendChild(cell5)
        row.appendChild(cell6)
        row.appendChild(cell7)
        row.appendChild(cell8)
        row.appendChild(cell9)
        rankingsTable.appendChild(row)
    }
    console.log(currentStandings)
}

//Match Predictor
function loadHistoricalFixtures(t1, t2) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/headtohead?h2h=${t1}-${t2}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadHomeAwayRecords(season, team) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=${season}&team=${team}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadTeamIDs(season) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/teams?league=39&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadPlayerIDs(team) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/players/squads?team=${team}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadFixturesStatistics(fixture, team) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures/statistics?fixture=${fixture}&team=${team}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

async function getTeamIDs(name, season) {
    const teamIDsAPI = await loadTeamIDs(season)
    const teamIDs = teamIDsAPI["response"]
    let teamID = 0;
    for (i in teamIDs) {
        if (teamIDs[i]["team"]["name"] == name) {
            teamID = teamIDs[i]["team"]["id"]
        }
    }
    return (teamID)
}

async function getMatchPrediction(season) {
    const t1 = await getTeamIDs(document.getElementById('home-team').value, season)
    const t2 = await getTeamIDs(document.getElementById('away-team').value, season)
    let prediction_score = 0

    //Standings
    const standingsCheck = document.getElementById('standings')
    if (standingsCheck.checked) {
        const currentStandingsAPI = await loadStandingsAPI("2023");
        const currentStandings = currentStandingsAPI["response"][0]["league"]["standings"][0]
        let t1rank = 0;
        let t2rank = 0;
        for (i in currentStandings) {
            if (currentStandings[i]["team"]["id"] == t1) {
                t1rank = currentStandings[i]["rank"]
            }
            if (currentStandings[i]["team"]["id"] == t2) {
                t2rank = currentStandings[i]["rank"]
            }
        }
        prediction_score -= ((t1rank - t2rank) / 3)
        console.log(prediction_score)
    }

    //Fixtures
    const fixturesCheck = document.getElementById('history')
    if (fixturesCheck.checked) {
        const fixturesHistoryAPI = await loadHistoricalFixtures(t1, t2)
        const fixturesHistory = fixturesHistoryAPI["response"]
        let t1goals = 0;
        let t2goals = 0;
        for (i in fixturesHistory) {
            let home_id = fixturesHistory[i]["teams"]["home"]["id"]
            let away_id = fixturesHistory[i]["teams"]["away"]["id"]
            if (home_id == t1) {
                t1goals += fixturesHistory[i]["goals"]["home"]
            } else if (away_id == t1) {
                t1goals += fixturesHistory[i]["goals"]["away"]
            } else if (home_id == t2) {
                t2goals += fixturesHistory[i]["goals"]["home"]
            } else if (away_id == t2) {
                t2goals += fixturesHistory[i]["goals"]["away"]
            }
        }
        prediction_score += ((t1goals - t2goals) / 25)
        console.log(prediction_score)
    }

    //Home Goals/Conceded vs. Away Goals/Conceded
    const homeawayCheck = document.getElementById('homeaway')
    if (homeawayCheck.checked) {
        const t1HomeAwayRecordAPI = await loadHomeAwayRecords(season, t1)
        const t2HomeAwayRecordAPI = await loadHomeAwayRecords(season, t2)

        const t1HomeRecord = t1HomeAwayRecordAPI["response"]["goals"]["for"]["average"]["home"] - t1HomeAwayRecordAPI["response"]["goals"]["against"]["average"]["home"]
        const t2AwayRecord = t2HomeAwayRecordAPI["response"]["goals"]["for"]["average"]["away"] - t1HomeAwayRecordAPI["response"]["goals"]["against"]["average"]["away"]

        prediction_score += (t1HomeRecord - t2AwayRecord)
        console.log(prediction_score)
    }

    if (prediction_score > 0) {
        document.getElementById('predicted_win').innerHTML = `Predicted Winner: ${document.getElementById('home-team').value}`
    } else {
        document.getElementById('predicted_win').innerHTML = `Predicted Winner: ${document.getElementById('away-team').value}`
    }
    document.getElementById('predicted_score').innerHTML = `Prediction Score: ${prediction_score}`
}

//Fan Page

function loadTeamStatistics(season, team) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/teams/statistics?league=39&season=${season}&team=${team}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadPlayerStatistics(season, player) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/players?id=${player}&season=${season}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

function loadTeamFixtures(season, team) {
    const url = `https://api-football-v1.p.rapidapi.com/v3/fixtures?season=${season}&team=${team}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '4a22194a81msh0f5b0d07d8e2f6cp198988jsnb1716b80fe43',
            'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
        }
    };
    return (fetch(url, options).then((res) => res.json()));
}

async function populateMenu(season) {
    const homeMenu = document.getElementById('home-team')
    const awayMenu = document.getElementById('away-team')
    const teamNamesAPI = await loadTeamIDs(season)
    const teamNames = teamNamesAPI["response"]

    for (i in teamNames) {
        const option = document.createElement('option')
        option.value = teamNames[i]["team"]["name"]
        option.innerHTML = teamNames[i]["team"]["name"]
        homeMenu.appendChild(option)
    }

    for (i in teamNames) {
        const option = document.createElement('option')
        option.value = teamNames[i]["team"]["name"]
        option.innerHTML = teamNames[i]["team"]["name"]
        awayMenu.appendChild(option)
    }
}

async function populateFanMenus(season) {

    //Team Choices
    const teamMenu = document.getElementById('fav-team')
    const playerMenu = document.getElementById('fav-player')
    const teamNamesAPI = await loadTeamIDs(season)
    const teamNames = teamNamesAPI["response"]

    for (i in teamNames) {
        const option = document.createElement('option')
        option.value = teamNames[i]["team"]["name"]
        option.innerHTML = teamNames[i]["team"]["name"]
        teamMenu.appendChild(option)
    }

    //Player Choices
    document.getElementById('fav-team').onchange = async () => {
        while (playerMenu.options.length > 0) {
            playerMenu.remove(0);
        }
        team_choice = await getTeamIDs(document.getElementById('fav-team').value, '2023')
        const loadPlayersAPI = await loadPlayerIDs(team_choice)
        const playersAPI = loadPlayersAPI["response"][0]["players"]
        for (i in playersAPI) {
            const option = document.createElement('option')
            option.value = playersAPI[i]["name"]
            option.innerHTML = playersAPI[i]["name"]
            playerMenu.appendChild(option)
        }
    }
}

async function accessFanData() {
    await fetch(`${host}/fanpage`)
        .then((res) => res.json())
        .then((res) => {
            var profile_selector = document.getElementById('profile')
            while (profile_selector.options.length > 0) {
                profile_selector.remove(0);
            }
            for (i in res) {
                const option = document.createElement('option')
                option.value = res[i]["username"]
                option.innerHTML = res[i]["username"]
                profile_selector.appendChild(option)
            }
        })
}

async function createFan() {
    await fetch(`${host}/fanpage`, {
        method: 'POST',
        body: JSON.stringify({
            "username": `${document.getElementById("username").value}`,
            "name": `${document.getElementById("name").value}`,
            "fav_team": `${document.getElementById("fav-team").value}`,
            "fav_player": `${document.getElementById("fav-player").value}`,
        }),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((res) => async function () {
        })
    alert("Successfully signed up!")
    await accessFanData();
}

async function accessFan(user) {
    var fan_obj;
    await fetch(`${host}/fanpage`)
        .then((res) => res.json())
        .then((res) => {
            for (i in res) {
                if (res[i]["username"] == user) {
                    fan_obj = res[i]
                }
            }
        })
    return fan_obj
}

async function generateImages() {
    let season = "2023"
    const usern = document.getElementById('profile').value
    const fan = await accessFan(usern)
    const team = await getTeamIDs(fan["fav_team"], season)

    const loadPlayersAPI = await loadPlayerIDs(team)
    const playersAPI = loadPlayersAPI["response"][0]["players"]

    for (let i = 0; i < 10; i++) {
        document.getElementById(`slides${i}`).src = `${playersAPI[i]["photo"]}`;
    };
}

async function generateData() {

    document.getElementById('loadMsg').style.visibility = "visible"

    let season = "2023"
    const usern = document.getElementById('profile').value
    const fan = await accessFan(usern)
    const team = await getTeamIDs(fan["fav_team"], season)

    const teamStatisticsAPI = await loadTeamStatistics(season, team)
    const teamStatistics = teamStatisticsAPI["response"]
    console.log(teamStatisticsAPI)

    document.getElementById('fanLogo').innerHTML = `<img src=\"${teamStatistics["team"]["logo"]}\" width=\"30px\" height=\"30px\"> Fan Home <img src=\"${teamStatistics["team"]["logo"]}\" width=\"30px\" height=\"30px\">`;

    //Basic Data Chart
    let ctx = document.getElementById('stockChart');
    document.getElementById('stockChart').style.height = "300px";
    document.getElementById('stockChart').style.width = "650px";

    if (Chart.getChart('stockChart') != undefined) {
        Chart.getChart('stockChart').destroy();
    }

    new Chart(ctx,
        {
            type: "bar",
            data: {
                labels: ["Wins", "Losses", "Draws", "Clean Sheets", "Failed to Score"],
                datasets: [{
                    label: 'Home',
                    data: [teamStatistics["fixtures"]["wins"]["home"], teamStatistics["fixtures"]["loses"]["home"], teamStatistics["fixtures"]["draws"]["home"], teamStatistics["clean_sheet"]["home"], teamStatistics["failed_to_score"]["home"]],
                    borderWidth: 1,
                    borderColor: "rgb(0,0,0)",
                    backgroundColor: "rgb(255, 105, 98)"
                },
                {
                    label: 'Away',
                    data: [teamStatistics["fixtures"]["wins"]["away"], teamStatistics["fixtures"]["loses"]["away"], teamStatistics["fixtures"]["draws"]["away"], teamStatistics["clean_sheet"]["away"], teamStatistics["failed_to_score"]["away"]],
                    borderWidth: 1,
                    borderColor: "rgb(0,0,0)",
                    backgroundColor: "rgb(119, 221, 118)"
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: true,
                        text: "Basic Team Data"
                    }
                }
            }
        }
    );

    //Favorite Player Table
    let favPlayerID = 0;
    const loadPlayersAPI = await loadPlayerIDs(team)
    const playersAPI = loadPlayersAPI["response"][0]["players"]
    for (i in playersAPI) {
        if (playersAPI[i]["name"] == fan["fav_player"]) {
            favPlayerID = playersAPI[i]["id"]
        }
    }
    const loadPlayerStatisticsAPI = await loadPlayerStatistics(season, favPlayerID)
    const playerStats = loadPlayerStatisticsAPI["response"][0]
    console.log(playerStats)

    player_table = document.getElementById('player-table')
    document.getElementById('player-name').innerHTML = `${playerStats["player"]["firstname"]} ${playerStats["player"]["lastname"]}, ${playerStats["player"]["nationality"]}`

    const row = document.createElement('tr')

    if (player_table.rows.length > 2) {
        player_table.deleteRow(player_table.rows.length - 1);
    }

    const cell1 = document.createElement('td')
    cell1.innerHTML = playerStats["statistics"][0]["games"]["position"]
    const cell2 = document.createElement('td')
    cell2.innerHTML = playerStats["statistics"][0]["goals"]["total"]
    const cell3 = document.createElement('td')
    cell3.innerHTML = playerStats["statistics"][0]["goals"]["assists"]
    const cell4 = document.createElement('td')
    cell4.innerHTML = playerStats["statistics"][0]["games"]["appearences"]
    const cell5 = document.createElement('td')
    cell5.innerHTML = playerStats["statistics"][0]["shots"]["on"]
    const cell6 = document.createElement('td')
    cell6.innerHTML = playerStats["statistics"][0]["passes"]["key"]
    const cell7 = document.createElement('td')
    cell7.innerHTML = playerStats["statistics"][0]["tackles"]["total"]
    const cell8 = document.createElement('td')
    cell8.innerHTML = playerStats["statistics"][0]["tackles"]["interceptions"]
    const cell9 = document.createElement('td')
    cell9.innerHTML = `${playerStats["statistics"][0]["duels"]["won"]}/${playerStats["statistics"][0]["duels"]["total"]}`
    const cell10 = document.createElement('td')
    cell10.innerHTML = playerStats["statistics"][0]["games"]["rating"]

    row.appendChild(cell1)
    row.appendChild(cell2)
    row.appendChild(cell3)
    row.appendChild(cell4)
    row.appendChild(cell5)
    row.appendChild(cell6)
    row.appendChild(cell7)
    row.appendChild(cell8)
    row.appendChild(cell9)
    row.appendChild(cell10)
    player_table.appendChild(row)

    document.getElementById('player-table').style.visibility = "visible"

    //Photo Slider
    document.getElementById('player-image').src = playerStats["player"]["photo"]

    //Fixtures
    
    const fixturesAPI = await loadTeamFixtures(season, team)
    const fixtures = fixturesAPI["response"]
    const fixMenu = document.getElementById('fixtureMenu')
    
    while (fixMenu.options.length > 0) {
        fixMenu.remove(0);
    }

    for (i in fixtures) {
        const option = document.createElement('option')
        option.value = `${fixtures[i]["fixture"]["id"]}`
        option.innerHTML = `${fixtures[i]["teams"]["home"]["name"]} vs. ${fixtures[i]["teams"]["away"]["name"]}, ${fixtures[i]["fixture"]["date"]}`
        fixMenu.appendChild(option)
    }

    const statisticsList = document.getElementById('statistics')
    statisticsList.innerHTML = ''

    document.getElementById('loadMsg').style.visibility = "hidden"
}

async function generateFixtureData() {

    const usern = document.getElementById('profile').value
    const fan = await accessFan(usern)
    const team = await getTeamIDs(fan["fav_team"], '2023')
    const fixtureID = document.getElementById('fixtureMenu').value
    
    const fixtureDataAPI = await loadFixturesStatistics(fixtureID, team)
    const fixtureData = fixtureDataAPI["response"][0]["statistics"]
    const statisticsList = document.getElementById('statistics')
    statisticsList.innerHTML = ''

    for (i in fixtureData) {
        const lstItem = document.createElement('li')
        if (`${fixtureData[i]["type"]}` == "expected_goals" || (`${fixtureData[i]["type"]}` == "expected_goals" && `${fixtureData[i]["value"]}` == "null")) {
            lstItem.innerHTML = `Expected Goals: ${fixtureData[i]["value"]}`
        } else if (`${fixtureData[i]["value"]}` == "null") {
            lstItem.innerHTML = `${fixtureData[i]["type"]}: N/A`
        } else {
            lstItem.innerHTML = `${fixtureData[i]["type"]}: ${fixtureData[i]["value"]}`
        }
        statisticsList.appendChild(lstItem)
    }
}