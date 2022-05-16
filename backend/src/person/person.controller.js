const personService = require("./person.service");

exports.addPerson = async (req, res) => {
  try {
    const { email, pass, personType } = req.body;
    const newPerson = await personService.addPerson(email, pass, personType);
    res.json(newPerson);
  } catch (error) {
    res.json(error.message);
  }
};

exports.getPersons = async (req, res) => {
  try {
    const allPersons = await personService.getPersons();
    res.json(allPersons.rows);
  } catch (error) {
    res.json(error.message);
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    await personService.deletePerson(id);
    res.json("Person was deleted");
  } catch (error) {
    res.json(error.message);
  }
};

exports.getPersonIdFromEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const id = await personService.getPersonIdFromEmail(email);
    res.json(id);
  } catch (error) {
    res.json(error.message);
  }
};
