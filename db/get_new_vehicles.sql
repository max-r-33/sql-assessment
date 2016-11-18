SELECT Vehicles.year, Users.firstname, Users.lastname FROM Vehicles
JOIN Users on Vehicles.ownerId = Users.ID
WHERE Vehicles.year > 2000
ORDER BY Vehicles.year DESC
