CREATE PROCEDURE uspAdminAuthentication
                        @USERNAME NVARCHAR(50),
                        @PASSWORD NVARCHAR(50),
                        @VALIDATION BIT = 0 OUTPUT

        AS
            SET @VALIDATION = 0;

            IF ( EXISTS(SELECT *
                    FROM TheaterAdmins a
                            INNER JOIN
                         Employees e ON (a.ID = e.ID)
                    WHERE e.Username = @USERNAME AND e.Password = @PASSWORD
                ))
                BEGIN;
                    SET @VALIDATION = 1
                END;
            SELECT @VALIDATION
go

CREATE PROCEDURE uspBookingsInsert
                    @SEATID INT,
                    @PAYMENTID INT,
                    @PRESENTATIONID INT
    AS
        INSERT INTO SeatPresentationBookings
        VALUES (@PRESENTATIONID,@SEATID,@PAYMENTID)
go

CREATE PROCEDURE uspGetBlocksByProduction
                    @PRODUCTIONID INT
    AS
        SELECT b.BlockName,b.TheaterID,b.BlockID
            FROM SeatBlocks b
                    INNER JOIN
                 Productions p on b.TheaterID = p.TheaterID
            WHERE p.ID = @PRODUCTIONID
go

CREATE PROCEDURE uspGetMoviesByTheater
                    @THEATERID INT
    AS
        SELECT *
            FROM Productions
            WHERE TheaterID = @THEATERID
go

CREATE PROCEDURE uspGetOccupiedSeats
                    @BLOCKID INT,
                    @PresentationID INT
    AS
        SELECT s.Row,s.Number,s.SeatID,s.BlockID
            FROM Seats s
                    INNER JOIN
                 SeatPresentationBookings SPB on s.SeatID = SPB.SeatID
            WHERE s.BlockID = @BLOCKID AND SPB.PresentationID = @PresentationID
go

CREATE PROCEDURE uspGetPresentationsByProductions
                    @PRODUCTIONID INT
    AS
        SELECT p.Date,p.Hour,p.ProductionID,p.PresentationID
            FROM Presentations AS p
            WHERE ProductionID = @PRODUCTIONID
            ORDER BY p.Date ASC,p.Hour ASC
go

CREATE PROCEDURE uspGetPriceBySeat
                    @BLOCKID INT,
                    @SEATID INT
    AS
        SELECT pbp.price
            FROM ProductionBlockPrices pbp
                    INNER JOIN
                 Seats S on pbp.BlockID = S.BlockID
            WHERE pbp.BlockID = @BLOCKID AND SeatID = @SEATID
go

CREATE PROCEDURE uspGetSeatsByBlock
                    @BLOCKID INT
    AS
        SELECT s.Row,s.Number,s.SeatID,s.BlockID
            FROM Seats s
            WHERE s.BlockID = @BLOCKID
go

CREATE PROCEDURE uspOfficeAuthentication
                        @USERNAME NVARCHAR(50),
                        @PASSWORD NVARCHAR(50),
                        @VALIDATION BIT = 0 OUTPUT

        AS
            SET @VALIDATION = 0;

            IF ( EXISTS(SELECT *
                    FROM TicketOfficeEmployees a
                            INNER JOIN
                         Employees e ON (a.ID = e.ID)
                    WHERE e.Username = @USERNAME AND e.Password = @PASSWORD
                ))
                BEGIN;
                    SET @VALIDATION = 1
                END;
            SELECT @VALIDATION
go

CREATE PROCEDURE uspProductionsRead

    AS
        SELECT *
            FROM Productions
go

CREATE PROCEDURE uspReceiptsInsert
                    @Date DATE,
                    @CODE INT,
                    @CLIENTID INT
    AS
        INSERT INTO Receipts
        OUTPUT INSERTED.ID
        VALUES (@Date,@CODE,@CLIENTID)
go

CREATE PROCEDURE uspSeatInsertRow
                        @ROW VARCHAR(1) = NULL,
                        @BLOCKID INT = NULL,
                        @TOTAL INT = 0,
                        @CONT INT = 0
    AS

        WHILE (@CONT < @TOTAL)
        BEGIN;
        SET @CONT = @CONT + 1;
        INSERT INTO Seats (Row, Number, BlockID)
        VALUES (@ROW,@CONT,@BLOCKID);
        END;
go

CREATE PROCEDURE uspSysAdminAuthentication
                        @USERNAME NVARCHAR(50),
                        @PASSWORD NVARCHAR(50),
                        @VALIDATION BIT = 0 OUTPUT

        AS
            SET @VALIDATION = 0;

            IF ( EXISTS(SELECT *
                    FROM SystemAdmins a
                            INNER JOIN
                         Employees e ON (a.ID = e.ID)
                    WHERE e.Username = @USERNAME AND e.Password = @PASSWORD
                ))
                BEGIN;
                    SET @VALIDATION = 1
                END;
            SELECT @VALIDATION
go

CREATE PROCEDURE uspTheatersRead

    AS
        SELECT *
            FROM Theaters
go


-------------------------------------------------------------------------- SECOND UPDATE --------------------------------------------------------------------------------

