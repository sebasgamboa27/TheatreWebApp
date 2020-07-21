const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sql = require('mssql');
const { ESRCH } = require('constants');
const app = express();

let user = 'SA';
let password = '<B4b0rsh>';
let dbConnString = `mssql://${user}:${password}@localhost/TheatreApp`;

app.use(cors());
app.use(bodyParser.json());

app.get('/getMovies', async function (req, res) {
  await sql.connect(dbConnString);
  const result = await sql.query('EXEC uspProductionsRead');  //Sustituir por EXEC uspProductionsRead
  res.send(result.recordset);
});

app.get('/getTheatres', async function (req, res) {
  await sql.connect(dbConnString);
  const result = await sql.query('EXEC uspTheatersRead');   //Sustituir por EXEC uspTheatersRead
  res.send(result.recordset);
});

app.post('/getMoviesbyTheatre', async function (req, res) {
  await sql.connect(dbConnString);
  const ID = req.body.ID;
  
  const result = await sql.query(`
  EXEC uspGetMoviesByTheater @THEATERID = ${ ID }`);                //Sustituir por EXEC uspGetMoviesByTheater @THEATERID = ${ ID }

  res.send(result.recordset);
});

app.post('/getPresentationsByMovie', async function (req, res) {
  await sql.connect(dbConnString);
  const ID = req.body.ID;
  
  const result = await sql.query(`
  EXEC uspGetPresentationsByProductions @PRODUCTIONID = ${ ID }`);      //Sustituir por EXEC uspGetPresentationsByProductions @PRODUCTIONID = ${ ID }

  res.send(result.recordset);
});

app.post('/getBlocksbyMovie', async function (req, res) {
  await sql.connect(dbConnString);
  const productionID = req.body.ProductionID;
  
  const result = await sql.query(`
  EXEC uspGetBlocksByProduction @PRODUCTIONID = ${ productionID }`);
                                                //Sustituir por EXEC uspGetBlocksByProduction @PRODUCTIONID = ${ productionID }
  res.send(result.recordset);
});

app.post('/getSeatsbyBlock', async function (req, res) {
  await sql.connect(dbConnString);
  const BlockID = req.body.BlockID;
  
  const result = await sql.query(`
  EXEC uspGetSeatsByBlock @BLOCKID = ${ BlockID }`);  //Sustituir por EXEC uspGetSeatsByBlock @BLOCKID = ${ BlockID }

  res.send(result.recordset);
});

app.post('/getOccupiedSeats', async function (req, res) {
  await sql.connect(dbConnString);
  const BlockID = req.body.BlockID;
  const PresentationID = req.body.PresentationID;
  
  const result = await sql.query(`
  EXEC uspGetOccupiedSeats @BLOCKID = ${ BlockID },@PresentationID = ${ PresentationID }`);
                          //Sustituir por EXEC uspGetOccupiedSeats @BLOCKID = ${ BlockID },@PresentationID = ${ PresentationID }
  res.send(result.recordset);
});


app.post('/getPricebySeat', async function (req, res) {
  await sql.connect(dbConnString);
  const BlockID = req.body.BlockID;
  const SeatID = req.body.SeatID;
  
  const result = await sql.query(`
  EXEC uspGetPriceBySeat @BLOCKID = ${ BlockID } ,@SEATID = ${ SeatID }`);
        //Sustituir por EXEC uspGetPriceBySeat @BLOCKID = ${ BlockID } ,@SEATID = ${ SeatID }
  res.send(result.recordset);
});

app.post('/insertReceipt', async function (req, res) {
  await sql.connect(dbConnString);
  const Date = req.body.Date;
  const ApprobationCode = req.body.ApprobationCode;
  const ClientID = req.body.ClientID;
  
  const result = await sql.query(`
  EXEC uspReceiptsInsert @Date = ${ Date } ,@CODE =${ ApprobationCode } ,@CLIENTID= ${ ClientID }`);
          // Sustituir por EXEC uspReceiptsInsert @Date = ${ Date } ,@CODE =${ ApprobationCode } ,@CLIENTID= ${ ClientID }
  res.send(result.recordset);
});


app.post('/insertBookings', async function (req, res) {
  await sql.connect(dbConnString);
  const PresentationID = req.body.PresentationID;
  const PaymentID = req.body.PaymentID;
  const SeatID = req.body.SeatID;
  
  const result = await sql.query(`
  EXEC uspBookingsInsert @SEATID = ${ SeatID } ,@PAYMENTID =${ PaymentID } ,@PRESENTATIONID= ${ PresentationID }`);
  res.send(result.recordset);
});

