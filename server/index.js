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

app.post('/getPresentationsByMovie', async function (req, res) {
  await sql.connect(dbConnString);
  const ID = req.body.ID;
  
  const result = await sql.query(`
    select p.Date,p.Hour,p.ProductionID,p.PresentationID from Threatre_Schema.Presentation as p
    WHERE p.ProductionID = ${ ID }
    ORDER BY p.Date ASC, p.Hour ASC`);

  res.send(result.recordset);
});

app.post('/getBlocksbyMovie', async function (req, res) {
  await sql.connect(dbConnString);
  const productionID = req.body.ProductionID;
  
  const result = await sql.query(`
    select b.BlockName,b.TheaterID,b.BlockID
    from Threatre_Schema.SeatBlocks as b,Threatre_Schema.Production as pro
    WHERE pro.ID = ${ productionID } AND pro.TheaterID = b.TheaterID`);

  res.send(result.recordset);
});

app.post('/getSeatsbyBlock', async function (req, res) {
  await sql.connect(dbConnString);
  const BlockID = req.body.BlockID;
  
  const result = await sql.query(`
    select s.Row,s.Number,s.SeatID,s.BlockID
    from Threatre_Schema.Seats as s
    WHERE s.BlockID = ${ BlockID }`);

  res.send(result.recordset);
});

app.post('/getOccupiedSeats', async function (req, res) {
  await sql.connect(dbConnString);
  const BlockID = req.body.BlockID;
  const PresentationID = req.body.PresentationID;
  
  const result = await sql.query(`
    select s.Row,s.Number,s.SeatID,s.BlockID  
    from Threatre_Schema.Seats as s,Threatre_Schema.SeatPresentationBookings as spb
    WHERE s.BlockID = ${ BlockID } AND
    s.SeatID = spb.SeatID AND
    spb.PresentationID = ${ PresentationID }`);

  res.send(result.recordset);
});


app.post('/getPricebySeat', async function (req, res) {
  await sql.connect(dbConnString);
  const BlockID = req.body.BlockID;
  const SeatID = req.body.SeatID;
  
  const result = await sql.query(`
    select pbp.Price  
    from Threatre_Schema.Seats as s,Threatre_Schema.ProductionBlockPrices as pbp
    WHERE s.BlockID = ${ BlockID } AND
    pbp.BlockID =  ${ BlockID } AND
    s.SeatID = ${ SeatID }`);

  res.send(result.recordset);
});



app.listen(3000, function () {
  console.log('Theather server listening on port 3000!');
});
