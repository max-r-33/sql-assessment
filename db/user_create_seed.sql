-- It may be helpful to drop and reinstantilize the table when doing
-- the tests in case you delete users/cars the tests are expecting to see
DROP TABLE IF EXISTS users;
CREATE TABLE Users (
  ID SERIAL PRIMARY KEY NOT NULL,
  firstname TEXT,
  lastname TEXT,
  email TEXT
);

INSERT INTO Users (firstname, lastname, email)
VALUES ('John', 'Smith', 'John@Smith.com'),
('Dave', 'Davis', 'Dave@Davis.com'),
('Jane', 'Janis', 'Jane@Janis.com');
