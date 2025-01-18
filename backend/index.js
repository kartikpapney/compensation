require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { rateLimit } = require('express-rate-limit')

const { init } = require('./init');
const { HOST, PORT } = require('./config');
const router = require('./router');

const limiter = rateLimit({
	windowMs: 10 * 60 * 1000,
	limit: 100, 
	standardHeaders: 'draft-8',
	legacyHeaders: false,
  message: { message: "Too many requests" },
})

const app = express();

app.use(bodyParser.json());
app.use(limiter)

app.use('/compensation/api', router);

app.use((req, res) => {
  res.status(404).json({ message: 'No route found' });
});

init()
  .then(() => {
    app.listen(PORT, HOST, () => {
      console.log(`Application started successfully on http://${HOST}:${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Error initializing the application:', e);
  });
