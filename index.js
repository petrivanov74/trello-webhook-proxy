import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Webhook активен');
});

app.post('/', express.json(), async (req, res) => {
  console.log('Trello отправил webhook');
  try {
    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbzMIdHyMMxBZaSon4havRN7C0kb1mC-0Y3X-svFUML3rtRAq11xpTBZcan6HR16cEilhw/exec',
      {
        method: 'POST',
        body: JSON.stringify(req.body),
        headers: { 'Content-Type': 'application/json' },
      }
    );
    const text = await response.text();
    console.log('Ответ Apps Script:', text);
    res.status(200).send('OK');
  } catch (err) {
    console.error('Ошибка прокси:', err);
    res.status(500).send('Ошибка прокси');
  }
});

app.listen(PORT, () => {
  console.log(`Прокси запущен на порту ${PORT}`);
});