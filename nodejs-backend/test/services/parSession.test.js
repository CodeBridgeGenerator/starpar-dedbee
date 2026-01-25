const assert = require("assert");
const app = require("../../src/app");

describe("parSession service", () => {
  let thisService;
  let parSessionCreated;

  beforeEach(async () => {
    thisService = await app.service("parSession");
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (parSession)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","startDate":1769369338890,"endDate":1769369338890,"status":"new value"};

    beforeEach(async () => {
      parSessionCreated = await thisService.create(options);
    });

    it("should create a new parSession", () => {
      assert.strictEqual(parSessionCreated.name, options.name);
assert.strictEqual(parSessionCreated.description, options.description);
assert.strictEqual(parSessionCreated.startDate, options.startDate);
assert.strictEqual(parSessionCreated.endDate, options.endDate);
assert.strictEqual(parSessionCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a parSession by ID", async () => {
      const retrieved = await thisService.get(parSessionCreated._id);
      assert.strictEqual(retrieved._id, parSessionCreated._id);
    });
  });

  describe("#update", () => {
    let parSessionUpdated;
    const options = {"name":"updated value","description":"updated value","startDate":null,"endDate":null,"status":"updated value"};

    beforeEach(async () => {
      parSessionUpdated = await thisService.update(parSessionCreated._id, options);
    });

    it("should update an existing parSession ", async () => {
      assert.strictEqual(parSessionUpdated.name, options.name);
assert.strictEqual(parSessionUpdated.description, options.description);
assert.strictEqual(parSessionUpdated.startDate, options.startDate);
assert.strictEqual(parSessionUpdated.endDate, options.endDate);
assert.strictEqual(parSessionUpdated.status, options.status);
    });
  });

  describe("#delete", () => {
  let parSessionDeleted;
    beforeEach(async () => {
      parSessionDeleted = await thisService.remove(parSessionCreated._id);
    });

    it("should delete a parSession", async () => {
      assert.strictEqual(parSessionDeleted._id, parSessionCreated._id);
    });
  });
});