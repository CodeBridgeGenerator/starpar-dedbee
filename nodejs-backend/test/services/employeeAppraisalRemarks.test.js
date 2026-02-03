const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("employeeAppraisalRemarks service", () => {
  let thisService;
  let employeeAppraisalRemarkCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("employeeAppraisalRemarks");

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
    assert.ok(thisService, "Registered the service (employeeAppraisalRemarks)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"remarks":"new value"};

    beforeEach(async () => {
      employeeAppraisalRemarkCreated = await thisService.create({...options, ...users});
    });

    it("should create a new employeeAppraisalRemark", () => {
      assert.strictEqual(employeeAppraisalRemarkCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalRemarkCreated.remarks, options.remarks);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeAppraisalRemark by ID", async () => {
      const retrieved = await thisService.findById(employeeAppraisalRemarkCreated._id);
      assert.strictEqual(retrieved._id.toString(), employeeAppraisalRemarkCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraisalID":100,"remarks":"updated value"};

    it("should update an existing employeeAppraisalRemark ", async () => {
      const employeeAppraisalRemarkUpdated = await thisService.findByIdAndUpdate(
        employeeAppraisalRemarkCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(employeeAppraisalRemarkUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeAppraisalRemarkUpdated.remarks, options.remarks);
    });
  });

  describe("#delete", () => {
    it("should delete a employeeAppraisalRemark", async () => {
      const employeeAppraisalRemarkDeleted = await thisService.remove(employeeAppraisalRemarkCreated._id);
      assert.strictEqual(employeeAppraisalRemarkDeleted._id.toString(), employeeAppraisalRemarkCreated._id.toString());
    });
  });
});