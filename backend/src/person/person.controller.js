const personService = require("./person.service");

exports.addPerson = async (req, res) => {
  try {
    const { email, pass, personType } = req.body;
    const newPerson = await personService.addPerson(email, pass, personType);
    res.json(newPerson);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPersons = async (req, res) => {
  try {
    const allPersons = await personService.getPersons();
    return res.json(allPersons);
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const { id } = req.params;
    await personService.deletePerson(id);
    res.json("Person was deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getPersonIdFromEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const id = await personService.getPersonIdFromEmail(email);
    res.json(id);
  } catch (error) {
    res.status(500).json(error);
  }
};
