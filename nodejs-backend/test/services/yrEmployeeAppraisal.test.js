const assert = require("assert");
const app = require("../../src/app");

describe("yrEmployeeAppraisal service", () => {
  let thisService;
  let yrEmployeeAppraisalCreated;

  beforeEach(async () => {
    thisService = await app.service("yrEmployeeAppraisal");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (yrEmployeeAppraisal)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"employeeNo":"new value","staffName":"new value","fYear":23,"startDate":1769000691613,"endDate":1769000691613,"kRAScore":23,"weightedKRAScore":23,"competencyScore":23,"weightedCompetencyScore":23,"demeritScore":23,"totalScore":23,"finalScore":23,"empComment":"new value","mngComment":"new value","mngSuperiorComment":"new value","managerEmpNO":"new value","managerName":"new value","kRAWeight":23,"competencyWeight":23};

    beforeEach(async () => {
      yrEmployeeAppraisalCreated = await thisService.create(options);
    });

    it("should create a new yrEmployeeAppraisal", () => {
      assert.strictEqual(yrEmployeeAppraisalCreated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeAppraisalCreated.employeeNo, options.employeeNo);
assert.strictEqual(yrEmployeeAppraisalCreated.staffName, options.staffName);
assert.strictEqual(yrEmployeeAppraisalCreated.fYear, options.fYear);
assert.strictEqual(yrEmployeeAppraisalCreated.startDate, options.startDate);
assert.strictEqual(yrEmployeeAppraisalCreated.endDate, options.endDate);
assert.strictEqual(yrEmployeeAppraisalCreated.kRAScore, options.kRAScore);
assert.strictEqual(yrEmployeeAppraisalCreated.weightedKRAScore, options.weightedKRAScore);
assert.strictEqual(yrEmployeeAppraisalCreated.competencyScore, options.competencyScore);
assert.strictEqual(yrEmployeeAppraisalCreated.weightedCompetencyScore, options.weightedCompetencyScore);
assert.strictEqual(yrEmployeeAppraisalCreated.demeritScore, options.demeritScore);
assert.strictEqual(yrEmployeeAppraisalCreated.totalScore, options.totalScore);
assert.strictEqual(yrEmployeeAppraisalCreated.finalScore, options.finalScore);
assert.strictEqual(yrEmployeeAppraisalCreated.empComment, options.empComment);
assert.strictEqual(yrEmployeeAppraisalCreated.mngComment, options.mngComment);
assert.strictEqual(yrEmployeeAppraisalCreated.mngSuperiorComment, options.mngSuperiorComment);
assert.strictEqual(yrEmployeeAppraisalCreated.managerEmpNO, options.managerEmpNO);
assert.strictEqual(yrEmployeeAppraisalCreated.managerName, options.managerName);
assert.strictEqual(yrEmployeeAppraisalCreated.kRAWeight, options.kRAWeight);
assert.strictEqual(yrEmployeeAppraisalCreated.competencyWeight, options.competencyWeight);
    });
  });

  describe("#get", () => {
    it("should retrieve a yrEmployeeAppraisal by ID", async () => {
      const retrieved = await thisService.get(yrEmployeeAppraisalCreated._id);
      assert.strictEqual(retrieved._id, yrEmployeeAppraisalCreated._id);
    });
  });

  describe("#update", () => {
    let yrEmployeeAppraisalUpdated;
    const options = {"appraisalID":100,"employeeNo":"updated value","staffName":"updated value","fYear":100,"startDate":null,"endDate":null,"kRAScore":100,"weightedKRAScore":100,"competencyScore":100,"weightedCompetencyScore":100,"demeritScore":100,"totalScore":100,"finalScore":100,"empComment":"updated value","mngComment":"updated value","mngSuperiorComment":"updated value","managerEmpNO":"updated value","managerName":"updated value","kRAWeight":100,"competencyWeight":100};

    beforeEach(async () => {
      yrEmployeeAppraisalUpdated = await thisService.update(yrEmployeeAppraisalCreated._id, options);
    });

    it("should update an existing yrEmployeeAppraisal ", async () => {
      assert.strictEqual(yrEmployeeAppraisalUpdated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeAppraisalUpdated.employeeNo, options.employeeNo);
assert.strictEqual(yrEmployeeAppraisalUpdated.staffName, options.staffName);
assert.strictEqual(yrEmployeeAppraisalUpdated.fYear, options.fYear);
assert.strictEqual(yrEmployeeAppraisalUpdated.startDate, options.startDate);
assert.strictEqual(yrEmployeeAppraisalUpdated.endDate, options.endDate);
assert.strictEqual(yrEmployeeAppraisalUpdated.kRAScore, options.kRAScore);
assert.strictEqual(yrEmployeeAppraisalUpdated.weightedKRAScore, options.weightedKRAScore);
assert.strictEqual(yrEmployeeAppraisalUpdated.competencyScore, options.competencyScore);
assert.strictEqual(yrEmployeeAppraisalUpdated.weightedCompetencyScore, options.weightedCompetencyScore);
assert.strictEqual(yrEmployeeAppraisalUpdated.demeritScore, options.demeritScore);
assert.strictEqual(yrEmployeeAppraisalUpdated.totalScore, options.totalScore);
assert.strictEqual(yrEmployeeAppraisalUpdated.finalScore, options.finalScore);
assert.strictEqual(yrEmployeeAppraisalUpdated.empComment, options.empComment);
assert.strictEqual(yrEmployeeAppraisalUpdated.mngComment, options.mngComment);
assert.strictEqual(yrEmployeeAppraisalUpdated.mngSuperiorComment, options.mngSuperiorComment);
assert.strictEqual(yrEmployeeAppraisalUpdated.managerEmpNO, options.managerEmpNO);
assert.strictEqual(yrEmployeeAppraisalUpdated.managerName, options.managerName);
assert.strictEqual(yrEmployeeAppraisalUpdated.kRAWeight, options.kRAWeight);
assert.strictEqual(yrEmployeeAppraisalUpdated.competencyWeight, options.competencyWeight);
    });
  });

  describe("#delete", () => {
  let yrEmployeeAppraisalDeleted;
    beforeEach(async () => {
      yrEmployeeAppraisalDeleted = await thisService.remove(yrEmployeeAppraisalCreated._id);
    });

    it("should delete a yrEmployeeAppraisal", async () => {
      assert.strictEqual(yrEmployeeAppraisalDeleted._id, yrEmployeeAppraisalCreated._id);
    });
  });
});