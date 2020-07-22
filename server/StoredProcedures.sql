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

-------------------------------------------------------------------------- FIFTH UPDATE --------------------------------------------------------------------------------


CREATE PROCEDURE uspClientIDbyEmail
                @EMAIL NVARCHAR(50)

    AS

        SELECT ID
            FROM Clients
            WHERE Email = @EMAIL

go

CREATE PROCEDURE uspInsertClient
                    @NAME NVARCHAR(50),
                    @EMAIL NVARCHAR(50),
                    @PHONE VARCHAR(8) = NULL
                    

        AS

            INSERT INTO Clients(NAME, PHONE, EMAIL)
            OUTPUT Inserted.ID
            VALUES (@NAME,@PHONE,@EMAIL)

go

CREATE PROCEDURE uspClientCheck
                @EMAIL NVARCHAR(50),
                @VALIDATION BIT = 0 OUTPUT

        AS

            SET @VALIDATION = 0

            IF(EXISTS(
                    SELECT *
                        FROM Clients
                        WHERE @EMAIL = Email
                ))
                BEGIN;
                    SET @VALIDATION = 1
                END;

            SELECT @VALIDATION
go


-------------------------------------------------------------------------- SIXTH UPDATE --------------------------------------------------------------------------------

CREATE VIEW vAdminsWithTheater

    AS

        SELECT e.ID,EmployeeName,TheaterID,TheaterName,Username
            FROM Employees e
                    INNER JOIN
                 TheaterAdmins te on te.ID = e.ID
                    INNER JOIN
                 Theaters T on te.TheaterID = T.ID
go

CREATE VIEW vEmployeesWithTheater

    AS

        SELECT e.ID,EmployeeName,TheaterID,TheaterName,Username
            FROM Employees e
                    INNER JOIN
                 TicketOfficeEmployees te on te.ID = e.ID
                    INNER JOIN
                 Theaters T on te.TheaterID = T.ID
go


CREATE PROCEDURE getEmployeeTheater
                    @EmployeeID INT

    AS
        SELECT TheaterID,TheaterName
            FROM vEmployeesWithTheater
            WHERE @EmployeeID = ID

go

CREATE PROCEDURE getAdminTheater
                    @EmployeeID INT

    AS
        SELECT TheaterID,TheaterName
            FROM vEmployeesWithTheater
            WHERE @EmployeeID = ID
go

CREATE PROCEDURE getOfficeEmployeesInfo
                @USERNAME NVARCHAR(50)

        AS
            SELECT ID,EmployeeName,TheaterID,TheaterName
                FROM vEmployeesWithTheater
                WHERE Username = @USERNAME
go

CREATE PROCEDURE getAdminInfo
                @USERNAME NVARCHAR(50)

        AS
            SELECT ID,EmployeeName,TheaterID,TheaterName
                FROM vAdminsWithTheater
                WHERE Username = @USERNAME
go

CREATE PROCEDURE uspSetABooking
                    @DATE DATE,
                    @CODE INT,
                    @CLIENTID INT,
                    @PRESENTATIONID INT,
                    @SEATID INT

    AS
        DECLARE @PAYMENTID INT;

        SET @PAYMENTID =  (SELECT ID
                            FROM Receipts
                            WHERE @DATE = Date AND @CODE = ApprobationCode)

        BEGIN TRAN
            IF(@PAYMENTID IS NULL)
            BEGIN;
                INSERT INTO Receipts(Date, ApprobationCode, ClientID)
                VALUES (@DATE,@CODE,@CLIENTID)
                INSERT INTO SeatPresentationBookings(PresentationID, SeatID, PaymentID)
                VALUES (@PRESENTATIONID,@SEATID,@PAYMENTID)
            END;

            IF(@PAYMENTID IS NOT NULL)
            BEGIN;
                INSERT INTO SeatPresentationBookings(PresentationID, SeatID, PaymentID)
                VALUES (@PRESENTATIONID,@SEATID,@PAYMENTID)
            END;

        COMMIT TRAN

go

CREATE TRIGGER AdminSysDisjunto
        ON SystemAdmins
        FOR INSERT

    AS

        IF (EXISTS(
                SELECT *
                    FROM TheaterAdmins a,
                         inserted i,
                         TicketOfficeEmployees toe
                    WHERE a.ID = i.ID OR toe.ID = i.ID
            ))
            BEGIN;
                RAISERROR ('El empleado ingresado ya pertence a otro sector',16,1)
                ROLLBACK TRAN
            END;
go

CREATE TRIGGER AdminDisjunto
        ON TheaterAdmins
        FOR INSERT

    AS

        IF (EXISTS(
                SELECT *
                    FROM SystemAdmins sa,
                         inserted i,
                         TicketOfficeEmployees toe
                    WHERE sa.ID = i.ID OR toe.ID = i.ID
            ))
            BEGIN;
                RAISERROR ('El empleado ingresado ya pertence a otro sector',16,1)
                ROLLBACK TRAN
            END;
go

CREATE TRIGGER EmpleadoBoleteríaDisjunto
        ON TicketOfficeEmployees
        FOR INSERT

    AS

        IF (EXISTS(
                SELECT *
                    FROM TheaterAdmins a,
                         inserted i,
                         SystemAdmins sa
                    WHERE a.ID = i.ID OR sa.ID = i.ID
            ))
            BEGIN;
                RAISERROR ('El empleado ingresado ya pertence a otro sector',16,1)
                ROLLBACK TRAN
            END;
go

CREATE TRIGGER AdminSolo1Teatro
        ON TheaterAdmins
        FOR INSERT

    AS

        IF (EXISTS(
                SELECT *
                    FROM TheaterAdmins a
                            INNER JOIN
                         inserted i ON a.ID = i.ID

            ))
            BEGIN;
                RAISERROR ('La persona ingresada ya administra un teatro',16,1)
                ROLLBACK TRAN
            END;

GO

CREATE TRIGGER Prodution1TheaterOnly
        ON Productions
        FOR INSERT

    AS

        IF (EXISTS(
                SELECT *
                    FROM Productions p, inserted i
                WHERE p.Name = i.Name

            ))
            BEGIN;
                RAISERROR ('La producción ya pertenece a otro teatro',16,1)
                ROLLBACK TRAN
            END;
go

-------------------------------------------------------------------------- Seventh UPDATE --------------------------------------------------------------------------------


CREATE PROCEDURE uspGetAuthenticationInfo
                        @ID INT

    AS

        SELECT Username,Password
            FROM DBAuthentication
            WHERE @ID = ID
    
go

------- Grant users procedures SQL Query------------

USE TheatreApp
GRANT EXECUTE ON OBJECT :: [dbo].[<Procedure>]
    TO client


            