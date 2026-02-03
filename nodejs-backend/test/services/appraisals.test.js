const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("appraisals service", () => {
  let thisService;
  let appraisalCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("appraisals");

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
    assert.ok(thisService, "Registered the service (appraisals)");
  });

  describe("#create", () => {
    const options = {"appraisalId":23,"employeeNo":"aasdfasdfasdfadsfadfa","fYear":23,"startDate":1770157793660,"endDate":1770157793660,"kraScore":23,"weightedKraScore":23,"competencyScore":23,"weightedCompetencyScore":"new value","demeritScore":23,"totalScore":23,"finalScore":23,"empComment":"new value","mngComment":"new value","mngSuperiorComment":"new value","managerEmpNo":"aasdfasdfasdfadsfadfa","kraWeight":23,"competencyWeight":23};

    beforeEach(async () => {
      appraisalCreated = await thisService.create({...options, ...users});
    });

    it("should create a new appraisal", () => {
      assert.strictEqual(appraisalCreated.appraisalId, options.appraisalId);
assert.strictEqual(appraisalCreated.employeeNo, options.employeeNo);
assert.strictEqual(appraisalCreated.fYear, options.fYear);
assert.strictEqual(appraisalCreated.startDate, options.startDate);
assert.strictEqual(appraisalCreated.endDate, options.endDate);
assert.strictEqual(appraisalCreated.kraScore, options.kraScore);
assert.strictEqual(appraisalCreated.weightedKraScore, options.weightedKraScore);
assert.strictEqual(appraisalCreated.competencyScore, options.competencyScore);
assert.strictEqual(appraisalCreated.weightedCompetencyScore, options.weightedCompetencyScore);
assert.strictEqual(appraisalCreated.demeritScore, options.demeritScore);
assert.strictEqual(appraisalCreated.totalScore, options.totalScore);
assert.strictEqual(appraisalCreated.finalScore, options.finalScore);
assert.strictEqual(appraisalCreated.empComment, options.empComment);
assert.strictEqual(appraisalCreated.mngComment, options.mngComment);
assert.strictEqual(appraisalCreated.mngSuperiorComment, options.mngSuperiorComment);
assert.strictEqual(appraisalCreated.managerEmpNo, options.managerEmpNo);
assert.strictEqual(appraisalCreated.kraWeight, options.kraWeight);
assert.strictEqual(appraisalCreated.competencyWeight, options.competencyWeight);
    });
  });

  describe("#get", () => {
    it("should retrieve a appraisal by ID", async () => {
      const retrieved = await thisService.findById(appraisalCreated._id);
      assert.strictEqual(retrieved._id.toString(), appraisalCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraisalId":100,"employeeNo":"345345345345345345345","fYear":100,"startDate":null,"endDate":null,"kraScore":100,"weightedKraScore":100,"competencyScore":100,"weightedCompetencyScore":"updated value","demeritScore":100,"totalScore":100,"finalScore":100,"empComment":"updated value","mngComment":"updated value","mngSuperiorComment":"updated value","managerEmpNo":"345345345345345345345","kraWeight":100,"competencyWeight":100};

    it("should update an existing appraisal ", async () => {
      const appraisalUpdated = await thisService.findByIdAndUpdate(
        appraisalCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(appraisalUpdated.appraisalId, options.appraisalId);
assert.strictEqual(appraisalUpdated.employeeNo, options.employeeNo);
assert.strictEqual(appraisalUpdated.fYear, options.fYear);
assert.strictEqual(appraisalUpdated.startDate, options.startDate);
assert.strictEqual(appraisalUpdated.endDate, options.endDate);
assert.strictEqual(appraisalUpdated.kraScore, options.kraScore);
assert.strictEqual(appraisalUpdated.weightedKraScore, options.weightedKraScore);
assert.strictEqual(appraisalUpdated.competencyScore, options.competencyScore);
assert.strictEqual(appraisalUpdated.weightedCompetencyScore, options.weightedCompetencyScore);
assert.strictEqual(appraisalUpdated.demeritScore, options.demeritScore);
assert.strictEqual(appraisalUpdated.totalScore, options.totalScore);
assert.strictEqual(appraisalUpdated.finalScore, options.finalScore);
assert.strictEqual(appraisalUpdated.empComment, options.empComment);
assert.strictEqual(appraisalUpdated.mngComment, options.mngComment);
assert.strictEqual(appraisalUpdated.mngSuperiorComment, options.mngSuperiorComment);
assert.strictEqual(appraisalUpdated.managerEmpNo, options.managerEmpNo);
assert.strictEqual(appraisalUpdated.kraWeight, options.kraWeight);
assert.strictEqual(appraisalUpdated.competencyWeight, options.competencyWeight);
    });
  });

  describe("#delete", () => {
    it("should delete a appraisal", async () => {
      const appraisalDeleted = await thisService.remove(appraisalCreated._id);
      assert.strictEqual(appraisalDeleted._id.toString(), appraisalCreated._id.toString());
    });
  });
});