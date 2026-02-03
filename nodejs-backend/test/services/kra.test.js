const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("kra service", () => {
  let thisService;
  let kraCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("kra");

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
    assert.ok(thisService, "Registered the service (kra)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"balancedScorecard":"new value","kpi":"new value","weight":23,"target":23,"actualAchievement":23,"rate":23,"weightedRate":23};

    beforeEach(async () => {
      kraCreated = await thisService.create({...options, ...users});
    });

    it("should create a new kra", () => {
      assert.strictEqual(kraCreated.parId, options.parId);
assert.strictEqual(kraCreated.appraisorId, options.appraisorId);
assert.strictEqual(kraCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(kraCreated.balancedScorecard, options.balancedScorecard);
assert.strictEqual(kraCreated.kpi, options.kpi);
assert.strictEqual(kraCreated.weight, options.weight);
assert.strictEqual(kraCreated.target, options.target);
assert.strictEqual(kraCreated.actualAchievement, options.actualAchievement);
assert.strictEqual(kraCreated.rate, options.rate);
assert.strictEqual(kraCreated.weightedRate, options.weightedRate);
    });
  });

  describe("#get", () => {
    it("should retrieve a kra by ID", async () => {
      const retrieved = await thisService.findById(kraCreated._id);
      assert.strictEqual(retrieved._id.toString(), kraCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"balancedScorecard":"updated value","kpi":"updated value","weight":100,"target":100,"actualAchievement":100,"rate":100,"weightedRate":100};

    it("should update an existing kra ", async () => {
      const kraUpdated = await thisService.findByIdAndUpdate(
        kraCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(kraUpdated.parId, options.parId);
assert.strictEqual(kraUpdated.appraisorId, options.appraisorId);
assert.strictEqual(kraUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(kraUpdated.balancedScorecard, options.balancedScorecard);
assert.strictEqual(kraUpdated.kpi, options.kpi);
assert.strictEqual(kraUpdated.weight, options.weight);
assert.strictEqual(kraUpdated.target, options.target);
assert.strictEqual(kraUpdated.actualAchievement, options.actualAchievement);
assert.strictEqual(kraUpdated.rate, options.rate);
assert.strictEqual(kraUpdated.weightedRate, options.weightedRate);
    });
  });

  describe("#delete", () => {
    it("should delete a kra", async () => {
      const kraDeleted = await thisService.remove(kraCreated._id);
      assert.strictEqual(kraDeleted._id.toString(), kraCreated._id.toString());
    });
  });
});