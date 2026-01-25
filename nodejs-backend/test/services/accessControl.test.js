const assert = require("assert");
const app = require("../../src/app");

describe("accessControl service", () => {
  let thisService;
  let accessControlCreated;

  beforeEach(async () => {
    thisService = await app.service("accessControl");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (accessControl)");
  });

  describe("#create", () => {
    const options = {"parId":23,"accessTo":23};

    beforeEach(async () => {
      accessControlCreated = await thisService.create(options);
    });

    it("should create a new accessControl", () => {
      assert.strictEqual(accessControlCreated.parId, options.parId);
assert.strictEqual(accessControlCreated.accessTo, options.accessTo);
    });
  });

  describe("#get", () => {
    it("should retrieve a accessControl by ID", async () => {
      const retrieved = await thisService.get(accessControlCreated._id);
      assert.strictEqual(retrieved._id, accessControlCreated._id);
    });
  });

  describe("#update", () => {
    let accessControlUpdated;
    const options = {"parId":100,"accessTo":100};

    beforeEach(async () => {
      accessControlUpdated = await thisService.update(accessControlCreated._id, options);
    });

    it("should update an existing accessControl ", async () => {
      assert.strictEqual(accessControlUpdated.parId, options.parId);
assert.strictEqual(accessControlUpdated.accessTo, options.accessTo);
    });
  });

  describe("#delete", () => {
  let accessControlDeleted;
    beforeEach(async () => {
      accessControlDeleted = await thisService.remove(accessControlCreated._id);
    });

    it("should delete a accessControl", async () => {
      assert.strictEqual(accessControlDeleted._id, accessControlCreated._id);
    });
  });
});