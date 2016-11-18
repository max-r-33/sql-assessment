UPDATE Vehicles
SET ownerId = NULL
where ID = $1;
