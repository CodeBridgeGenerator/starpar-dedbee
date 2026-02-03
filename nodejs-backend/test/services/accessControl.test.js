const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("accessControl service", () => {
  let thisService;
  let accessControlCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("accessControl");

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
    assert.ok(thisService, "Registered the service (accessControl)");
  });

  describe("#create", () => {
    const options = {"parId":23,"accessTo":23};

    beforeEach(async () => {
      accessControlCreated = await thisService.create({...options, ...users});
    });

    it("should create a new accessControl", () => {
      assert.strictEqual(accessControlCreated.parId, options.parId);
assert.strictEqual(accessControlCreated.accessTo, options.accessTo);
    });
  });

  describe("#get", () => {
    it("should retrieve a accessControl by ID", async () => {
      const retrieved = await thisService.findById(accessControlCreated._id);
      assert.strictEqual(retrieved._id.toString(), accessControlCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parId":100,"accessTo":100};

    it("should update an existing accessControl ", async () => {
      const accessControlUpdated = await thisService.findByIdAndUpdate(
        accessControlCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(accessControlUpdated.parId, options.parId);
assert.strictEqual(accessControlUpdated.accessTo, options.accessTo);
    });
  });

  describe("#delete", () => {
    it("should delete a accessControl", async () => {
      const accessControlDeleted = await thisService.remove(accessControlCreated._id);
      assert.strictEqual(accessControlDeleted._id.toString(), accessControlCreated._id.toString());
    });
  });
});