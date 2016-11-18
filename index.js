var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');
//Need to enter username and password for your database
var connString = "postgres://localhost/assessbox";

var app = express();

app.use(bodyParser.json());
app.use(cors());

//The test doesn't like the Sync version of connecting,
//  Here is a skeleton of the Async, in the callback is also
//  a good place to call your database seeds.
var db = massive.connect({
        connectionString: connString
    },
    function(err, localdb) {
        //console.log(localdb);
        db = localdb;
        app.set('db', db);

        db.user_create_seed(function(err, res) {
            console.log(err);
            console.log("User Table Init");
        });

        db.vehicle_create_seed(function(err, res) {
            console.log(err);
            console.log("Vehicle Table Init")
        });
    });

//ENDPOINTS

//1
app.get('/api/users', function(req, res, next) {
    db.get_all_users(function(err, users) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(users);
    });
});

//2
app.get('/api/vehicles', function(req, res, next) {
    db.get_all_vehicles(function(err, vehicles) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(vehicles);
    });
});

//3
app.post('/api/users', function(req, res, next) {
    db.add_user([req.body.firstname, req.body.lastname, req.body.email], function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.sendStatus(200);
    })
});

//4
app.post('/api/vehicles', function(req, res, next) {
    db.add_vehicle([req.body.make, req.body.model, parseInt(req.body.year), parseInt(req.body.ownerId)], function(err, user) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.sendStatus(200);
    })
});

//5
app.get('/api/user/:userId/vehicleCount', function(req, res, next) {
    db.get_vehicle_count([req.params.userId], function(err, c) {
        console.log(c);
        console.log(err);
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json({
            count: parseInt(c)
        });
    });
});

//6
app.get('/api/user/:userId/vehicle', function(req, res, next) {
    db.get_vehicles_by_id([req.params.userId], function(err, vehicles) {
        if (err) {
            res.status(500).send(err);
            return;
        }
        res.json(vehicles);
    });
});

//7
app.get('/api/vehicle', function(req, res, next) {
  if(req.query.UserEmail){
    db.get_vehicles_by_email([decodeURIComponent(req.query.UserEmail)], function(err, v) {
        if (err) {
            console.log("!!!!");
            console.log(err);
            res.status(500).send(err);
            return;
        }
        res.json(v);
    });
  }else{
    db.get_vehicles_by_partial_name([req.query.userFirstStart], function(err, v){
      console.log(req.query.userFirstStart);

      if (err) {
        console.log(err);
          res.status(500).send(err);
          return;
      }
      console.log(v);
      res.json(v);
    })
  }

})

//8
app.get('/api/newervehiclesbyyear', function(req, res, next){
  db.get_new_vehicles(function(err, vehicles){
    console.log(err);
    if (err) {
        res.status(500).send(err);
        return;
    }

    res.json(vehicles);
  })
})

//9
app.put('/api/vehicle/:vehicleId/user/:userId', function(req, res, next){
  db.change_vehicle_ownership([req.params.userId, req.params.vehicleId], function(err, owner){
    if (err) {
        res.status(500).send(err);
        return;
    }
    res.sendStatus(200);
  });
});


//10
app.delete('/api/user/:userId/vehicle/:vehicleId', function(req, res, next){
  db.remove_ownership([req.params.vehicleId], function(err, r){
    console.log(err);
    if (err) {
        res.status(500).send(err);
        return;
    }
    res.sendStatus(200);
  })
});

//11
app.delete('/api/vehicle/:vehicleId', function(req, res, next){
  db.delete_vehicle([req.params.vehicleId], function(err, r){
    console.log(err);
    if (err) {
        res.status(500).send(err);
        return;
    }
    res.sendStatus(200);
  })
})

app.listen('3000', function() {
    console.log("Successfully listening on : 3000")
})

module.exports = app;
