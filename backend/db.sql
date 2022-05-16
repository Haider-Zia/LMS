CREATE DATABASE lms;

CREATE TABLE person(
    person_id SERIAL UNIQUE PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    pass VARCHAR(50) NOT NULL,
    person_type VARCHAR(50) NOT NULL
);

CREATE TABLE class(
    class_id SERIAL UNIQUE,
    teacher_id INT NOT NULL REFERENCES person(person_id) ON DELETE CASCADE,
    teacher_email VARCHAR(50) REFERENCES person(email),
    class_name VARCHAR(50) NOT NULL,
    PRIMARY KEY(class_id, teacher_id)
);

CREATE TABLE lecture(
    lecture_id SERIAL UNIQUE,
    teacher_id INT NOT NULL REFERENCES person(person_id) ON DELETE CASCADE,
    class_id INT NOT NULL REFERENCES class(class_id) ON DELETE CASCADE,
    lecture_name VARCHAR(50),
    lecture_url VARCHAR(255),
    PRIMARY KEY(lecture_id, teacher_id, class_id)
);