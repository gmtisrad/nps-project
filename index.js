'use-strict'

const api_key = '3lftuCgNpVtszzuq7Dkh7xsXzlLaR5SmPNqKowBP';

const endPoint = 'https://developer.nps.gov/api/v1/parks';

function watchForm () {
    $('.js-parks-form').on('submit', event => {
        event.preventDefault();
        const STATES = $('.js-search-input').val().split(', ');
        const MAX_RESULTS = $('.js-max-results').val();

        getParks(STATES, MAX_RESULTS);
    })
}

function getParks(states, maxResults) {
    const queryString = formatParameters(states, maxResults);
    const url = endPoint + '?' + queryString;
    fetch (url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error (response.statusText);
    })
    .then (responseJson => {displayParks(responseJson); console.log(responseJson);})
    .catch (error => alert (`Error: ${error.message}`));
}

function displayParks (responseJson) {
    $('.js-results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++){
        $('.js-results-list').append(`
            <li class='result'> 
                <h3 class='result-name'>${responseJson.data[i].fullName}</h3>
                <p class='result-description'>${responseJson.data[i].description}</p>
                <a class='result-link' href='${responseJson.data[i].url}'>Website</a>
            </li>`);
    }
    $('.js-results').removeClass('hidden');
}

function formatParameters(states, maxResults) {
    let parameters = [];
    parameters.push(`api_key=${api_key}`);
    for (let i = 0; i < states.length; i++) {
        parameters.push(`stateCode=${encodeURIComponent(states[i])}`)
    }
    parameters.push(`limit:${encodeURIComponent(maxResults)}`);
    return parameters.join('&');
}

$(watchForm());