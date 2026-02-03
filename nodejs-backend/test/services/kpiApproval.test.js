const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("kpiApproval service", () => {
  let thisService;
  let kpiApprovalCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("kpiApproval");

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
    assert.ok(thisService, "Registered the service (kpiApproval)");
  });

  describe("#create", () => {
    const options = {"parId":23,"appraisorId":23,"appraiseeId":23,"kpi":"new value","approved":true,"approvedDate":23,"kpiSetDate":23};

    beforeEach(async () => {
      kpiApprovalCreated = await thisService.create({...options, ...users});
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
      const retrieved = await thisService.findById(kpiApprovalCreated._id);
      assert.strictEqual(retrieved._id.toString(), kpiApprovalCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parId":100,"appraisorId":100,"appraiseeId":100,"kpi":"updated value","approved":false,"approvedDate":100,"kpiSetDate":100};

    it("should update an existing kpiApproval ", async () => {
      const kpiApprovalUpdated = await thisService.findByIdAndUpdate(
        kpiApprovalCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
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
    it("should delete a kpiApproval", async () => {
      const kpiApprovalDeleted = await thisService.remove(kpiApprovalCreated._id);
      assert.strictEqual(kpiApprovalDeleted._id.toString(), kpiApprovalCreated._id.toString());
    });
  });
});