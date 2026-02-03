const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("masterTraining service", () => {
  let thisService;
  let masterTrainingCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("masterTraining");

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
    assert.ok(thisService, "Registered the service (masterTraining)");
  });

  describe("#create", () => {
    const options = {"name":"new value","category":"new value"};

    beforeEach(async () => {
      masterTrainingCreated = await thisService.create({...options, ...users});
    });

    it("should create a new masterTraining", () => {
      assert.strictEqual(masterTrainingCreated.name, options.name);
assert.strictEqual(masterTrainingCreated.category, options.category);
    });
  });

  describe("#get", () => {
    it("should retrieve a masterTraining by ID", async () => {
      const retrieved = await thisService.findById(masterTrainingCreated._id);
      assert.strictEqual(retrieved._id.toString(), masterTrainingCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","category":"updated value"};

    it("should update an existing masterTraining ", async () => {
      const masterTrainingUpdated = await thisService.findByIdAndUpdate(
        masterTrainingCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(masterTrainingUpdated.name, options.name);
assert.strictEqual(masterTrainingUpdated.category, options.category);
    });
  });

  describe("#delete", () => {
    it("should delete a masterTraining", async () => {
      const masterTrainingDeleted = await thisService.remove(masterTrainingCreated._id);
      assert.strictEqual(masterTrainingDeleted._id.toString(), masterTrainingCreated._id.toString());
    });
  });
});