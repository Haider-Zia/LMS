// const pool = require("../../db");

const { Person } = require("../../models");

exports.addPerson = async (email, pass, personType) => {
  try {
    /*
    const newPerson = await pool.query(
      "INSERT INTO person (email, pass, person_type) VALUES($1, $2, $3) RETURNING *",
      [email, pass, personType]
    );
    return newPerson.rows[0];
    */
    const newPerson = await Person.create({
      email,
      pass,
      person_type: personType,
    });
    return newPerson;
  } catch (error) {
    throw Error("Error adding person");
  }
};

exports.getPersons = async () => {
  try {
    /*
    const allPersons = await pool.query("SELECT * FROM person");
    return allPersons.rows;
    */
    const allPersons = await Person.findAll();
    return allPersons;
  } catch (error) {
    throw Error("Error getting persons");
  }
};

exports.deletePerson = async (id) => {
  try {
    // await pool.query("DELETE FROM person WHERE person_id=($1)", [id]);
    const foundPerson = await Person.findOne({ where: { person_id: id } });
    foundPerson.destroy();
  } catch (error) {
    throw Error("Error deleting person");
  }
};

exports.getPersonIdFromEmail = async (email) => {
  try {
    /*
    const id = await pool.query(
      "SELECT person_id FROM person WHERE email=($1)",
      [email]
    );
    return id.rows[0];
    */
    const foundPerson = await Person.findOne({ where: { email } });
    return foundPerson.person_id;
  } catch (error) {
    throw Error("Error getting person's id");
  }
};
