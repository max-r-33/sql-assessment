SELECT * FROM Users
JOIN Vehicles ON Users.ID = Vehicles.ownerId
WHERE Users.email = $1;
