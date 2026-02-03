const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("employeeAppraisal service", () => {
  let thisService;
  let employeeAppraisalCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("employeeAppraisal");

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
    assert.ok(thisService, "Registered the service (employeeAppraisal)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"employeeNo":"new value","staffName":"new value","fYear":23,"startDate":1770157793276,"endDate":1770157793276,"kRAScore":23,"weightedKRAScore":23,"competencyScore":23,"weightedCompetencyScore":23,"demeritScore":23,"totalScore":23,"finalScore":23,"empComment":"new value","mngComment":"new value","mngSuperiorComment":"new value","managerEmpNO":"new value","managerName":"new value","kRAWeight":23,"competencyWeight":23};

    beforeEach(async () => {
      employeeAppraisalCreated = await thisService.create({...options, ...users});
    });

    it("should create a new employeeAppraisal", () => {
      assert.strictEqual(employeeAppraisalCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalCreated.employeeNo, options.employeeNo);
assert.strictEqual(employeeAppraisalCreated.staffName, options.staffName);
assert.strictEqual(employeeAppraisalCreated.fYear, options.fYear);
assert.strictEqual(employeeAppraisalCreated.startDate, options.startDate);
assert.strictEqual(employeeAppraisalCreated.endDate, options.endDate);
assert.strictEqual(employeeAppraisalCreated.kRAScore, options.kRAScore);
assert.strictEqual(employeeAppraisalCreated.weightedKRAScore, options.weightedKRAScore);
assert.strictEqual(employeeAppraisalCreated.competencyScore, options.competencyScore);
assert.strictEqual(employeeAppraisalCreated.weightedCompetencyScore, options.weightedCompetencyScore);
assert.strictEqual(employeeAppraisalCreated.demeritScore, options.demeritScore);
assert.strictEqual(employeeAppraisalCreated.totalScore, options.totalScore);
assert.strictEqual(employeeAppraisalCreated.finalScore, options.finalScore);
assert.strictEqual(employeeAppraisalCreated.empComment, options.empComment);
assert.strictEqual(employeeAppraisalCreated.mngComment, options.mngComment);
assert.strictEqual(employeeAppraisalCreated.mngSuperiorComment, options.mngSuperiorComment);
assert.strictEqual(employeeAppraisalCreated.managerEmpNO, options.managerEmpNO);
assert.strictEqual(employeeAppraisalCreated.managerName, options.managerName);
assert.strictEqual(employeeAppraisalCreated.kRAWeight, options.kRAWeight);
assert.strictEqual(employeeAppraisalCreated.competencyWeight, options.competencyWeight);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeAppraisal by ID", async () => {
      const retrieved = await thisService.findById(employeeAppraisalCreated._id);
      assert.strictEqual(retrieved._id.toString(), employeeAppraisalCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraisalID":100,"employeeNo":"updated value","staffName":"updated value","fYear":100,"startDate":null,"endDate":null,"kRAScore":100,"weightedKRAScore":100,"competencyScore":100,"weightedCompetencyScore":100,"demeritScore":100,"totalScore":100,"finalScore":100,"empComment":"updated value","mngComment":"updated value","mngSuperiorComment":"updated value","managerEmpNO":"updated value","managerName":"updated value","kRAWeight":100,"competencyWeight":100};

    it("should update an existing employeeAppraisal ", async () => {
      const employeeAppraisalUpdated = await thisService.findByIdAndUpdate(
        employeeAppraisalCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(employeeAppraisalUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalUpdated.employeeNo, options.employeeNo);
assert.strictEqual(employeeAppraisalUpdated.staffName, options.staffName);
assert.strictEqual(employeeAppraisalUpdated.fYear, options.fYear);
assert.strictEqual(employeeAppraisalUpdated.startDate, options.startDate);
assert.strictEqual(employeeAppraisalUpdated.endDate, options.endDate);
assert.strictEqual(employeeAppraisalUpdated.kRAScore, options.kRAScore);
assert.strictEqual(employeeAppraisalUpdated.weightedKRAScore, options.weightedKRAScore);
assert.strictEqual(employeeAppraisalUpdated.competencyScore, options.competencyScore);
assert.strictEqual(employeeAppraisalUpdated.weightedCompetencyScore, options.weightedCompetencyScore);
assert.strictEqual(employeeAppraisalUpdated.demeritScore, options.demeritScore);
assert.strictEqual(employeeAppraisalUpdated.totalScore, options.totalScore);
assert.strictEqual(employeeAppraisalUpdated.finalScore, options.finalScore);
assert.strictEqual(employeeAppraisalUpdated.empComment, options.empComment);
assert.strictEqual(employeeAppraisalUpdated.mngComment, options.mngComment);
assert.strictEqual(employeeAppraisalUpdated.mngSuperiorComment, options.mngSuperiorComment);
assert.strictEqual(employeeAppraisalUpdated.managerEmpNO, options.managerEmpNO);
assert.strictEqual(employeeAppraisalUpdated.managerName, options.managerName);
assert.strictEqual(employeeAppraisalUpdated.kRAWeight, options.kRAWeight);
assert.strictEqual(employeeAppraisalUpdated.competencyWeight, options.competencyWeight);
    });
  });

  describe("#delete", () => {
    it("should delete a employeeAppraisal", async () => {
      const employeeAppraisalDeleted = await thisService.remove(employeeAppraisalCreated._id);
      assert.strictEqual(employeeAppraisalDeleted._id.toString(), employeeAppraisalCreated._id.toString());
    });
  });
});