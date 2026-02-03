const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("employeeKPIRateRange service", () => {
  let thisService;
  let employeeKPIRateRangeCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("employeeKPIRateRange");

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
    assert.ok(thisService, "Registered the service (employeeKPIRateRange)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"secKPIID":23,"rate":23,"startValue":23,"endValue":23};

    beforeEach(async () => {
      employeeKPIRateRangeCreated = await thisService.create({...options, ...users});
    });

    it("should create a new employeeKPIRateRange", () => {
      assert.strictEqual(employeeKPIRateRangeCreated.appraisalID, options.appraisalID);
assert.strictEqual(employeeKPIRateRangeCreated.secKPIID, options.secKPIID);
assert.strictEqual(employeeKPIRateRangeCreated.rate, options.rate);
assert.strictEqual(employeeKPIRateRangeCreated.startValue, options.startValue);
assert.strictEqual(employeeKPIRateRangeCreated.endValue, options.endValue);
    });
  });

  describe("#get", () => {
    it("should retrieve a employeeKPIRateRange by ID", async () => {
      const retrieved = await thisService.findById(employeeKPIRateRangeCreated._id);
      assert.strictEqual(retrieved._id.toString(), employeeKPIRateRangeCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"appraisalID":100,"secKPIID":100,"rate":100,"startValue":100,"endValue":100};

    it("should update an existing employeeKPIRateRange ", async () => {
      const employeeKPIRateRangeUpdated = await thisService.findByIdAndUpdate(
        employeeKPIRateRangeCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(employeeKPIRateRangeUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeKPIRateRangeUpdated.secKPIID, options.secKPIID);
assert.strictEqual(employeeKPIRateRangeUpdated.rate, options.rate);
assert.strictEqual(employeeKPIRateRangeUpdated.startValue, options.startValue);
assert.strictEqual(employeeKPIRateRangeUpdated.endValue, options.endValue);
    });
  });

  describe("#delete", () => {
    it("should delete a employeeKPIRateRange", async () => {
      const employeeKPIRateRangeDeleted = await thisService.remove(employeeKPIRateRangeCreated._id);
      assert.strictEqual(employeeKPIRateRangeDeleted._id.toString(), employeeKPIRateRangeCreated._id.toString());
    });
  });
});