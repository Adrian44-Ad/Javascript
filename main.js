
// URL endpoint
const url_api = "https://rickandmortyapi.com/api/character";

/**
requestData
Send request to Endpoint
@param {string} url_api
**/

async function requestData(url_api) {
    const response = await fetch(url_api);
    let data = await response.json();
    getElementButton(document, 'set', data.info)
    renderHtml(data);
}

/**
loadMore
Call @Function getElementButton 
*/

function loadMore() {
    getElementButton(document, 'get')
}

/**
getElementButton
@param {object} elementButton
@param {object} button
@param {string} operation
*/

function getElementButton(elementButton, operation = 'get', info = null)
{
    const button = elementButton.getElementById("loadMore");

    if(operation == 'get'){
        const next = button.getAttribute("data-next");
        if(next == "" || next == null){
            console.log("No hay url");
        } else {
            requestData(next);
        }
    } else {
        button.setAttribute("data-next", (info.next == null) ? '' : info.next);
        button.setAttribute("data-prev", (info.prev == null) ? '' :info.prev);
    }
}

/**
renderHtml
@param {object} element
@param {object} data
*/

function renderHtml(data){
    let element = document.getElementById("character");
    let resultCount = data.results.length;
    for (let index = 0; index < resultCount; index++) {
    let character = data.results[index];
    element.innerHTML += `
        <li>
            <img src="${character.image}" alt="${character.name}">
            <h2>${character.name}</h2>
            <span>${character.gender}</span>
        </li>`;
 }
}

const response = requestData(url_api);