const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("employeeAppraisalReview service", () => {
  let thisService;
  let employeeAppraisalReviewCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("employeeAppraisalReview");

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
    assert.ok(thisService, "Registered the service (employeeAppraisalReview)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"strength":"new value","achievement":"new value","targetToAchieve":"new value","otherTraining":"new value"};

    beforeEach(async () => {
      employeeAppraisalReviewCreated = await thisService.create({...options, ...users});
    });

    it("should create a new employeeAppraisalReview", () => {
      assert.strictEqual(employeeAppraisalReviewCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalReviewCreated.strength, options.strength);
assert.strictEqual(employeeAppraisalReviewCreated.achievement, options.achievement);
assert.strictEqual(employeeAppraisalReviewCreated.targetToAchieve, options.targetToAchieve);
assert.strictEqual(employeeAppraisalReviewCreated.otherTraining, options.otherTraining);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeAppraisalReview by ID", async () => {
      const retrieved = await thisService.findById(employeeAppraisalReviewCreated._id);
      assert.strictEqual(retrieved._id.toString(), employeeAppraisalReviewCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraisalID":100,"strength":"updated value","achievement":"updated value","targetToAchieve":"updated value","otherTraining":"updated value"};

    it("should update an existing employeeAppraisalReview ", async () => {
      const employeeAppraisalReviewUpdated = await thisService.findByIdAndUpdate(
        employeeAppraisalReviewCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(employeeAppraisalReviewUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalReviewUpdated.strength, options.strength);
assert.strictEqual(employeeAppraisalReviewUpdated.achievement, options.achievement);
assert.strictEqual(employeeAppraisalReviewUpdated.targetToAchieve, options.targetToAchieve);
assert.strictEqual(employeeAppraisalReviewUpdated.otherTraining, options.otherTraining);
    });
  });

  describe("#delete", () => {
    it("should delete a employeeAppraisalReview", async () => {
      const employeeAppraisalReviewDeleted = await thisService.remove(employeeAppraisalReviewCreated._id);
      assert.strictEqual(employeeAppraisalReviewDeleted._id.toString(), employeeAppraisalReviewCreated._id.toString());
    });
  });
});