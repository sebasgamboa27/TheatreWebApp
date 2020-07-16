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
  const result = await sql.query('select * from Threatre_Schema.Production');  //Sustituir por EXEC uspProductionsRead
  res.send(result.recordset);
});

app.get('/getTheatres', async function (req, res) {
  await sql.connect(dbConnString);
  const result = await sql.query('select * from Threatre_Schema.Theater');   //Sustituir por EXEC uspTheatersRead
  res.send(result.recordsets[0]);
});

app.post('/getMoviesbyTheatre', async function (req, res) {
  await sql.connect(dbConnString);
  const ID = req.body.ID;
  
  const result = await sql.query(`
    select * from Threatre_Schema.Production
    WHERE Threatre_Schema.Production.TheaterID = ${ ID }`);                //Sustituir por EXEC uspGetMoviesByTheater @THEATERID = ${ ID }

  res.send(result.recordset);
});

app.post('/getPresentationsByMovie', async function (req, res) {
  await sql.connect(dbConnString);
  const ID = req.body.ID;
  
  const result = await sql.query(`
    select p.Date,p.Hour,p.ProductionID,p.PresentationID from Threatre_Schema.Presentation as p
    WHERE p.ProductionID = ${ ID }                                        
    ORDER BY p.Date ASC, p.Hour ASC`);                     //Sustituir por EXEC uspGetPresentationsByProductions @PRODUCTIONID = ${ ID }

  res.send(result.recordset);
});

app.post('/getBlocksbyMovie', async function (req, res) {
  await sql.connect(dbConnString);
  const productionID = req.body.ProductionID;
  
  const result = await sql.query(`
    select b.BlockName,b.TheaterID,b.BlockID
    from Threatre_Schema.SeatBlocks as b,Threatre_Schema.Production as pro
    WHERE pro.ID = ${ productionID } AND pro.TheaterID = b.TheaterID`);
                                                //Sustituir por EXEC uspGetBlocksByProduction @PRODUCTIONID = ${ productionID }
  res.send(result.recordset);
});

app.post('/getSeatsbyBlock', async function (req, res) {
  await sql.connect(dbConnString);
  const BlockID = req.body.BlockID;
  
  const result = await sql.query(`
    select s.Row,s.Number,s.SeatID,s.BlockID   
    from Threatre_Schema.Seats as s
    WHERE s.BlockID = ${ BlockID }`);  //Sustituir por EXEC uspGetSeatsByBlock @BLOCKID = ${ BlockID }

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
                          //Sustituir por EXEC uspGetOccupiedSeats @BLOCKID = ${ BlockID },@PresentationID = ${ PresentationID }
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
        //Sustituir por EXEC uspGetPriceBySeat @BLOCKID = ${ BlockID } ,@SEATID = ${ SeatID }
  res.send(result.recordset);
});

app.post('/insertReceipt', async function (req, res) {
  await sql.connect(dbConnString);
  const Date = req.body.Date;
  const ApprobationCode = req.body.ApprobationCode;
  const ClientID = req.body.ClientID;
  
  const result = await sql.query(`
  INSERT INTO Threatre_Schema.Receipts
  OUTPUT INSERTED.ID
  VALUES (${ Date }, ${ ApprobationCode }, ${ ClientID })`);
          // Sustituir por EXEC uspReceiptsInsert @Date = ${ Date } ,@CODE =${ ApprobationCode } ,@CLIENTID= ${ ClientID }
  res.send(result.recordset);
});


app.post('/insertBookings', async function (req, res) {
  await sql.connect(dbConnString);
  const PresentationID = req.body.PresentationID;
  const PaymentID = req.body.PaymentID;
  const SeatID = req.body.SeatID;
  
  const result = await sql.query(`
  INSERT INTO Threatre_Schema.SeatPresentationBookings
  VALUES (${ PresentationID }, ${ PaymentID }, ${ SeatID })`);
        //Sustituir por EXEC uspBookingsInsert @SEATID = ${ SeatID } ,@PAYMENTID =${ PaymentID } ,@PRESENTATIONID= ${ PresentationID }
  res.send(result.recordset);
});

app.post('/checkEmployeeLogin', async function (req, res) {
  await sql.connect(dbConnString);
  const Email = req.body.PresentationID;
  const PaymentID = req.body.PaymentID;
  
  const result = await sql.query(`
      SELECT  
      CASE WHEN EXISTS (
        SELECT *
        FROM Threatre_Schema.Employees as e,Threatre_Schema.EmployeesTicketOfficeEmployees as t 
        WHERE e.Email = ${ Email } AND e.Password = ${ Email } and e.ID = t.ID)
      THEN CAST(1 AS BIT)
      ELSE CAST(0 AS BIT) END;`);
  res.send(result.recordset);
});



app.listen(3000, function () {
  console.log('Theather server listening on port 3000!');
});
