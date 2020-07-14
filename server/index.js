const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { ESRCH } = require('constants');
const app = express();

const dbConnString = 'mssql://SA:<B4b0rsh>@localhost/TheatreApp';

app.use(cors());
app.use(bodyParser.json());

app.get('/getMovies', async function (req, res) {
  await sql.connect(dbConnString);
  const result = await sql.query('select * from Threatre_Schema.Production');
  res.send(result.recordset);
});

app.get('/getTheatres', async function (req, res) {
  await sql.connect(dbConnString);
  const result = await sql.query('select * from Threatre_Schema.Theater');
  res.send(result.recordsets[0]);
});

app.post('/getMoviesbyTheatre', async function (req, res) {
  await sql.connect(dbConnString);
  const ID = req.body.ID;
  
  const result = await sql.query(`
    select * from Threatre_Schema.Production
    WHERE Threatre_Schema.Production.TheaterID = ${ ID }`);

  res.send(result.recordset);
});

app.listen(3000, function () {
  console.log('Theather server listening on port 3000!');
});
