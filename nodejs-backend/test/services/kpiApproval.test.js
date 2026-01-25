const assert = require("assert");
const app = require("../../src/app");

describe("kpiApproval service", () => {
  let thisService;
  let kpiApprovalCreated;

  beforeEach(async () => {
    thisService = await app.service("kpiApproval");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (kpiApproval)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"kpi":"new value","approved":true,"approvedDate":23,"kpiSetDate":23};

    beforeEach(async () => {
      kpiApprovalCreated = await thisService.create(options);
    });

    it("should create a new kpiApproval", () => {
      assert.strictEqual(kpiApprovalCreated.parId, options.parId);
assert.strictEqual(kpiApprovalCreated.appraisorId, options.appraisorId);
assert.strictEqual(kpiApprovalCreated.appraiseeId, options.appraiseeId);
assert.strictEqual(kpiApprovalCreated.kpi, options.kpi);
assert.strictEqual(kpiApprovalCreated.approved, options.approved);
assert.strictEqual(kpiApprovalCreated.approvedDate, options.approvedDate);
assert.strictEqual(kpiApprovalCreated.kpiSetDate, options.kpiSetDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a kpiApproval by ID", async () => {
      const retrieved = await thisService.get(kpiApprovalCreated._id);
      assert.strictEqual(retrieved._id, kpiApprovalCreated._id);
    });
  });

  describe("#update", () => {
    let kpiApprovalUpdated;
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"kpi":"updated value","approved":false,"approvedDate":100,"kpiSetDate":100};

    beforeEach(async () => {
      kpiApprovalUpdated = await thisService.update(kpiApprovalCreated._id, options);
    });

    it("should update an existing kpiApproval ", async () => {
      assert.strictEqual(kpiApprovalUpdated.parId, options.parId);
assert.strictEqual(kpiApprovalUpdated.appraisorId, options.appraisorId);
assert.strictEqual(kpiApprovalUpdated.appraiseeId, options.appraiseeId);
assert.strictEqual(kpiApprovalUpdated.kpi, options.kpi);
assert.strictEqual(kpiApprovalUpdated.approved, options.approved);
assert.strictEqual(kpiApprovalUpdated.approvedDate, options.approvedDate);
assert.strictEqual(kpiApprovalUpdated.kpiSetDate, options.kpiSetDate);
    });
  });

  describe("#delete", () => {
  let kpiApprovalDeleted;
    beforeEach(async () => {
      kpiApprovalDeleted = await thisService.remove(kpiApprovalCreated._id);
    });

    it("should delete a kpiApproval", async () => {
      assert.strictEqual(kpiApprovalDeleted._id, kpiApprovalCreated._id);
    });
  });
});