const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("calibration service", () => {
  let thisService;
  let calibrationCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("calibration");

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
    assert.ok(thisService, "Registered the service (calibration)");
  });

  describe("#create", () => {
    const options = {"name":"new value","low":"new value","high":23};

    beforeEach(async () => {
      calibrationCreated = await thisService.create({...options, ...users});
    });

    it("should create a new calibration", () => {
      assert.strictEqual(calibrationCreated.name, options.name);
assert.strictEqual(calibrationCreated.low, options.low);
assert.strictEqual(calibrationCreated.high, options.high);
    });
  });

  describe("#get", () => {
    it("should retrieve a calibration by ID", async () => {
      const retrieved = await thisService.findById(calibrationCreated._id);
      assert.strictEqual(retrieved._id.toString(), calibrationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","low":"updated value","high":100};

    it("should update an existing calibration ", async () => {
      const calibrationUpdated = await thisService.findByIdAndUpdate(
        calibrationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(calibrationUpdated.name, options.name);
assert.strictEqual(calibrationUpdated.low, options.low);
assert.strictEqual(calibrationUpdated.high, options.high);
    });
  });

  describe("#delete", () => {
    it("should delete a calibration", async () => {
      const calibrationDeleted = await thisService.remove(calibrationCreated._id);
      assert.strictEqual(calibrationDeleted._id.toString(), calibrationCreated._id.toString());
    });
  });
});