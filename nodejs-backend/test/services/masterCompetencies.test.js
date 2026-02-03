const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("masterCompetencies service", () => {
  let thisService;
  let masterCompetencyCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("masterCompetencies");

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
    assert.ok(thisService, "Registered the service (masterCompetencies)");
  });

  describe("#create", () => {
    const options = {"departmentId":"aasdfasdfasdfadsfadfa","name":"new value","description":"new value","weight":23,"rate":23,"weightedScore":23};

    beforeEach(async () => {
      masterCompetencyCreated = await thisService.create({...options, ...users});
    });

    it("should create a new masterCompetency", () => {
      assert.strictEqual(masterCompetencyCreated.departmentId, options.departmentId);
assert.strictEqual(masterCompetencyCreated.name, options.name);
assert.strictEqual(masterCompetencyCreated.description, options.description);
assert.strictEqual(masterCompetencyCreated.weight, options.weight);
assert.strictEqual(masterCompetencyCreated.rate, options.rate);
assert.strictEqual(masterCompetencyCreated.weightedScore, options.weightedScore);
    });
  });

  describe("#get", () => {
    it("should retrieve a masterCompetency by ID", async () => {
      const retrieved = await thisService.findById(masterCompetencyCreated._id);
      assert.strictEqual(retrieved._id.toString(), masterCompetencyCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"departmentId":"345345345345345345345","name":"updated value","description":"updated value","weight":100,"rate":100,"weightedScore":100};

    it("should update an existing masterCompetency ", async () => {
      const masterCompetencyUpdated = await thisService.findByIdAndUpdate(
        masterCompetencyCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(masterCompetencyUpdated.departmentId, options.departmentId);
assert.strictEqual(masterCompetencyUpdated.name, options.name);
assert.strictEqual(masterCompetencyUpdated.description, options.description);
assert.strictEqual(masterCompetencyUpdated.weight, options.weight);
assert.strictEqual(masterCompetencyUpdated.rate, options.rate);
assert.strictEqual(masterCompetencyUpdated.weightedScore, options.weightedScore);
    });
  });

  describe("#delete", () => {
    it("should delete a masterCompetency", async () => {
      const masterCompetencyDeleted = await thisService.remove(masterCompetencyCreated._id);
      assert.strictEqual(masterCompetencyDeleted._id.toString(), masterCompetencyCreated._id.toString());
    });
  });
});