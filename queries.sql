CREATE TABLE worker (
  id SERIAL NOT NULL PRIMARY KEY,
  name text NOT NULL,
  surname text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  date_of_join DATE NOT NULL,
  salary float8 NOT NULL,
  title text NOT NULL,
  departmant BIGINT,
  manager BIGINT REFERENCES worker (id) ON DELETE SET NULL,
  status INT NOT NULL DEFAULT 1,
  level INT,
  UNIQUE(email),
  UNIQUE(phone)
  );

CREATE TABLE departmants (
  id SERIAL NOT NULL PRIMARY KEY,
  departmant_name text NOT NULL,
  manager BIGINT REFERENCES worker (id) ON DELETE SET NULL,
  location_id BIGINT REFERENCES offices (id) ON DELETE SET NULL,
  status INT DEFAULT 1,
  UNIQUE(id),
  UNIQUE(manager)
);

CREATE TABLE offices (
  id SERIAL NOT NULL PRIMARY KEY,
  location text NOT NULL,
  address text NOT NULL,
  p_code text NOT NULL,
  country text NOT NULL,
  city text NOT NULL,
  status INT NOT NULL DEFAULT 1,
  UNIQUE(id)
);

CREATE TABLE title_changes (
  id SERIAL NOT NULL PRIMARY KEY,
  user_id INT,
  start_date DATE,
  end_date DATE DEFAULT NULL,
  title text NOT NULL,
  departmant INT REFERENCES departmants (id),
  UNIQUE(id)
);

ALTER TABLE public.worker ADD CONSTRAINT departmant_id_fkey FOREIGN KEY (departmant) REFERENCES public.departmants (id);
ALTER TABLE public.title_changes ADD CONSTRAINT user_id_fkey FOREIGN KEY (user_id) REFERENCES public.worker (id);

INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Kamilah', 'Waeland', 'kwaeland0@va.gov', '112-195-7002', '8/30/22', '8364.77', 'Founder', '1');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Frederique', 'Mounsey', 'fmounsey1@i2i.jp', '483-138-6268', '12/15/22', '8565.88', 'Chief Graphic Designer', '2');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Angel', 'Cunliffe', 'acunliffe2@hugedomains.com', '269-839-9614', '8/23/22', '4788.92', 'Quality Control Manager', '2');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Chelsae', 'Drinkale', 'cdrinkale3@mozilla.com', '599-215-1746', '3/13/22', '6866.49', 'Bugdet/Accounting Manager', '2');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Marcie', 'Grebbin', 'mgrebbin4@home.pl', '361-649-6376', '5/17/22', '1127.25', 'Lead Software Developer', '2');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Andy', 'Sherston', 'asherston6@arizona.edu', '358-280-6929', '3/27/22', '3469.28', 'Budget/Accounting Analyst', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Zaccaria', 'Felton', 'zfelton7@economist.com', '692-752-2992', '5/2/22', '5910.16', 'Budget/Accounting Analyst', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Stanislas', 'Rowbottom', 'srowbottom8@arizona.edu', '159-991-4789', '12/7/22', '7217.01', 'Graphic Designer', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Erika', 'Ottey', 'eottey9@npr.org', '242-838-3652', '10/19/22', '2651.46', 'Graphic Designer', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Lynn', 'MacGillacolm', 'lmacgillacolma@fotki.com', '559-327-0672', '4/17/22', '9161.81', 'Graphic Designer', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Mirabel', 'Meert', 'mmeertb@diigo.com', '256-495-0814', '12/14/22', '8196.54', 'Quality Control Specialist', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Taber', 'Almey', 'talmeyc@craigslist.org', '185-246-2634', '11/11/22', '435.59', 'Quality Control Specialist', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('King', 'Tatters', 'ktattersd@mapquest.com', '500-721-2129', '3/10/22', '2994.96', 'Quality Control Specialist', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Bendix', 'Mateu', 'bmateue@yandex.ru', '306-656-4434', '10/26/22', '4360.64', 'Software Developer', '3');
INSERT INTO worker ("name", "surname", "email", "phone", "date_of_join", "salary", "title", "level") VALUES ('Dania', 'Do Rosario', 'ddorosariof@privacy.gov.au', '563-657-1299', '6/14/22', '1314.38', 'Software Developer', '3');

INSERT INTO departmants ("departmant_name") VALUES ('Budget/Accounting');
INSERT INTO departmants ("departmant_name") VALUES ('Software');
INSERT INTO departmants ("departmant_name") VALUES ('Quality Control');
INSERT INTO departmants ("departmant_name") VALUES ('Graphic Design');

INSERT INTO offices ("location", "address", "p_code", "country", "city") VALUES ('İstanbul', 'Limon Sokak', '34000', 'Türkiye', 'İstanbul');
INSERT INTO offices ("location", "address", "p_code", "country", "city") VALUES ('İzmir', 'Atatürk caddes', '33234', 'Türkiye', 'İzmir');
INSERT INTO offices ("location", "address", "p_code", "country", "city") VALUES ('Rotterdam', 'Van Brochorst Street', '234234', 'Hollanda', 'Rotterdam');

INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('2', '12/15/22', 'Chief Graphic Designer', '4');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('3', '8/23/22', 'Quality Control Manager' ,'3');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('4', '3/13/22', 'Bugdet/Accounting Manager', '1');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('5', '5/17/22', 'Lead Software Developer', '2');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('6', '3/27/22', 'Budget/Accounting Analyst', '1');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('7', '5/2/22', 'Budget/Accounting Analyst', '1');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('8', '12/7/22', 'Graphic Designer', '4');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('9', '10/19/22', 'Graphic Designer', '4');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('10', '4/17/22', 'Graphic Designer', '4');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('11', '12/14/22', 'Quality Control Specialist', '3');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('12', '11/11/22', 'Quality Control Specialist', '3');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('13', '3/10/22', 'Quality Control Specialist', '3');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('14', '10/26/22', 'Software Developer', '2');
INSERT INTO title_changes ("user_id", "start_date", "title", "departmant") VALUES ('15', '6/14/22', 'Software Developer', '2');

UPDATE departmants SET manager = '2', location_id = '1' WHERE id = '4';
UPDATE departmants SET manager = '3', location_id = '2' WHERE id = '3';
UPDATE departmants SET manager = '4', location_id = '3' WHERE id = '2';
UPDATE departmants SET manager = '5', location_id = '2' WHERE id = '1';

UPDATE worker SET departmant = '4', manager = '1' WHERE id = '2';
UPDATE worker SET departmant = '3', manager = '1' WHERE id = '3';
UPDATE worker SET departmant = '1', manager = '1' WHERE id = '4';
UPDATE worker SET departmant = '2', manager = '1' WHERE id = '5';

UPDATE worker SET departmant = '1', manager = '4' WHERE id = '6';
UPDATE worker SET departmant = '1', manager = '4' WHERE id = '7';

UPDATE worker SET departmant = '4', manager = '2' WHERE id = '8';
UPDATE worker SET departmant = '4', manager = '2' WHERE id = '9';
UPDATE worker SET departmant = '4', manager = '2' WHERE id = '10';

UPDATE worker SET departmant = '3', manager = '3' WHERE id = '11';
UPDATE worker SET departmant = '3', manager = '3' WHERE id = '12';
UPDATE worker SET departmant = '3', manager = '3' WHERE id = '13';

UPDATE worker SET departmant = '2', manager = '5' WHERE id = '14';
UPDATE worker SET departmant = '2', manager = '5' WHERE id = '15';