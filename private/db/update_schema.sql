CREATE TABLE application_schema."users" (
    user_id int_4,
    firstname varchar,
    lastname varchar,
    email varchar,
    password varchar
);

ALTER TABLE application_schema."users"
ADD "security_token" JSON;