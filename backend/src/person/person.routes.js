const express = require("express");

const personRouter = express.Router();

const personController = require("./person.controller");

personRouter
  .route("/person")
  .post(personController.addPerson)
  .get(personController.getPersons);

personRouter.delete("/person/:id", personController.deletePerson);

// Get a person's id using their email
personRouter.get(
  "/person/:email/get_person_id",
  personController.getPersonIdFromEmail
);

module.exports = personRouter;
