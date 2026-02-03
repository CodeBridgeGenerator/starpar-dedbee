const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("competenciesScores service", () => {
  let thisService;
  let competenciesScoreCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("competenciesScores");

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
    assert.ok(thisService, "Registered the service (competenciesScores)");
  });

  describe("#create", () => {
    const options = {"parAppraisersId":"aasdfasdfasdfadsfadfa","competency":"aasdfasdfasdfadsfadfa","rate":23,"weightedRate":23,"remarks":"new value","appraisalId":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      competenciesScoreCreated = await thisService.create({...options, ...users});
    });

    it("should create a new competenciesScore", () => {
      assert.strictEqual(competenciesScoreCreated.parAppraisersId, options.parAppraisersId);
assert.strictEqual(competenciesScoreCreated.competency, options.competency);
assert.strictEqual(competenciesScoreCreated.rate, options.rate);
assert.strictEqual(competenciesScoreCreated.weightedRate, options.weightedRate);
assert.strictEqual(competenciesScoreCreated.remarks, options.remarks);
assert.strictEqual(competenciesScoreCreated.appraisalId, options.appraisalId);
    });
  });

  describe("#get", () => {
    it("should retrieve a competenciesScore by ID", async () => {
      const retrieved = await thisService.findById(competenciesScoreCreated._id);
      assert.strictEqual(retrieved._id.toString(), competenciesScoreCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parAppraisersId":"345345345345345345345","competency":"345345345345345345345","rate":100,"weightedRate":100,"remarks":"updated value","appraisalId":"345345345345345345345"};

    it("should update an existing competenciesScore ", async () => {
      const competenciesScoreUpdated = await thisService.findByIdAndUpdate(
        competenciesScoreCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(competenciesScoreUpdated.parAppraisersId, options.parAppraisersId);
assert.strictEqual(competenciesScoreUpdated.competency, options.competency);
assert.strictEqual(competenciesScoreUpdated.rate, options.rate);
assert.strictEqual(competenciesScoreUpdated.weightedRate, options.weightedRate);
assert.strictEqual(competenciesScoreUpdated.remarks, options.remarks);
assert.strictEqual(competenciesScoreUpdated.appraisalId, options.appraisalId);
    });
  });

  describe("#delete", () => {
    it("should delete a competenciesScore", async () => {
      const competenciesScoreDeleted = await thisService.remove(competenciesScoreCreated._id);
      assert.strictEqual(competenciesScoreDeleted._id.toString(), competenciesScoreCreated._id.toString());
    });
  });
});