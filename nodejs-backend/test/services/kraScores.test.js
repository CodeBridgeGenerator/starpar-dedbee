const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("kraScores service", () => {
  let thisService;
  let kraScoreCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("kraScores");

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
    assert.ok(thisService, "Registered the service (kraScores)");
  });

  describe("#create", () => {
    const options = {"parAppraisersId":"aasdfasdfasdfadsfadfa","kpi":"aasdfasdfasdfadsfadfa","actualAchievement":23,"rate":23,"weightedRate":23,"score":23,"appraisalId":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      kraScoreCreated = await thisService.create({...options, ...users});
    });

    it("should create a new kraScore", () => {
      assert.strictEqual(kraScoreCreated.parAppraisersId, options.parAppraisersId);
assert.strictEqual(kraScoreCreated.kpi, options.kpi);
assert.strictEqual(kraScoreCreated.actualAchievement, options.actualAchievement);
assert.strictEqual(kraScoreCreated.rate, options.rate);
assert.strictEqual(kraScoreCreated.weightedRate, options.weightedRate);
assert.strictEqual(kraScoreCreated.score, options.score);
assert.strictEqual(kraScoreCreated.appraisalId, options.appraisalId);
    });
  });

  describe("#get", () => {
    it("should retrieve a kraScore by ID", async () => {
      const retrieved = await thisService.findById(kraScoreCreated._id);
      assert.strictEqual(retrieved._id.toString(), kraScoreCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parAppraisersId":"345345345345345345345","kpi":"345345345345345345345","actualAchievement":100,"rate":100,"weightedRate":100,"score":100,"appraisalId":"345345345345345345345"};

    it("should update an existing kraScore ", async () => {
      const kraScoreUpdated = await thisService.findByIdAndUpdate(
        kraScoreCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(kraScoreUpdated.parAppraisersId, options.parAppraisersId);
assert.strictEqual(kraScoreUpdated.kpi, options.kpi);
assert.strictEqual(kraScoreUpdated.actualAchievement, options.actualAchievement);
assert.strictEqual(kraScoreUpdated.rate, options.rate);
assert.strictEqual(kraScoreUpdated.weightedRate, options.weightedRate);
assert.strictEqual(kraScoreUpdated.score, options.score);
assert.strictEqual(kraScoreUpdated.appraisalId, options.appraisalId);
    });
  });

  describe("#delete", () => {
    it("should delete a kraScore", async () => {
      const kraScoreDeleted = await thisService.remove(kraScoreCreated._id);
      assert.strictEqual(kraScoreDeleted._id.toString(), kraScoreCreated._id.toString());
    });
  });
});