app.post('/insertPresentation', async function (req, res) {
  await sql.connect(dbConnString);
  const Hour = req.body.Hour;
  const Date = req.body.Date;
  const ProductionID = req.body.ProductionID;
  
  const result = await sql.query(`
  EXEC uspPresentationsInsert @HOUR = ${ Hour }, @DATE = ${ Date }, @PRESENTATIONID = ${ ProductionID }`);
  res.send(result.recordset);
});

app.post('/insertPrice', async function (req, res) {
  await sql.connect(dbConnString);
  const ProductionID = req.body.ProductionID;
  const BlockID = req.body.BlockID;
  const Price = req.body.Price;
  
  const result = await sql.query(`
  EXEC uspBlockPriceInsert @PRODUCTIONID = ${ ProductionID }, @BLOCKID = ${ BlockID }, @PRICE = ${ Price }`);
  res.send(result.recordset);
});


app.post('/updateProductionState', async function (req, res) {
  await sql.connect(dbConnString);
  const UpdateState = req.body.UpdateState;
  const ProductionID = req.body.ProductionID;
   
  const result = await sql.query(`EXEC uspProductionUpdateState @UPDATESTATE = ${ UpdateState } ,@PRODUCTIONID = ${ ProductionID }`);
  res.send(result.recordset);
});

app.post('/checkEmployeeLogin', async function (req, res) {
  await sql.connect(dbConnString);
  const Username = req.body.Username;
  const Password = req.body.Password;
   
  const result = await sql.query(`EXEC uspOfficeAuthentication @USERNAME = ${ Username } ,@PASSWORD = '${ Password }'`);

  if(result.recordset[0]['']){
    const info = await sql.query(`EXEC uspGetAuthenticationInfo @ID = 2`);
    console.log(info.recordset[0].Username);
    console.log(info.recordset[0].Password);
  }

  res.send(result.recordset);
});

app.post('/checkTheaterAdmin', async function (req, res) {
  await sql.connect(dbConnString);
  const Username = req.body.Username;
  const Password = req.body.Password;
   
  const result = await sql.query(`EXEC uspAdminAuthentication @USERNAME = ${ Username } ,@PASSWORD = '${ Password }'`);

  if(result.recordset[0]['']){
    const info = await sql.query(`EXEC uspGetAuthenticationInfo @ID = 3`);
    console.log(info.recordset[0].Username);
    console.log(info.recordset[0].Password);
  }

  res.send(result.recordset);
});

app.post('/checkSysAdmin', async function (req, res) {
  await sql.connect(dbConnString);
  const Username = req.body.Username;
  const Password = req.body.Password;
   
  const result = await sql.query(`EXEC uspSysAdminAuthentication @USERNAME = ${ Username } ,@PASSWORD = '${ Password }'`);

  if(result.recordset[0]['']){
    const info = await sql.query(`EXEC uspGetAuthenticationInfo @ID = 4`);
    console.log(info.recordset[0].Username);
    console.log(info.recordset[0].Password);
  }

  res.send(result.recordset);
});


app.post('/getAdminInfo', async function (req, res) {
  await sql.connect(dbConnString);
  const Username = req.body.Username;
   
  const result = await sql.query(`EXEC getAdminInfo @USERNAME = ${ Username }`);
  res.send(result.recordset);
});

app.post('/getSysAdminInfo', async function (req, res) {
  await sql.connect(dbConnString);
  const Username = req.body.Username;
   
  const result = await sql.query(`EXEC getSysAdminInfo @USERNAME = ${ Username }`);
  res.send(result.recordset);
});

app.post('/getEmployeeInfo', async function (req, res) {
  await sql.connect(dbConnString);
  const Username = req.body.Username;
   
  const result = await sql.query(`EXEC getOfficeEmployeesInfo @USERNAME = ${ Username }`);
  res.send(result.recordset);
});


app.post('/getTheaterID', async function (req, res) {
  await sql.connect(dbConnString);
  const TheaterName = req.body.TheaterName;
   
  const result = await sql.query(`EXEC uspGetTheaterID @THEATERNAME = '${ TheaterName }'`);
  res.send(result.recordset);
});

app.post('/clientByEmail', async function (req, res) {
  await sql.connect(dbConnString);
  const Email = req.body.Email;
   
  const result = await sql.query(`EXEC uspClientIDbyEmail @EMAIL = '${ Email }'`);
  res.send(result.recordset);
});

app.post('/clientCheck', async function (req, res) {
  await sql.connect(dbConnString);
  const Email = req.body.Email;
   
  const result = await sql.query(`EXEC uspClientCheck @EMAIL = '${ Email }'`);
  res.send(result.recordset);
});

app.post('/insertClient', async function (req, res) {
  await sql.connect(dbConnString);
  const Nombre = req.body.Nombre;
  const Email = req.body.Email;
  const Telefono = req.body.Telefono;
   
  const result = await sql.query(`EXEC uspInsertClient @NAME = ${ Nombre }, @EMAIL = '${ Email }', @PHONE = ${ Telefono }`);
  res.send(result.recordset);
});



