var express = require('express');
var router = express.Router();

/* GET todos listing. */
router.get('/', function(req, res, next) {
  const mysql = require('mysql');
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'my_node_app',
		password: 'my_node_app',
		database: 'my_node_app'
});
connection.connect();

connection.query('SELECT 1 + 1 AS solution', (err, rows, fields) => {
	if (err) throw err;
	res.send(`The solution is: ${rows[0].solution}`);
})

connection.end();
});

/* POST create todo. */
router.post('/', function(req, res, next) {
	const title = req.body.title;
	const content = req.body.content;
	const mysql = require('mysql');
	const connection = mysql.createConnection({
		host: 'localhost',
		user: 'my_node_app',
		password: 'my_node_app',
		database: 'my_node_app'
	});

	connection.connect();

	const query = 'INSERT INTO `todos` (`title`, `content`, `created_at`, `updated_at`)' +
		'VALUES (?, ?, SYSDATE(), SYSDATE())';
	connection.query(query, 
		[title, content],
		(err, rows, fields) => {
			if (err) throw err;

	res.send(`respond with a new resource ${title} ${content}`);
});

	connection.end();
});

/* GET show todo. */
router.get('/:id', function(req, res, next) {
	res.send(`respond with a resource id ${req.params.id}`);
});

module.exports = router;
