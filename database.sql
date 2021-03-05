CREATE TABLE "user"
(
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);

CREATE TABLE trips
(
    id SERIAL PRIMARY KEY,
    title character varying(80) NOT NULL,
    user_id integer REFERENCES "user",
    start_date date,
    end_date date,
    difficulty integer,
    experience integer,
    area text,
    entry_point integer
);

CREATE TABLE "trip_members"
(
    "id" SERIAL PRIMARY KEY,
    "trip_id" integer REFERENCES "trips",
    "first_name" VARCHAR NOT NULL,
    "last_name" VARCHAR NOT NULL,
    "age" integer NOT NULL,
    "exercise" integer NOT NULL,
    "email" VARCHAR NOT NULL,
    "role" VARCHAR
);
CREATE TABLE "entry_points"
(
    "number" integer PRIMARY KEY,
    "name" VARCHAR,
    "link" VARCHAR,
    "address" VARCHAR,
    "difficulty" integer
);

CREATE TABLE "packing_list_items"
(
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR,
    "quantity" integer,
    "trip_id" integer REFERENCES "trips",
    "have" boolean DEFAULT false,
    "displayOrder" integer
);
CREATE TABLE group_packing_list_items
(
    id SERIAL PRIMARY KEY,
    name character varying,
    quantity integer,
    trip_id integer REFERENCES trips(id),
    have boolean DEFAULT false,
    "displayOrder" integer,
    rental boolean DEFAULT false
);

Create TABLE meals
(
    id SERIAL PRIMARY KEY,
    name character varying,
    meal integer,
    day integer,
    trip_id integer REFERENCES trips
);
Create TABLE meal_ingredients
(
    id SERIAL PRIMARY KEY,
    name character varying,
    meal_id integer REFERENCES meals
);

---add entry points
INSERT INTO entry_points
    (number, name, link, difficulty)
