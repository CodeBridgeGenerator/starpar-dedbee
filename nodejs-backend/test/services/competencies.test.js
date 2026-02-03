const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("competencies service", () => {
  let thisService;
  let competencyCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("competencies");

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
    assert.ok(thisService, "Registered the service (competencies)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"name":"new value","description":"new value","weight":23,"rate":23,"weightedScore":23};

    beforeEach(async () => {
      competencyCreated = await thisService.create({...options, ...users});
    });

    it("should create a new competency", () => {
      assert.strictEqual(competencyCreated.parId, options.parId);
assert.strictEqual(competencyCreated.appraisorId, options.appraisorId);
assert.strictEqual(competencyCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(competencyCreated.name, options.name);
assert.strictEqual(competencyCreated.description, options.description);
assert.strictEqual(competencyCreated.weight, options.weight);
assert.strictEqual(competencyCreated.rate, options.rate);
assert.strictEqual(competencyCreated.weightedScore, options.weightedScore);
    });
  });

  describe("#get", () => {
    it("should retrieve a competency by ID", async () => {
      const retrieved = await thisService.findById(competencyCreated._id);
      assert.strictEqual(retrieved._id.toString(), competencyCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"name":"updated value","description":"updated value","weight":100,"rate":100,"weightedScore":100};

    it("should update an existing competency ", async () => {
      const competencyUpdated = await thisService.findByIdAndUpdate(
        competencyCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(competencyUpdated.parId, options.parId);
assert.strictEqual(competencyUpdated.appraisorId, options.appraisorId);
assert.strictEqual(competencyUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(competencyUpdated.name, options.name);
assert.strictEqual(competencyUpdated.description, options.description);
assert.strictEqual(competencyUpdated.weight, options.weight);
assert.strictEqual(competencyUpdated.rate, options.rate);
assert.strictEqual(competencyUpdated.weightedScore, options.weightedScore);
    });
  });

  describe("#delete", () => {
    it("should delete a competency", async () => {
      const competencyDeleted = await thisService.remove(competencyCreated._id);
      assert.strictEqual(competencyDeleted._id.toString(), competencyCreated._id.toString());
    });
  });
});