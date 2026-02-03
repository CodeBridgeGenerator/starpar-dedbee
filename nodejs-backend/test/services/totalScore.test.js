const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("totalScore service", () => {
  let thisService;
  let totalScoreCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("totalScore");

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
    assert.ok(thisService, "Registered the service (totalScore)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"description":"new value","rate":23,"weight":23,"weightedRate":23};

    beforeEach(async () => {
      totalScoreCreated = await thisService.create({...options, ...users});
    });

    it("should create a new totalScore", () => {
      assert.strictEqual(totalScoreCreated.parId, options.parId);
assert.strictEqual(totalScoreCreated.appraisorId, options.appraisorId);
assert.strictEqual(totalScoreCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(totalScoreCreated.description, options.description);
assert.strictEqual(totalScoreCreated.rate, options.rate);
assert.strictEqual(totalScoreCreated.weight, options.weight);
assert.strictEqual(totalScoreCreated.weightedRate, options.weightedRate);
    });
  });

  describe("#get", () => {
    it("should retrieve a totalScore by ID", async () => {
      const retrieved = await thisService.findById(totalScoreCreated._id);
      assert.strictEqual(retrieved._id.toString(), totalScoreCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"description":"updated value","rate":100,"weight":100,"weightedRate":100};

    it("should update an existing totalScore ", async () => {
      const totalScoreUpdated = await thisService.findByIdAndUpdate(
        totalScoreCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(totalScoreUpdated.parId, options.parId);
assert.strictEqual(totalScoreUpdated.appraisorId, options.appraisorId);
assert.strictEqual(totalScoreUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(totalScoreUpdated.description, options.description);
assert.strictEqual(totalScoreUpdated.rate, options.rate);
assert.strictEqual(totalScoreUpdated.weight, options.weight);
assert.strictEqual(totalScoreUpdated.weightedRate, options.weightedRate);
    });
  });

  describe("#delete", () => {
    it("should delete a totalScore", async () => {
      const totalScoreDeleted = await thisService.remove(totalScoreCreated._id);
      assert.strictEqual(totalScoreDeleted._id.toString(), totalScoreCreated._id.toString());
    });
  });
});