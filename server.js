import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Amadeus from 'amadeus';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname)));


const clientId = 'Ll1LhA0cORjf9A36jPk3As3SFRmjJMB9';
const clientSecret = 'Wa0xFGW89k4MNMoL';

const amadeusClient = new Amadeus({
  clientId: clientId,
  clientSecret: clientSecret
});

app.get('/search-cities', async (req, res) => {
  const keyword = req.query.keyword?.trim();

  if (!keyword || !/^[a-zA-Zа-яА-Я\s-]+$/.test(keyword)) {
    return res.status(400).json({
      error: "НЕдопустимые символы в запросе"
    });
  }
	if (!keyword || keyword.length < 3 || keyword.length > 50) {
    return res.status(400).json({
      error: "Слово должно быть от 3 до 50 символов"
    });
  }

  try {
    const response = await amadeusClient.referenceData.locations.cities.get({
      keyword: keyword,
			lang: 'ru'
    });
    const cities = response.data
		.filter(city => city.name.toLowerCase().startsWith(keyword.toLowerCase()))
		.filter(city => city.iataCode)
		.map(city => ({
      name: city.name,
      iataCode: city.iataCode,
      countryCode: city.address.countryCode
    }));
    res.json(cities);
  } catch (error) {
    console.error('Error while searching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



