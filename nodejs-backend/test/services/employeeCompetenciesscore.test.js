const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("employeeCompetenciesscore service", () => {
  let thisService;
  let employeeCompetenciesscoreCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("employeeCompetenciesscore");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employeeCompetenciesscore)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"competency":"new value","description":"new value","weight":23,"rate":23,"weightedRate":23,"remarks":"new value"};

    beforeEach(async () => {
      employeeCompetenciesscoreCreated = await thisService.create({...options, ...users});
    });

    it("should create a new employeeCompetenciesscore", () => {
      assert.strictEqual(employeeCompetenciesscoreCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeCompetenciesscoreCreated.competency, options.competency);
assert.strictEqual(employeeCompetenciesscoreCreated.description, options.description);
assert.strictEqual(employeeCompetenciesscoreCreated.weight, options.weight);
assert.strictEqual(employeeCompetenciesscoreCreated.rate, options.rate);
assert.strictEqual(employeeCompetenciesscoreCreated.weightedRate, options.weightedRate);
assert.strictEqual(employeeCompetenciesscoreCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeCompetenciesscore by ID", async () => {
      const retrieved = await thisService.findById(employeeCompetenciesscoreCreated._id);
      assert.strictEqual(retrieved._id.toString(), employeeCompetenciesscoreCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraisalID":100,"competency":"updated value","description":"updated value","weight":100,"rate":100,"weightedRate":100,"remarks":"updated value"};

    it("should update an existing employeeCompetenciesscore ", async () => {
      const employeeCompetenciesscoreUpdated = await thisService.findByIdAndUpdate(
        employeeCompetenciesscoreCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(employeeCompetenciesscoreUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeCompetenciesscoreUpdated.competency, options.competency);
assert.strictEqual(employeeCompetenciesscoreUpdated.description, options.description);
assert.strictEqual(employeeCompetenciesscoreUpdated.weight, options.weight);
assert.strictEqual(employeeCompetenciesscoreUpdated.rate, options.rate);
assert.strictEqual(employeeCompetenciesscoreUpdated.weightedRate, options.weightedRate);
assert.strictEqual(employeeCompetenciesscoreUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
    it("should delete a employeeCompetenciesscore", async () => {
      const employeeCompetenciesscoreDeleted = await thisService.remove(employeeCompetenciesscoreCreated._id);
      assert.strictEqual(employeeCompetenciesscoreDeleted._id.toString(), employeeCompetenciesscoreCreated._id.toString());
    });
  });
});