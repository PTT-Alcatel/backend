/*  
Une fois que vous avez installé MySQL, pour tester en local :
sudo mysql -u root
CREATE USER 'alcatel'@'localhost' IDENTIFIED BY 'alcatel';
CREATE DATABASE PTT; 
GRANT ALL PRIVILEGES ON PTT.* TO 'alcatel'@'localhost'; 
FLUSH PRIVILEGES; 
*/

USE PTT;

CREATE TABLE IF NOT EXISTS bubble_location
(
    id          varchar(255)    primary key,
    name        varchar(255)    null,
    latitude    decimal(9,6)    not null,
    longitude   decimal(9,6)    not null,
    creatorId   varchar(255)    not null
);


INSERT INTO PTT.bubble_location (id, name, latitude, longitude, creatorId)
VALUES
    ('65a595ea3eeed148a9d016d3', 'Cathédrale Notre-Dame', 48.581356, 7.750776, '64396411edeb0f5ad6c4fe8a'),
    ('65a59df51b1b20c6d3557068', 'La Petite France', 48.579457, 7.751555, '64396411edeb0f5ad6c4fe8a'),
    ('65a59fef1b1b20c6d35572f9', 'Palais Rohan', 48.581199, 7.749616, '64396411edeb0f5ad6c4fe8a'),
    ('65a5a2e41b1b20c6d35575fb', 'Ponts couverts', 48.579169, 7.748985, '64396411edeb0f5ad6c4fe8a'),
    ('65a5a3641b1b20c6d35576e4', 'Place Kléber', 48.583207, 7.748310, '64396411edeb0f5ad6c4fe8a');
