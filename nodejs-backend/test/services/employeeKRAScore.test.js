const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("employeeKRAScore service", () => {
  let thisService;
  let employeeKRAScoreCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("employeeKRAScore");

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
    assert.ok(thisService, "Registered the service (employeeKRAScore)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"secKPIID":23,"weight":23,"score":23,"rate":23,"weightedRate":23,"target":23,"kRA":"new value","kPIGoal":"new value","unitMeasurement":"new value","sortOrder":23,"balancedScoreCard":"new value","importanceRelevance":"new value"};

    beforeEach(async () => {
      employeeKRAScoreCreated = await thisService.create({...options, ...users});
    });

    it("should create a new employeeKRAScore", () => {
      assert.strictEqual(employeeKRAScoreCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeKRAScoreCreated.secKPIID, options.secKPIID);
assert.strictEqual(employeeKRAScoreCreated.weight, options.weight);
assert.strictEqual(employeeKRAScoreCreated.score, options.score);
assert.strictEqual(employeeKRAScoreCreated.rate, options.rate);
assert.strictEqual(employeeKRAScoreCreated.weightedRate, options.weightedRate);
assert.strictEqual(employeeKRAScoreCreated.target, options.target);
assert.strictEqual(employeeKRAScoreCreated.kRA, options.kRA);
assert.strictEqual(employeeKRAScoreCreated.kPIGoal, options.kPIGoal);
assert.strictEqual(employeeKRAScoreCreated.unitMeasurement, options.unitMeasurement);
assert.strictEqual(employeeKRAScoreCreated.sortOrder, options.sortOrder);
assert.strictEqual(employeeKRAScoreCreated.balancedScoreCard, options.balancedScoreCard);
assert.strictEqual(employeeKRAScoreCreated.importanceRelevance, options.importanceRelevance);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeKRAScore by ID", async () => {
      const retrieved = await thisService.findById(employeeKRAScoreCreated._id);
      assert.strictEqual(retrieved._id.toString(), employeeKRAScoreCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraisalID":100,"secKPIID":100,"weight":100,"score":100,"rate":100,"weightedRate":100,"target":100,"kRA":"updated value","kPIGoal":"updated value","unitMeasurement":"updated value","sortOrder":100,"balancedScoreCard":"updated value","importanceRelevance":"updated value"};

    it("should update an existing employeeKRAScore ", async () => {
      const employeeKRAScoreUpdated = await thisService.findByIdAndUpdate(
        employeeKRAScoreCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(employeeKRAScoreUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeKRAScoreUpdated.secKPIID, options.secKPIID);
assert.strictEqual(employeeKRAScoreUpdated.weight, options.weight);
assert.strictEqual(employeeKRAScoreUpdated.score, options.score);
assert.strictEqual(employeeKRAScoreUpdated.rate, options.rate);
assert.strictEqual(employeeKRAScoreUpdated.weightedRate, options.weightedRate);
assert.strictEqual(employeeKRAScoreUpdated.target, options.target);
assert.strictEqual(employeeKRAScoreUpdated.kRA, options.kRA);
assert.strictEqual(employeeKRAScoreUpdated.kPIGoal, options.kPIGoal);
assert.strictEqual(employeeKRAScoreUpdated.unitMeasurement, options.unitMeasurement);
assert.strictEqual(employeeKRAScoreUpdated.sortOrder, options.sortOrder);
assert.strictEqual(employeeKRAScoreUpdated.balancedScoreCard, options.balancedScoreCard);
assert.strictEqual(employeeKRAScoreUpdated.importanceRelevance, options.importanceRelevance);
    });
  });

  describe("#delete", () => {
    it("should delete a employeeKRAScore", async () => {
      const employeeKRAScoreDeleted = await thisService.remove(employeeKRAScoreCreated._id);
      assert.strictEqual(employeeKRAScoreDeleted._id.toString(), employeeKRAScoreCreated._id.toString());
    });
  });
});