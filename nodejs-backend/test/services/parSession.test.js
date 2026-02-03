const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("parSession service", () => {
  let thisService;
  let parSessionCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("parSession");

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
    assert.ok(thisService, "Registered the service (parSession)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","startDate":1770157793421,"endDate":1770157793421,"status":"new value"};

    beforeEach(async () => {
      parSessionCreated = await thisService.create({...options, ...users});
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
      const retrieved = await thisService.findById(parSessionCreated._id);
      assert.strictEqual(retrieved._id.toString(), parSessionCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value","startDate":null,"endDate":null,"status":"updated value"};

    it("should update an existing parSession ", async () => {
      const parSessionUpdated = await thisService.findByIdAndUpdate(
        parSessionCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(parSessionUpdated.name, options.name);
assert.strictEqual(parSessionUpdated.description, options.description);
assert.strictEqual(parSessionUpdated.startDate, options.startDate);
assert.strictEqual(parSessionUpdated.endDate, options.endDate);
assert.strictEqual(parSessionUpdated.status, options.status);
    });
  });

  describe("#delete", () => {
    it("should delete a parSession", async () => {
      const parSessionDeleted = await thisService.remove(parSessionCreated._id);
      assert.strictEqual(parSessionDeleted._id.toString(), parSessionCreated._id.toString());
    });
  });
});