SELECT * FROM Vehicles
JOIN Users ON Vehicles.ownerId = Users.ID
WHERE Users.firstname LIKE $1 || '%';
