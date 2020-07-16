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


