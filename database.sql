-- CREATE THE TABLE: 
CREATE TABLE koalas (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"gender" VARCHAR(30),
	"age" INT,
	"ready_to_transfer" BOOL,
	"notes" VARCHAR(200)
);

-- Insert multiple rows into the koalas table:
INSERT INTO koalas
	("name", "gender", "age", "ready_to_transfer", "notes")
	VALUES
	('Scotty', 'M', '4', 'True', 'Born in Guatemala'),
	('Jean', 'F', '5', 'True', 'Allergic to lots of lava'),
	('Ororo', 'F', '7', 'False', 'Loves listening to Paula (Abdul)'),
	('Logan', 'M', '15', 'False', 'Loves the sauna'),
	('Charlie', 'M', '9', 'True', 'Favorite band is Nirvana'),
	('Betsy', 'F', '4', 'True', 'Has a pet iguana');

-- In postico, this command will show what is in your table currently:
SELECT * FROM koalas;