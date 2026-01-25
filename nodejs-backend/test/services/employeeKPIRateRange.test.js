const assert = require("assert");
const app = require("../../src/app");

describe("employeeKPIRateRange service", () => {
  let thisService;
  let employeeKPIRateRangeCreated;

  beforeEach(async () => {
    thisService = await app.service("employeeKPIRateRange");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (employeeKPIRateRange)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"secKPIID":23,"rate":23,"startValue":23,"endValue":23};

    beforeEach(async () => {
      employeeKPIRateRangeCreated = await thisService.create(options);
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
      const retrieved = await thisService.get(employeeKPIRateRangeCreated._id);
      assert.strictEqual(retrieved._id, employeeKPIRateRangeCreated._id);
    });
  });

  describe("#update", () => {
    let employeeKPIRateRangeUpdated;
    const options = {"appraisalID":100,"secKPIID":100,"rate":100,"startValue":100,"endValue":100};

    beforeEach(async () => {
      employeeKPIRateRangeUpdated = await thisService.update(employeeKPIRateRangeCreated._id, options);
    });

    it("should update an existing employeeKPIRateRange ", async () => {
      assert.strictEqual(employeeKPIRateRangeUpdated.appraisalID, options.appraisalID);
assert.strictEqual(employeeKPIRateRangeUpdated.secKPIID, options.secKPIID);
assert.strictEqual(employeeKPIRateRangeUpdated.rate, options.rate);
assert.strictEqual(employeeKPIRateRangeUpdated.startValue, options.startValue);
assert.strictEqual(employeeKPIRateRangeUpdated.endValue, options.endValue);
    });
  });

  describe("#delete", () => {
  let employeeKPIRateRangeDeleted;
    beforeEach(async () => {
      employeeKPIRateRangeDeleted = await thisService.remove(employeeKPIRateRangeCreated._id);
    });

    it("should delete a employeeKPIRateRange", async () => {
      assert.strictEqual(employeeKPIRateRangeDeleted._id, employeeKPIRateRangeCreated._id);
    });
  });
});