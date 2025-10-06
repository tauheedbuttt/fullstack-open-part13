CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int default 0
);

INSERT INTO blogs (author,url,title,likes)
	VALUES ('Mr Smith','localhost:3000','Harry Potter',0);
INSERT INTO blogs (author,url,title,likes)
	VALUES ('Mr Smith','localhost:3000','Twilight',0);
