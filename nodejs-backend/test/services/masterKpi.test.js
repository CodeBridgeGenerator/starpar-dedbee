const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("masterKpi service", () => {
  let thisService;
  let masterKpiCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("masterKpi");

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
    assert.ok(thisService, "Registered the service (masterKpi)");
  });

  describe("#create", () => {
    const options = {"kra":"aasdfasdfasdfadsfadfa","name":"new value","weight":23,"target":23,"actualAchievement":23,"rate":23,"weightedRate":"new value","startValue":23,"endValue":"new value","importanceRelevance":"new value","sortOrder":"new value","unitMeasurement":"new value"};

    beforeEach(async () => {
      masterKpiCreated = await thisService.create({...options, ...users});
    });

    it("should create a new masterKpi", () => {
      assert.strictEqual(masterKpiCreated.kra, options.kra);
assert.strictEqual(masterKpiCreated.name, options.name);
assert.strictEqual(masterKpiCreated.weight, options.weight);
assert.strictEqual(masterKpiCreated.target, options.target);
assert.strictEqual(masterKpiCreated.actualAchievement, options.actualAchievement);
assert.strictEqual(masterKpiCreated.rate, options.rate);
assert.strictEqual(masterKpiCreated.weightedRate, options.weightedRate);
assert.strictEqual(masterKpiCreated.startValue, options.startValue);
assert.strictEqual(masterKpiCreated.endValue, options.endValue);
assert.strictEqual(masterKpiCreated.importanceRelevance, options.importanceRelevance);
assert.strictEqual(masterKpiCreated.sortOrder, options.sortOrder);
assert.strictEqual(masterKpiCreated.unitMeasurement, options.unitMeasurement);
    });
  });

  describe("#get", () => {
    it("should retrieve a masterKpi by ID", async () => {
      const retrieved = await thisService.findById(masterKpiCreated._id);
      assert.strictEqual(retrieved._id.toString(), masterKpiCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"kra":"345345345345345345345","name":"updated value","weight":100,"target":100,"actualAchievement":100,"rate":100,"weightedRate":"updated value","startValue":100,"endValue":"updated value","importanceRelevance":"updated value","sortOrder":"updated value","unitMeasurement":"updated value"};

    it("should update an existing masterKpi ", async () => {
      const masterKpiUpdated = await thisService.findByIdAndUpdate(
        masterKpiCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(masterKpiUpdated.kra, options.kra);
assert.strictEqual(masterKpiUpdated.name, options.name);
assert.strictEqual(masterKpiUpdated.weight, options.weight);
assert.strictEqual(masterKpiUpdated.target, options.target);
assert.strictEqual(masterKpiUpdated.actualAchievement, options.actualAchievement);
assert.strictEqual(masterKpiUpdated.rate, options.rate);
assert.strictEqual(masterKpiUpdated.weightedRate, options.weightedRate);
assert.strictEqual(masterKpiUpdated.startValue, options.startValue);
assert.strictEqual(masterKpiUpdated.endValue, options.endValue);
assert.strictEqual(masterKpiUpdated.importanceRelevance, options.importanceRelevance);
assert.strictEqual(masterKpiUpdated.sortOrder, options.sortOrder);
assert.strictEqual(masterKpiUpdated.unitMeasurement, options.unitMeasurement);
    });
  });

  describe("#delete", () => {
    it("should delete a masterKpi", async () => {
      const masterKpiDeleted = await thisService.remove(masterKpiCreated._id);
      assert.strictEqual(masterKpiDeleted._id.toString(), masterKpiCreated._id.toString());
    });
  });
});