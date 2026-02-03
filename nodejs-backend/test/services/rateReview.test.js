const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("rateReview service", () => {
  let thisService;
  let rateReviewCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("rateReview");

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
    assert.ok(thisService, "Registered the service (rateReview)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"kpiScore":23,"competency":23,"totalScore":23,"status":"new value"};

    beforeEach(async () => {
      rateReviewCreated = await thisService.create({...options, ...users});
    });

    it("should create a new rateReview", () => {
      assert.strictEqual(rateReviewCreated.parId, options.parId);
assert.strictEqual(rateReviewCreated.appraisorId, options.appraisorId);
assert.strictEqual(rateReviewCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(rateReviewCreated.kpiScore, options.kpiScore);
assert.strictEqual(rateReviewCreated.competency, options.competency);
assert.strictEqual(rateReviewCreated.totalScore, options.totalScore);
assert.strictEqual(rateReviewCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a rateReview by ID", async () => {
      const retrieved = await thisService.findById(rateReviewCreated._id);
      assert.strictEqual(retrieved._id.toString(), rateReviewCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"kpiScore":100,"competency":100,"totalScore":100,"status":"updated value"};

    it("should update an existing rateReview ", async () => {
      const rateReviewUpdated = await thisService.findByIdAndUpdate(
        rateReviewCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(rateReviewUpdated.parId, options.parId);
assert.strictEqual(rateReviewUpdated.appraisorId, options.appraisorId);
assert.strictEqual(rateReviewUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(rateReviewUpdated.kpiScore, options.kpiScore);
assert.strictEqual(rateReviewUpdated.competency, options.competency);
assert.strictEqual(rateReviewUpdated.totalScore, options.totalScore);
assert.strictEqual(rateReviewUpdated.status, options.status);
    });
  });

  describe("#delete", () => {
    it("should delete a rateReview", async () => {
      const rateReviewDeleted = await thisService.remove(rateReviewCreated._id);
      assert.strictEqual(rateReviewDeleted._id.toString(), rateReviewCreated._id.toString());
    });
  });
});