const assert = require("assert");
const app = require("../../src/app");

describe("employeeAppraisalRemarks service", () => {
  let thisService;
  let employeeAppraisalRemarkCreated;

  beforeEach(async () => {
    thisService = await app.service("employeeAppraisalRemarks");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employeeAppraisalRemarks)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"remarks":"new value"};

    beforeEach(async () => {
      employeeAppraisalRemarkCreated = await thisService.create(options);
    });

    it("should create a new employeeAppraisalRemark", () => {
      assert.strictEqual(employeeAppraisalRemarkCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalRemarkCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeAppraisalRemark by ID", async () => {
      const retrieved = await thisService.get(employeeAppraisalRemarkCreated._id);
      assert.strictEqual(retrieved._id, employeeAppraisalRemarkCreated._id);
    });
  });

  describe("#update", () => {
    let employeeAppraisalRemarkUpdated;
    const options = {"appraisalID":100,"remarks":"updated value"};

    beforeEach(async () => {
      employeeAppraisalRemarkUpdated = await thisService.update(employeeAppraisalRemarkCreated._id, options);
    });

    it("should update an existing employeeAppraisalRemark ", async () => {
      assert.strictEqual(employeeAppraisalRemarkUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalRemarkUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
  let employeeAppraisalRemarkDeleted;
    beforeEach(async () => {
      employeeAppraisalRemarkDeleted = await thisService.remove(employeeAppraisalRemarkCreated._id);
    });

    it("should delete a employeeAppraisalRemark", async () => {
      assert.strictEqual(employeeAppraisalRemarkDeleted._id, employeeAppraisalRemarkCreated._id);
    });
  });
});