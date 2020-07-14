const express = require('express');
const cors = require('cors');
const sql = require('mssql');
const { ESRCH } = require('constants');
const app = express();

app.use(cors());

const dbConnString = 'mssql://SA:<B4b0rsh>@localhost/TheatreApp';

app.get('/getMovies', async function (req, res) {
  await sql.connect(dbConnString);
  const result = await sql.query('select * from Threatre_Schema.Production');
  res.send(result.recordsets[0]);
});

app.listen(3000, function () {
  console.log('Theather server listening on port 3000!');
});