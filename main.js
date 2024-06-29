const newApiKey = "4734babb6a4089ae159719a6c0e2afed258bc8ec45dc6ff7ec48f5d24a32b4ff";

const endpointCountries = `https://apiv3.apifootball.com/?action=get_countries&APIkey=${newApiKey}`;

fetch(endpointCountries)
    .then(response => response.json()) // Parse JSON
    .then(data => {
        // Filter data for Spain
        const spainData = data.filter(country => country.country_name === "Spain");

        // Display data on the webpage
        const dataContainer = document.getElementById('data-container');
        
        // Iterate through each country and create table rows
        spainData.forEach(country => {
            const row = document.createElement('tr');

            const countryNameCell = document.createElement('td');
            countryNameCell.textContent = country.country_name;

            const countryFlagCell = document.createElement('td');
            const countryFlagImg = document.createElement('img');
            countryFlagImg.src = country.country_logo;
            countryFlagImg.alt = country.country_name + ' flag';
            countryFlagCell.appendChild(countryFlagImg);

            // Append cells to the row
            row.appendChild(countryNameCell);
            row.appendChild(countryFlagCell);

            // Append the row to the table
            dataContainer.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));


const endpointPlayers = `https://apiv3.apifootball.com/?action=get_players&player_name=Benzema&team_name=Spain&APIkey=${newApiKey}`;

fetch(endpointPlayers)
    .then(response => response.json()) // Parse JSON
    .then(data => {
        // Display data on the webpage
        const playerDataContainer = document.getElementById('player-data-container');
        
        // Display player image outside of the table
        const playerImageContainer = document.getElementById('player-image-container');

        // Display player image if available
        if (data.length > 0 && data[0].player_image) {
            const playerImage = document.createElement('img');
            playerImage.src = data[0].player_image;
            playerImage.alt = data[0].player_name + ' image';
            playerImageContainer.appendChild(playerImage);
        }
        
        // Iterate through each player
        data.forEach(player => {
            const row = document.createElement('tr');

            // Only select specific attributes
            const attributesToShow = ['player_name', 'player_age', 'player_type', 'player_goals', 'player_assists'];

            // Iterate through selected attributes
            attributesToShow.forEach(attr => {
                const cell = document.createElement('td');
                cell.textContent = player[attr];
                row.appendChild(cell);
            });

            // Append the row to the table
            playerDataContainer.appendChild(row);
        });
    })
    .catch(error => console.error('Error fetching data:', error));

const endpointTeams = `https://apiv3.apifootball.com/?action=get_teams&league_id=302&APIkey=${newApiKey}`;

fetch(endpointTeams)
    .then(response => response.json())
    .then(data => {
        // Find the Real Madrid team
        const realMadrid = data.find(team => team.team_name === "Real Madrid");
        if (realMadrid) {
            // Display team data and players for Real Madrid only
            displayTeamData(realMadrid);
            displayPlayers(realMadrid.team_key);
        } else {
            console.log("Real Madrid not found in the fetched data.");
        }
    })
    .catch(error => console.error('Error fetching teams:', error));

function displayTeamData(team) {
    const teamContainer = document.getElementById('team-container');

    // Create a div for the team
    const teamDiv = document.createElement('div');
    teamDiv.classList.add('team');

    // Add team name
    const teamName = document.createElement('h2');
    teamName.textContent = team.team_name;
    teamDiv.appendChild(teamName);

    // Add team badge
    const teamBadge = document.createElement('img');
    teamBadge.src = team.team_badge;
    teamBadge.alt = `${team.team_name} badge`;
    teamDiv.appendChild(teamBadge);

    // Append the team div to the container
    teamContainer.appendChild(teamDiv);
}

// function displayPlayers(teamKey) {
//     const endpointPlayers = `https://apiv3.apifootball.com/?action=get_players&team_id=${teamKey}&APIkey=${newApiKey}`;

//     fetch(endpointPlayers)
//         .then(response => response.json())
//         .then(data => {
//             const teamContainer = document.getElementById('team-container');

//             // Create a table for players
//             const playersTable = document.createElement('table');
//             playersTable.classList.add('players-table');

//             // Create table header
//             const headerRow = document.createElement('tr');
//             ['Player Name', 'Position', 'Age'].forEach(attr => {
//                 const headerCell = document.createElement('th');
//                 headerCell.textContent = attr;
//                 headerRow.appendChild(headerCell);
//             });
//             playersTable.appendChild(headerRow);

//             // Display player data in rows
//             data.forEach(player => {
//                 const row = document.createElement('tr');
//                 ['player_name', 'player_position', 'player_age'].forEach(attr => {
//                     const cell = document.createElement('td');
//                     cell.textContent = player[attr];
//                     row.appendChild(cell);
//                 });
//                 playersTable.appendChild(row);
//             });

//             // Append players table to the team container
//             teamContainer.appendChild(playersTable);
//         })
//         .catch(error => console.error(`Error fetching players for team ${teamKey}:`, error));
// }