VALUES
    ( 4, 'Crab Lake and Cummings from Burntside Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=4&ft=e&zoom=14&size=500&ft=e&locname=Crab%20Lake%20and%20Cummings%20from%20Burntside%20Lake', 1),
    (6, 'Slim Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=6&ft=e&zoom=14&size=500&ft=e&locname=Slim%20Lake', 1),
    (7, 'Big Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=7&ft=e&zoom=14&size=500&ft=e&locname=Big%20Lake', 1),
    (8, 'Moose River (south)', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=8&ft=e&zoom=14&size=500&ft=e&locname=Moose%20River%20(south)', 2),
    (9, 'Little Indian Sioux River (south)', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=9&ft=e&zoom=14&size=500&ft=e&locname=Little%20Indian%20Sioux%20River%20(south)', 2),
    (14, 'Little Indian Sioux River (north)', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=14&ft=e&zoom=14&size=500&ft=e&locname=Little%20Indian%20Sioux%20River%20(north)', 2),
    (16, 'Moose/Portage River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=16&ft=e&zoom=14&size=500&ft=e&locname=Moose/Portage%20River%20(north)', 3),
    (19, 'Stuart River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=19&ft=e&zoom=14&size=500&ft=e&locname=Stuart%20River', 3),
    (20, 'Angleworm Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=20&ft=e&zoom=14&size=500&ft=e&locname=Angleworm%20Lake', 3);

--no difficulty level
INSERT INTO entry_points
    (number, name, link)
VALUES
    (22, 'Mudro Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=22&ft=e&zoom=14&size=500&ft=e&locname=Mudro%20Lake%20(restricted--no%20camping%20on%20Horse%20Lake)'),
    (23, 'Mudro Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=23&ft=e&zoom=14&size=500&ft=e&locname=Mudro%20Lake'),
    (26, 'Wood Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=26&ft=e&zoom=14&size=500&ft=e&locname=Wood%20Lake'),
    (28, 'Snowbank Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=28&ft=e&zoom=14&size=500&ft=e&locname=Snowbank%20Lake%20Only'),
    (29, 'North Kawishiwi River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=29&ft=e&zoom=14&size=500&ft=e&locname=North%20Kawishiwi%20River'),
    (30, 'Lake One', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=30&ft=e&zoom=14&size=500&ft=e&locname=Lake%20One'),
    (32, 'South Kawishiwi River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=32&ft=e&zoom=14&size=500&ft=e&locname=South%20Kawishiwi%20River'),
    (33, 'Little Gabbro Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=33&ft=e&zoom=14&size=500&ft=e&locname=Little%20Gabbro%20Lake'),
    (34, 'Island River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=34&ft=e&zoom=14&size=500&ft=e&locname=Island%20River'),
    (35, 'Isabella Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=35&ft=e&zoom=14&size=500&ft=e&locname=Isabella%20Lake'),
    (36, 'Hog Creek', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=36&ft=e&zoom=14&size=500&ft=e&locname=Hog%20Creek'),
    (37, 'Kawishiwi Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=37&ft=e&zoom=14&size=500&ft=e&locname=Kawishiwi%20Lake'),
    (38, 'Sawbill Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=38&ft=e&zoom=14&size=500&ft=e&locname=Sawbill%20Lake'),
    (39, 'Baker Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=39&ft=e&zoom=14&size=500&ft=e&locname=Baker%20Lake'),
    (40, 'Homer Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=40&ft=e&zoom=14&size=500&ft=e&locname=Homer%20Lake'),
    (41, 'Brule Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=41&ft=e&zoom=14&size=500&ft=e&locname=Brule%20Lake'),
    (43, 'Bower Trout Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=43&ft=e&zoom=14&size=500&ft=e&locname=Bower%20Trout%20Lake'),
    (44, 'Ram Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=44&ft=e&zoom=14&size=500&ft=e&locname=Ram%20Lake'),
    (45, 'Morgan Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=45&ft=e&zoom=14&size=500&ft=e&locname=Morgan%20Lake'),
    (47, 'Lizz and Swamp Lakes', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=47&ft=e&zoom=14&size=500&ft=e&locname=Lizz%20and%20Swamp%20Lakes'),
    (48, 'Meeds Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=48&ft=e&zoom=14&size=500&ft=e&locname=Meeds%20Lake'),
    (49, 'Skipper and Portage Lakes', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=49&ft=e&zoom=14&size=500&ft=e&locname=Skipper%20and%20Portage%20Lakes'),
    (50, 'Cross Bay Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=50&ft=e&zoom=14&size=500&ft=e&locname=Cross%20Bay%20Lake'),
    (51, 'Missing Link Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=51&ft=e&zoom=14&size=500&ft=e&locname=Missing%20Link%20Lake'),
    (52, 'Brant Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=52&ft=e&zoom=14&size=500&ft=e&locname=Brant%20Lake'),
    (54, 'Seagull Lake Only', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=54A&ft=e&zoom=14&size=500&ft=e&locname=Seagull%20Lake%20Only'),
    (55, 'Saganaga Lake Only', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=55A&ft=e&zoom=14&size=500&ft=e&locname=Saganaga%20Lake%20Only'),
    (57, 'Magnetic Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=57&ft=e&zoom=14&size=500&ft=e&locname=Magnetic%20Lake'),
    (58, 'South Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=58&ft=e&zoom=14&size=500&ft=e&locname=South%20Lake'),
    (60, 'Duncan Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=60&ft=e&zoom=14&size=500&ft=e&locname=Duncan%20Lake'),
    (61, 'Daniels Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=61&ft=e&zoom=14&size=500&ft=e&locname=Daniels%20Lake'),
    (66, 'Crocodile River', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=66&ft=e&zoom=14&size=500&ft=e&locname=Crocodile%20River'),
    (67, 'Bog Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=67&ft=e&zoom=14&size=500&ft=e&locname=Bog%20Lake'),
    (68, 'Pine Lake', 'https://bwca.com/index.cfm?fuseaction=maps.entrydetail&locid=68&ft=e&zoom=14&size=500&ft=e&locname=Pine%20Lake')
;


Create TABLE outfitters
(
    id SERIAL PRIMARY KEY,
    "name" VARCHAR,
    link VARCHAR,
    address VARCHAR,
    description VARCHAR,
    phone VARCHAR
);
Create TABLE outfitter_reference_table
(
    entry_point_number integer REFERENCES entry_points,
    outfitter_id integer REFERENCES outfitters
);

INSERT INTO outfitters
    (name, link, address, description)
VALUES
    ('Sawbill Canoe Outfitters', 'https://sawbill.com/', '4620 Sawbill Trail, Tofte, MN 55615', 'Sawbill Canoe Outfitters was started in 1957 by Frank and Mary Alice Hansen, who began with a just few sleeping bags and six canoes.Today, Sawbill Canoe Outfitters offers a full line of services. Our third-generation owners Clare and Dan Shirley continue the family tradition of helping people enjoy the wilderness.'),
    ('Ely Outfitting Company', 'http://www.elyoutfittingcompany.com', '529 E. Sheridan St., Ely, MN 55731', 'Quality Boundary Waters and Quetico canoe trip outfitting and trip planning for families and friends. Excellent friendly service from knowledgeable people who are passionate about sharing the Boundary Waters.'),
    ('Piragis Northwoods Co.', 'https://www.piragis.com', '105 N Central Avenue, Ely, MN 55731', 'We are a full service outfitter in every sense of those words. With an emphasis on service, we offer the newest and best equipment available. Wenonah Kevlar canoes, Granite Gear packs, and the friendliest most knowledgeable staff in Ely.')
;

INSERT INTO outfitter_reference_table
    (entry_point_number, outfitter_id)
VALUES
    (4, 3),
    (4, 4),
    (4, 5);


