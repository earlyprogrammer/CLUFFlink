
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var app = express();

var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;

var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit : 10,
	host : 'localhost',
	user : 'root',
	password : 'root',
	database : 'Clufflink',
	debug : false
});


passport.use(new localStrategy(function(username, password, done) {
	pool.getConnection(function(err,connection){
        if (err) {
			console.log("error getting connection to database");
			return;
        }
       
        connection.query("select * from users where username=?", [username],function(err,rows){
            connection.release();
            if(!err && rows.length > 0) {
                var user = rows[0];
				if (user.password == makeHash(password, user.salt))
					return done(null, user);
				else
					return done(null, false);
            }          
        });
	});
}));

passport.serializeUser(function(user, done) {
	done(null, user.person);
});
passport.deserializeUser(function(id, done) {
	
	pool.getConnection(function(err,connection){
        if (err) {
			console.log("error getting connection to database");
			return;
        }
       
        connection.query("select * from users where person=?", [id],function(err,rows){
            connection.release();
            if(!err && rows.length > 0) {
                done(null, rows[0]);
            }          
        });
	});
	
});

var crypto = require('crypto');


function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	
	res.status(401).send("resource protected");
}


var families;
var persons;



function makeHash(pass, salt){
	var hash = crypto.createHmac('sha512', salt);
    hash.update(pass);
	return hash.digest('hex');
}


//allow cors for dev, remove for prod
app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:4200");
	res.header("Access-Control-Allow-Credentials", 'true');
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Upgrade-Insecure-Requests, User-Agent");
	res.header("Upgrade-Insecure-Requests", "1");
	next();
});

app.use(bodyParser.json());

app.use(session({secret:'whatonearthshouldiuseasasecret',
					resave: false,
					saveUninitialized: false
				}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', function(req, res){
    res.sendFile("index.html", {root: "..\\client\\dist\\", headers: {'x-timestamp': Date.now(), 'x-sent': true}}, function(err) {
		if (err)
			console.log(err);
	});
});

app.get('/:file', function(req, res){
    res.sendFile(req.params.file, {root: "..\\client\\dist\\", headers: {'x-timestamp': Date.now(), 'x-sent': true}}, function(err) {
		if (err)
			console.log(err);
	});
});

app.get('/api/families', isLoggedIn, function( req, res ) {
	pool.getConnection(function(err,connection){
        if (err) {
          console.log("error getting connection to database");
          return;
        }
       
        connection.query("select * from families",function(err,rows){
            connection.release();
            if(!err) {
                res.send(rows);
            }          
        });
	});
});

app.get('/api/persons', isLoggedIn, function( req, res ) {
	pool.getConnection(function(err,connection){
        if (err) {
          console.log("error getting connection to database");
          return;
        }
       
        connection.query("select * from persons",function(err,rows){
            connection.release();
            if(!err) {
                res.send(rows);
            }          
        });
	});
});

app.get('/api/family/:id', isLoggedIn, function(request, response) {
	pool.getConnection(function(err,connection){
        if (err) {
			console.log("error getting connection to database");
			return;
        }
       
        connection.query("select * from families where id=?", [request.params.id],function(err,rows){
            connection.release();
            if(!err && rows.length > 0) {
                response.send(rows[0]);
            }          
        });
	});
});

app.post('/api/family/:id', isLoggedIn, function(request, response) {
	console.log("posting family with id=" + request.params.id);
	response.send("posting family with id=" + request.params.id);
});

app.put('/api/family/:id', isLoggedIn, function(request, response) {
	console.log("putting family with id=" + request.params.id);
	response.send("putting family with id=" + request.params.id);
});

app.delete('/api/family/:id', isLoggedIn, function(request, response) {
	console.log("deleting family with id=" + request.params.id);
	response.send("deleting family with id=" + request.params.id);
});

app.get('/api/person/:id', isLoggedIn, function(request, response) {
	pool.getConnection(function(err,connection){
        if (err) {
			console.log("error getting connection to database");
			return;
        }
       
        connection.query("select * from persons where id=?", [request.params.id],function(err,rows){
            connection.release();
            if(!err && rows.length > 0) {
                response.send(rows[0]);
            }          
        });
	});
});

app.post('/api/person/:id', isLoggedIn, function(request, response) {
	console.log("posting person with id=" + request.params.id);
	response.send("posting person with id=" + request.params.id);
});

app.put('/api/person/:id', isLoggedIn, function(request, response) {
	console.log("putting person with id=" + request.params.id);
	response.send("putting person with id=" + request.params.id);
});

app.delete('/api/person/:id', isLoggedIn, function(request, response) {
	console.log("deleting person with id=" + request.params.id);
	response.send("deleting person with id=" + request.params.id);
});


app.post('/api/login', 
	passport.authenticate('local'),
	function(req, res) {
		res.send("successfully authenticated");
	}
);

app.post('/api/judge', isLoggedIn, function(req, res) {
	judgement = req.body.result;
	username = req.body.username;
	
	if (judgement == "deny") {
		pool.getConnection(function(err,connection){
			if (err) {
				console.log("error getting connection to database");
				return;
			}
		   
			connection.query("delete from applications where username=?", [username],function(err,rows){
				connection.release();
				if(!err) {
					res.send("application denied");
				}          
			});
		});
	}
	else if (judgement == "accept") {
		id = req.body.id;
		
		pool.getConnection(function(err,connection){
			if (err) {
				console.log("error getting connection to database");
				return;
			}
		   
			connection.query("select * from applications where username=?", [username],function(err,rows){
				connection.release();
				if(!err && rows.length > 0) {
					
					var row = rows[0]
					
					pool.getConnection(function(err,connection){
						if (err) {
							console.log("error getting connection to database");
							return;
						}
					   
						connection.query("insert into users values (?, ?, ?, ?)", [row.username, id, row.password, row.salt],function(err,rows){
							connection.release();
							if(!err) {
								res.send("application accepted");
							}
							else {
								res.send("query broke");
							}
						});
					});
					
					pool.getConnection(function(err,connection){
						if (err) {
							console.log("error getting connection to database");
							return;
						}
					   
						connection.query("delete from applications where username=?", [username],function(err,rows){
							connection.release();        
						});
					});
					
				}          
			});
		});

	}
});

app.post('/api/signup', function(req, res) {
	
	pool.getConnection(function(err,connection){
        if (err) {
          console.log("error getting connection to database");
          return;
        }
       
        connection.query("select * from (select username from applications union all select username from users) a where username = ?",[req.body.username],function(err,rows){
            connection.release();
            if(!err) {
                if (rows.length > 0) {
					res.send("username already exists");
				}
				else {
					var salt = crypto.randomBytes(10).toString('hex');
					pool.getConnection(function(err,connection){
						if (err) {
						  console.log("error getting connection to database");
						  return;
						}
					   
						connection.query("insert into applications values (?,?,?)", [req.body.username, makeHash(req.body.password, salt), salt],function(err,rows){
							connection.release();
							if(!err) {
								res.send("successfully applied");
							}          
						});
					});
				}
            }          
        });
	});

});

app.get('/api/applications', isLoggedIn, function( req, res ) {
	pool.getConnection(function(err,connection){
        if (err) {
          console.log("error getting connection to database");
          return;
        }
       
        connection.query("select * from applications",function(err,rows){
            connection.release();
            if(!err) {
                res.send(rows.map(function(a) { return a.username }));
            }          
        });
	});
});

app.get('/api/logout', function(req, res) {
	req.logout();
});



app.listen(4242);

// Put a friendly message on the terminal
console.log("Server running at http://localhost:4242/");