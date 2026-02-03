const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("masterBsc service", () => {
  let thisService;
  let masterBscCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("masterBsc");

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
    assert.ok(thisService, "Registered the service (masterBsc)");
  });

  describe("#create", () => {
    const options = {"code":"new value","name":"new value"};

    beforeEach(async () => {
      masterBscCreated = await thisService.create({...options, ...users});
    });

    it("should create a new masterBsc", () => {
      assert.strictEqual(masterBscCreated.code, options.code);
assert.strictEqual(masterBscCreated.name, options.name);
    });
  });

  describe("#get", () => {
    it("should retrieve a masterBsc by ID", async () => {
      const retrieved = await thisService.findById(masterBscCreated._id);
      assert.strictEqual(retrieved._id.toString(), masterBscCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"code":"updated value","name":"updated value"};

    it("should update an existing masterBsc ", async () => {
      const masterBscUpdated = await thisService.findByIdAndUpdate(
        masterBscCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(masterBscUpdated.code, options.code);
assert.strictEqual(masterBscUpdated.name, options.name);
    });
  });

  describe("#delete", () => {
    it("should delete a masterBsc", async () => {
      const masterBscDeleted = await thisService.remove(masterBscCreated._id);
      assert.strictEqual(masterBscDeleted._id.toString(), masterBscCreated._id.toString());
    });
  });
});