app.post('/insertProduction', async function (req, res) {
  await sql.connect(dbConnString);
  const TheaterID = req.body.TheaterID;
  const Name = req.body.Name;
  const Type = req.body.Type;
  const Start = req.body.Start;
  const End = req.body.End;
  const Description = req.body.Description;
  const ImageURL = req.body.ImageURL;
   
  const result = await sql.query(`EXEC uspProductionsInsert @Name = ${ Name } ,@TYPE = '${ Type }', @START = ${ Start },
  @END = ${ End }, @DESCRIPTION = '${ Description }', @THEATERID = ${ TheaterID }, @IMAGEURL = '${ ImageURL }'`);
  res.send(result.recordset);
});

app.post('/insertTheater', async function (req, res) {
  await sql.connect(dbConnString);
  const Nombre = req.body.Nombre;
  const Email = req.body.Email;
  const Website = req.body.Website;
  const ClientServicePhone = req.body.ClientServicePhone;
  const TicketOfficePhone = req.body.TicketOfficePhone;
   
  const result = await sql.query(`EXEC uspTheatersInsert @NAME = ${ Nombre } ,@EMAIL = '${ Email }', @WEBSITE = '${ Website }',
  @SPHONE = ${ ClientServicePhone }, @OPHONE = '${ TicketOfficePhone }'`);
  res.send(result.recordset);
});

app.post('/insertEmployee', async function (req, res) {
  await sql.connect(dbConnString);
  const TheaterID = req.body.TheaterID;
  const Name = req.body.Name;
  const ID = req.body.ID;
  const Birth = req.body.Birth;
  const Sex = req.body.Sex;
  const Address = req.body.Address;
  const Email = req.body.Email;
  const PersonalP = req.body.PersonalP;
  const HomeP = req.body.HomeP;
  const OtherP = req.body.OtherP;
  const Username = req.body.Username;
  const Password = req.body.Password;
   
  const result = await sql.query(`EXEC uspEmployeesInsert @THEATERID = ${ TheaterID } ,@ID = ${ ID }, @NAME = ${ Name },
  @BIRTH = ${ Birth }, @SEX = '${ Sex }', @ADDRESS = '${ Address }', @EMAIL = '${ Email }',
  @PERSONALP = ${ PersonalP }, @HOMEP = ${ HomeP }, @OTHERP = ${ OtherP },
  @USERNAME = ${ Username }, @PASSWORD = '${ Password }'`);
  res.send(result.recordset);
});


app.post('/insertAdmins', async function (req, res) {
  await sql.connect(dbConnString);
  const TheaterID = req.body.TheaterID;
  const Name = req.body.Name;
  const ID = req.body.ID;
  const Birth = req.body.Birth;
  const Sex = req.body.Sex;
  const Address = req.body.Address;
  const Email = req.body.Email;
  const PersonalP = req.body.PersonalP;
  const HomeP = req.body.HomeP;
  const OtherP = req.body.OtherP;
  const Username = req.body.Username;
  const Password = req.body.Password;
   
  const result = await sql.query(`EXEC uspInsertAdmins @THEATERID = ${ TheaterID } ,@ID = ${ ID }, @NAME = ${ Name },
  @BIRTH = ${ Birth }, @SEX = '${ Sex }', @ADDRESS = '${ Address }', @EMAIL = '${ Email }',
  @PPHONE = ${ PersonalP }, @HPHONE = ${ HomeP }, @OPHONE = ${ OtherP },
  @USERNAME = ${ Username }, @PASSWORD = '${ Password }'`);
  res.send(result.recordset);
});


app.listen(3000, function () {
  console.log('Theather server listening on port 3000!');
});

app.post('/getCinemaListings', async function (req, res) {
  await sql.connect(dbConnString);
  const ID = req.body.ID;

  const result = await sql.query(`
  EXEC uspProductionsForPublic @THEATERID = ${ ID }`);                //Sustituir por EXEC uspGetMoviesByTheater @THEATERID = ${ ID }

  res.send(result.recordset);
});


app.post('/setUpBooking', async function (req, res) {
  await sql.connect(dbConnString);
  const Date = req.body.Date;
  const Code = req.body.Code;
  const ClientID = req.body.ClientID;
  const PresentationID = req.body.PresentationID;
  const SeatID = req.body.SeatID;
   
  const result = await sql.query(`EXEC uspSetABooking @DATE = ${ Date } ,@CODE = '${ Code }', @CLIENTID = '${ ClientID }',
  @PRESENTATIONID = ${ PresentationID }, @SEATID = '${ SeatID }'`);
  res.send(result.recordset);
});
