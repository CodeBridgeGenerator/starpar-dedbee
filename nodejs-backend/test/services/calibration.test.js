const assert = require("assert");
const app = require("../../src/app");

describe("calibration service", () => {
  let thisService;
  let calibrationCreated;

  beforeEach(async () => {
    thisService = await app.service("calibration");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (calibration)");
  });

  describe("#create", () => {
    const options = {"name":"new value","low":"new value","high":23};

    beforeEach(async () => {
      calibrationCreated = await thisService.create(options);
    });

    it("should create a new calibration", () => {
      assert.strictEqual(calibrationCreated.name, options.name);
assert.strictEqual(calibrationCreated.low, options.low);
assert.strictEqual(calibrationCreated.high, options.high);
    });
  });

  describe("#get", () => {
    it("should retrieve a calibration by ID", async () => {
      const retrieved = await thisService.get(calibrationCreated._id);
      assert.strictEqual(retrieved._id, calibrationCreated._id);
    });
  });

  describe("#update", () => {
    let calibrationUpdated;
    const options = {"name":"updated value","low":"updated value","high":100};

    beforeEach(async () => {
      calibrationUpdated = await thisService.update(calibrationCreated._id, options);
    });

    it("should update an existing calibration ", async () => {
      assert.strictEqual(calibrationUpdated.name, options.name);
assert.strictEqual(calibrationUpdated.low, options.low);
assert.strictEqual(calibrationUpdated.high, options.high);
    });
  });

  describe("#delete", () => {
  let calibrationDeleted;
    beforeEach(async () => {
      calibrationDeleted = await thisService.remove(calibrationCreated._id);
    });

    it("should delete a calibration", async () => {
      assert.strictEqual(calibrationDeleted._id, calibrationCreated._id);
    });
  });
});