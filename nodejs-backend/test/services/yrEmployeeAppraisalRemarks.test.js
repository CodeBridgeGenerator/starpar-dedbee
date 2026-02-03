const assert = require("assert");
const app = require("../../src/app");

describe("yrEmployeeAppraisalRemarks service", () => {
  let thisService;
  let yrEmployeeAppraisalRemarkCreated;

  beforeEach(async () => {
    thisService = await app.service("yrEmployeeAppraisalRemarks");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (yrEmployeeAppraisalRemarks)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"remarks":"new value"};

    beforeEach(async () => {
      yrEmployeeAppraisalRemarkCreated = await thisService.create(options);
    });

    it("should create a new yrEmployeeAppraisalRemark", () => {
      assert.strictEqual(yrEmployeeAppraisalRemarkCreated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeAppraisalRemarkCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a yrEmployeeAppraisalRemark by ID", async () => {
      const retrieved = await thisService.get(yrEmployeeAppraisalRemarkCreated._id);
      assert.strictEqual(retrieved._id, yrEmployeeAppraisalRemarkCreated._id);
    });
  });

  describe("#update", () => {
    let yrEmployeeAppraisalRemarkUpdated;
    const options = {"appraisalID":100,"remarks":"updated value"};

    beforeEach(async () => {
      yrEmployeeAppraisalRemarkUpdated = await thisService.update(yrEmployeeAppraisalRemarkCreated._id, options);
    });

    it("should update an existing yrEmployeeAppraisalRemark ", async () => {
      assert.strictEqual(yrEmployeeAppraisalRemarkUpdated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeAppraisalRemarkUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
  let yrEmployeeAppraisalRemarkDeleted;
    beforeEach(async () => {
      yrEmployeeAppraisalRemarkDeleted = await thisService.remove(yrEmployeeAppraisalRemarkCreated._id);
    });

    it("should delete a yrEmployeeAppraisalRemark", async () => {
      assert.strictEqual(yrEmployeeAppraisalRemarkDeleted._id, yrEmployeeAppraisalRemarkCreated._id);
    });
  });
});