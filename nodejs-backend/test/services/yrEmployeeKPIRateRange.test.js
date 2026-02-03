const assert = require("assert");
const app = require("../../src/app");

describe("yrEmployeeKPIRateRange service", () => {
  let thisService;
  let yrEmployeeKPIRateRangeCreated;

  beforeEach(async () => {
    thisService = await app.service("yrEmployeeKPIRateRange");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (yrEmployeeKPIRateRange)");
  });

  describe("#create", () => {
    const options = {"appraisalID":23,"secKPIID":23,"rate":23,"startValue":23,"endValue":23};

    beforeEach(async () => {
      yrEmployeeKPIRateRangeCreated = await thisService.create(options);
    });

    it("should create a new yrEmployeeKPIRateRange", () => {
      assert.strictEqual(yrEmployeeKPIRateRangeCreated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeKPIRateRangeCreated.secKPIID, options.secKPIID);
assert.strictEqual(yrEmployeeKPIRateRangeCreated.rate, options.rate);
assert.strictEqual(yrEmployeeKPIRateRangeCreated.startValue, options.startValue);
assert.strictEqual(yrEmployeeKPIRateRangeCreated.endValue, options.endValue);
    });
  });

  describe("#get", () => {
    it("should retrieve a yrEmployeeKPIRateRange by ID", async () => {
      const retrieved = await thisService.get(yrEmployeeKPIRateRangeCreated._id);
      assert.strictEqual(retrieved._id, yrEmployeeKPIRateRangeCreated._id);
    });
  });

  describe("#update", () => {
    let yrEmployeeKPIRateRangeUpdated;
    const options = {"appraisalID":100,"secKPIID":100,"rate":100,"startValue":100,"endValue":100};

    beforeEach(async () => {
      yrEmployeeKPIRateRangeUpdated = await thisService.update(yrEmployeeKPIRateRangeCreated._id, options);
    });

    it("should update an existing yrEmployeeKPIRateRange ", async () => {
      assert.strictEqual(yrEmployeeKPIRateRangeUpdated.appraisalID, options.appraisalID);
assert.strictEqual(yrEmployeeKPIRateRangeUpdated.secKPIID, options.secKPIID);
assert.strictEqual(yrEmployeeKPIRateRangeUpdated.rate, options.rate);
assert.strictEqual(yrEmployeeKPIRateRangeUpdated.startValue, options.startValue);
assert.strictEqual(yrEmployeeKPIRateRangeUpdated.endValue, options.endValue);
    });
  });

  describe("#delete", () => {
  let yrEmployeeKPIRateRangeDeleted;
    beforeEach(async () => {
      yrEmployeeKPIRateRangeDeleted = await thisService.remove(yrEmployeeKPIRateRangeCreated._id);
    });

    it("should delete a yrEmployeeKPIRateRange", async () => {
      assert.strictEqual(yrEmployeeKPIRateRangeDeleted._id, yrEmployeeKPIRateRangeCreated._id);
    });
  });
});