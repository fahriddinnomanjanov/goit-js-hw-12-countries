import country from '../templates/country.hbs'
import countries from '../templates/countries.hbs'
import _ from 'lodash'

const cardCountries = document.getElementById('card-countries')
const myInput = document.getElementById('my-input')
const countriesList = document.getElementById('countries-list')

myInput.addEventListener("input", _.debounce(fetchCountries, 1500))

function fetchCountries() {
    
    const baseURL = 'https://restcountries.eu/rest/v2';
    const countryName = this.value
    const countriesRequest = fetch(`${baseURL}/name/${countryName}`)

    countriesRequest.then((response) => {
        if (!response.ok) {
            throw new Error('Error')
        }
        return response.json();
    }).then(result => {
        console.log(result)
        if (result.length === 1) {
            cardCountries.innerHTML = country(...result);
        } else if (result.length > 1 && result.length < 10) {
            countriesList.innerHTML = countries(result);
        } else if (!myInput.value) {
            countriesList.innerHTML = '';
            cardCountries.innerHTML = '';
        }


    })
    }


export default country;