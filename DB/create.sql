/*  
Une fois que vous avez installé MySQL :
sudo mysql -u root
CREATE USER 'alcatel'@'localhost' IDENTIFIED BY 'alcatel';
CREATE DATABASE PTT; 
GRANT PRIVILEGE ON PTT.* TO 'alcatel'@'localhost'; 
FLUSH PRIVILEGES; 
*/

USE PTT;

create table bubble_location
(
    bubble_GUID int             not null    primary key,
    name        varchar(255)    null,
    lattitude   decimal(9,6)    not null,
    longitude   decimal(9,6)    not null,
    creator     varchar(255)    not null
);

INSERT INTO PTT.bubble_location (bubble_GUID, name, lattitude, longitude, creator)
VALUES
    (1, 'Cathédrale Notre-Dame', 48.581356, 7.750776, 'Pierre Dubois'),
    (2, 'La Petite France', 48.579457, 7.751555, 'Sophie Martin'),
    (3, 'Palais Rohan', 48.581199, 7.749616, 'François Leclerc'),
    (4, 'Ponts couverts', 48.579169, 7.748985, 'Isabelle Dupont'),
    (5, 'Place Kléber', 48.583207, 7.748310, 'Antoine Leroux');