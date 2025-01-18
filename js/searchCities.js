const cityCache = {};

async function searchCities(keyword) {
  const trimmedKeyword = keyword.trim().toLowerCase();

  if (trimmedKeyword.length < 3) {
    return [];
  }

  if (cityCache[trimmedKeyword]) {
    console.log("Из кэша---", trimmedKeyword);
    return cityCache[trimmedKeyword];
  }

  try {
    const response = await fetch(`/search-cities?keyword=${encodeURIComponent(trimmedKeyword)}`);
    if (!response.ok) {
      throw new Error('Обнаружена ошибка при запросе к серверу');
    }
    const cities = await response.json();
    cityCache[trimmedKeyword] = cities;
    return cities;
  } catch (error) {
    console.error('Ошибка при поиске городов:', error);
    return [];
  }
}


function saveCityToJson(direction, city) {
	flightDirection[direction] = {
		name: city.name,
		countryCode: city.countryCode,
		iataCode: city.iataCode
	}
	console.log('Обновлен flightDirection:', flightDirection);
}

export const flightDirection = {
	fromDirection: null,
	toDirection: null
}

function createCityList(cities, inputElement) {
		const existingList = document.querySelector('.city-suggestions');
		if (existingList) existingList.remove();
		if (cities.length === 0) return;
    const suggestionList = document.createElement('ul');
    suggestionList.className = 'city-suggestions';
		console.log('Cities passed to createCityList:', cities);

		

    cities.forEach(city => {
				if (city.iataCode === undefined) return;

        const li = document.createElement('li');
				const divLeft = document.createElement('div');
				const divRight = document.createElement('div');
				divLeft.classList.add('city-suggestions__li-content-left');
				divRight.classList.add('city-suggestions__li-content-right');
        divLeft.textContent = `${city.name}`;
				divRight.textContent = `${city.countryCode}, ${city.iataCode}`;
        li.addEventListener('click', () => {
						const selectedCity = {
							name: city.name,
							countryCode: city.countryCode,
							iataCode: city.iataCode
						}
            inputElement.value = `${city.name}, ${city.countryCode}`;
						const direction = inputElement.id === 'from' ? 'fromDirection' : 'toDirection';
						saveCityToJson(direction, selectedCity);
            suggestionList.remove();
        });
        suggestionList.appendChild(li);
				li.appendChild(divLeft);
				li.appendChild(divRight);
    });

    inputElement.parentNode.appendChild(suggestionList);
}

function initializeCitySearch() {
    const fromInput = document.querySelector('#from');
    const toInput = document.querySelector('#to');

    [fromInput, toInput].forEach(input => {
        let debounceTimer;
        input.addEventListener('input', async (e) => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(async () => {
                const keyword = e.target.value.trim();
                if (keyword.length < 3) return;

                const cities = await searchCities(keyword);
                createCityList(cities, e.target);
            }, 350);
						input.addEventListener('blur', () => {
							setTimeout(() => {
									const suggestions = document.querySelector('.city-suggestions');
									if (suggestions) suggestions.remove();
							}, 100);
					});
        });
    });

    document.addEventListener('click', (e) => {
        if (!e.target.closest('.header__intro-search-input-box') &&
            !e.target.closest('.header__intro-search-input-box-to')) {
            const suggestions = document.querySelector('.city-suggestions');
            if (suggestions) suggestions.remove();
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeCitySearch);
