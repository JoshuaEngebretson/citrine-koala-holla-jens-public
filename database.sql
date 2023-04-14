-- CREATE THE TABLE: 
CREATE TABLE koalas (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR(100),
	"gender" VARCHAR(30),
	"age" VARCHAR(3),
	"ready_to_transfer" VARCHAR(3),
	"notes" VARCHAR(200)
);

-- Insert multiple rows into the koalas table:
INSERT INTO koalas
	("name", "gender", "age", "ready_to_transfer", "notes")
	VALUES
	('Scotty', 'M', '4', 'Y', 'Born in Guatemala'),
	('Jean', 'F', '5', 'Y', 'Allergic to lots of lava'),
	('Ororo', 'F', '7', 'N', 'Loves listening to Paula (Abdul)'),
	('Logan', 'M', '15', 'N', 'Loves the sauna'),
	('Charlie', 'M', '9', 'Y', 'Favorite band is Nirvana'),
	('Betsy', 'F', '4', 'Y', 'Has a pet iguana');

-- In postico, this command will show what is in your table currently:
SELECT * FROM koalas;