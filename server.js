import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import Amadeus from 'amadeus';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.resolve(__dirname)));


// ТОп-10 авиакомпаний
const airlinesData = [
  { id: 1, name: "Emirates", rating: 5 },
  { id: 2, name: "Qatar Airways", rating: 4.9 },
  { id: 3, name: "Turkish Airlines", rating: 4.8 },
  { id: 4, name: "Singapore Airlines", rating: 4.7 },
  { id: 5, name: "Korean Air", rating: 4.6 },
  { id: 6, name: "Etihad Airways", rating: 4.3 },
  { id: 7, name: "Cathay Pacific", rating: 4.2 },
  { id: 8, name: "Virgin Atlantic", rating: 4.1 },
  { id: 9, name: "Air New Zealand", rating: 4.7 },
  { id: 10, name: "Air Russia", rating: 4.5 },
];



const clientId = 'ULwxVEFEXm2XYfSFmGrZmH6KHkXMb7TF';
const clientSecret = '9uucL5kIVvdXB6i6';

const amadeusClient = new Amadeus({
  clientId: clientId,
  clientSecret: clientSecret
});

app.get('/airlines', (req, res) => {
  res.json(airlinesData);
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
    console.error('Ошибка при поиске городов:', error);
    res.status(500).json({ error: 'Ошибка при поиске городов' });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



