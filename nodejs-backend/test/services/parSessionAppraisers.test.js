const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("parSessionAppraisers service", () => {
  let thisService;
  let parSessionAppraiserCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("parSessionAppraisers");

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
    assert.ok(thisService, "Registered the service (parSessionAppraisers)");
  });

  describe("#create", () => {
    const options = {"parSessionId":"aasdfasdfasdfadsfadfa","appraiseeEmpNo":"aasdfasdfasdfadsfadfa","appraiserEmpNo":"aasdfasdfasdfadsfadfa","weightage":23,"department":"aasdfasdfasdfadsfadfa","section":"aasdfasdfasdfadsfadfa","appraiserComment":"new value","kraScore":23,"weightedKraScore":23,"competencyScore":23,"weightedCompetencyScore":23};

    beforeEach(async () => {
      parSessionAppraiserCreated = await thisService.create({...options, ...users});
    });

    it("should create a new parSessionAppraiser", () => {
      assert.strictEqual(parSessionAppraiserCreated.parSessionId, options.parSessionId);
assert.strictEqual(parSessionAppraiserCreated.appraiseeEmpNo, options.appraiseeEmpNo);
assert.strictEqual(parSessionAppraiserCreated.appraiserEmpNo, options.appraiserEmpNo);
assert.strictEqual(parSessionAppraiserCreated.weightage, options.weightage);
assert.strictEqual(parSessionAppraiserCreated.department, options.department);
assert.strictEqual(parSessionAppraiserCreated.section, options.section);
assert.strictEqual(parSessionAppraiserCreated.appraiserComment, options.appraiserComment);
assert.strictEqual(parSessionAppraiserCreated.kraScore, options.kraScore);
assert.strictEqual(parSessionAppraiserCreated.weightedKraScore, options.weightedKraScore);
assert.strictEqual(parSessionAppraiserCreated.competencyScore, options.competencyScore);
assert.strictEqual(parSessionAppraiserCreated.weightedCompetencyScore, options.weightedCompetencyScore);
    });
  });

  describe("#get", () => {
    it("should retrieve a parSessionAppraiser by ID", async () => {
      const retrieved = await thisService.findById(parSessionAppraiserCreated._id);
      assert.strictEqual(retrieved._id.toString(), parSessionAppraiserCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parSessionId":"345345345345345345345","appraiseeEmpNo":"345345345345345345345","appraiserEmpNo":"345345345345345345345","weightage":100,"department":"345345345345345345345","section":"345345345345345345345","appraiserComment":"updated value","kraScore":100,"weightedKraScore":100,"competencyScore":100,"weightedCompetencyScore":100};

    it("should update an existing parSessionAppraiser ", async () => {
      const parSessionAppraiserUpdated = await thisService.findByIdAndUpdate(
        parSessionAppraiserCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(parSessionAppraiserUpdated.parSessionId, options.parSessionId);
assert.strictEqual(parSessionAppraiserUpdated.appraiseeEmpNo, options.appraiseeEmpNo);
assert.strictEqual(parSessionAppraiserUpdated.appraiserEmpNo, options.appraiserEmpNo);
assert.strictEqual(parSessionAppraiserUpdated.weightage, options.weightage);
assert.strictEqual(parSessionAppraiserUpdated.department, options.department);
assert.strictEqual(parSessionAppraiserUpdated.section, options.section);
assert.strictEqual(parSessionAppraiserUpdated.appraiserComment, options.appraiserComment);
assert.strictEqual(parSessionAppraiserUpdated.kraScore, options.kraScore);
assert.strictEqual(parSessionAppraiserUpdated.weightedKraScore, options.weightedKraScore);
assert.strictEqual(parSessionAppraiserUpdated.competencyScore, options.competencyScore);
assert.strictEqual(parSessionAppraiserUpdated.weightedCompetencyScore, options.weightedCompetencyScore);
    });
  });

  describe("#delete", () => {
    it("should delete a parSessionAppraiser", async () => {
      const parSessionAppraiserDeleted = await thisService.remove(parSessionAppraiserCreated._id);
      assert.strictEqual(parSessionAppraiserDeleted._id.toString(), parSessionAppraiserCreated._id.toString());
    });
  });
});