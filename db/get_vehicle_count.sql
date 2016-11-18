SELECT count(userId) FROM VEHICLES
where ownerId = $1;