CREATE PROCEDURE getAdminInfo
                @USERNAME NVARCHAR(50)

        AS
            SELECT e.EmployeeName,t.TheaterName
                FROM Employees e
                        INNER JOIN
                     TheaterAdmins ta on e.ID = ta.ID
                        INNER JOIN
                     Theaters t on ta.TheaterID = t.ID
                WHERE e.Username = @USERNAME
go


CREATE PROCEDURE uspProductionsInsert
                    @THEATERID INT,
                    @Name NVARCHAR(50),
                    @TYPE NVARCHAR(50),
                    @START DATE,
                    @END DATE,
                    @DESCRIPTION NVARCHAR(MAX),
                    @IMAGEURL NVARCHAR(MAX)

        AS
            INSERT INTO Productions (Name,Type, StartDate, FinishDate, Description, TheaterID, ImageURL)
            VALUES (@Name,@TYPE,@START,@END,@DESCRIPTION,@THEATERID,@IMAGEURL)
go

-------------------------------------------------------------------------- THIRD UPDATE --------------------------------------------------------------------------------


CREATE PROCEDURE uspEmployeesInsert
                        @THEATERID INT,                  
                        @ID INT,
                        @NAME NVARCHAR(MAX),
                        @BIRTH DATE,
                        @SEX VARCHAR(1) = NULL,
                        @ADDRESS NVARCHAR(MAX) = NULL,
                        @EMAIL NVARCHAR(50) = NULL,
                        @PERSONALP VARCHAR(8) = NULL,
                        @HOMEP VARCHAR(8) = NULL,
                        @OTHERP VARCHAR(8) = NULL,
                        @USERNAME NVARCHAR(50),
                        @PASSWORD NVARCHAR(50)

        AS
            INSERT INTO Employees(ID, EmployeeName, BirthDate, Sex, Address, Email, PersonalPhone, HomePhone, OtherPhone, Username, Password)
            VALUES (@ID,@NAME,@BIRTH,@SEX,@ADDRESS,@EMAIL,@PERSONALP,@HOMEP,@OTHERP,@USERNAME,@PASSWORD)

            INSERT INTO TicketOfficeEmployees(ID, TheaterID)
            VALUES (@ID,@THEATERID)

go

CREATE PROCEDURE uspPresentationsInsert
                    @HOUR TIME,
                    @DATE DATE,
                    @PRESENTATIONID INT
    AS
        INSERT INTO Presentations(Hour, Date, ProductionID)
        VALUES (@HOUR,@Date,@PRESENTATIONID )

go

CREATE PROCEDURE uspBlockPriceInsert
                        @PRODUCTIONID INT,
                        @BLOCKID INT,
                        @PRICE INT

    AS
        INSERT INTO ProductionBlockPrices (ProductionID, BlockID, Price)
        VALUES (@PRODUCTIONID,@BLOCKID,@PRICE)
go

CREATE PROCEDURE uspProductionUpdateState
                @UPDATESTATE NVARCHAR(30),
                @PRODUCTIONID INT

    AS
        UPDATE Productions
        SET State = @UPDATESTATE
        FROM Productions
        WHERE ID = @PRODUCTIONID

go

CREATE PROCEDURE uspGetTheaterID
                    @THEATERNAME nvarchar(50)
    AS
        SELECT ID
            FROM Theaters
            WHERE TheaterName = @THEATERNAME
go

-------------------------------------------------------------------------- FOURTH UPDATE --------------------------------------------------------------------------------


CREATE PROCEDURE uspTheatersInsert
                        @NAME NVARCHAR(50),
                        @EMAIL NVARCHAR(50),
                        @WEBSITE NVARCHAR(50),
                        @SPHONE VARCHAR(8),
                        @OPHONE VARCHAR(8)

    AS
        INSERT INTO Theaters(THEATERNAME, EMAIL, WEBSITE, CLIENTSERVICEPHONE, TICKETOFFICEPHONE)
        VALUES (@NAME,@EMAIL,@WEBSITE,@SPHONE,@OPHONE)

go

CREATE PROCEDURE uspInsertAdmins
                    @THEATERID INT,
                    @ID INT,
                    @NAME NVARCHAR(MAX),
                    @BIRTH DATE,
                    @SEX VARCHAR(1),
                    @ADDRESS NVARCHAR(MAX),
                    @EMAIL NVARCHAR(50),
                    @HPHONE VARCHAR(8),
                    @PPHONE VARCHAR(8),
                    @OPHONE VARCHAR(8),
                    @USERNAME NVARCHAR(50),
                    @PASSWORD NVARCHAR(50)

        AS
            INSERT INTO Employees(ID, EmployeeName, BirthDate, Sex, Address, Email, PersonalPhone, HomePhone, OtherPhone, Username, Password)
            VALUES (@ID,@NAME,@BIRTH,@SEX,@ADDRESS,@EMAIL,@PPHONE,@HPHONE,@OPHONE,@USERNAME,@PASSWORD)

            INSERT INTO TheaterAdmins(ID, TheaterID)
            VALUES (@ID,@THEATERID)

go