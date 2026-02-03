const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("masterKra service", () => {
  let thisService;
  let masterKraCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("masterKra");

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
    assert.ok(thisService, "Registered the service (masterKra)");
  });

  describe("#create", () => {
    const options = {"departmentId":"aasdfasdfasdfadsfadfa","parSessionId":"aasdfasdfasdfadsfadfa","balancedScorecard":"aasdfasdfasdfadsfadfa","kpi":"new value","weight":23,"target":23,"actualAchievement":23,"rate":23,"weightedRate":23,"name":"new value","sectionId":"aasdfasdfasdfadsfadfa"};

    beforeEach(async () => {
      masterKraCreated = await thisService.create({...options, ...users});
    });

    it("should create a new masterKra", () => {
      assert.strictEqual(masterKraCreated.departmentId, options.departmentId);
assert.strictEqual(masterKraCreated.parSessionId, options.parSessionId);
assert.strictEqual(masterKraCreated.balancedScorecard, options.balancedScorecard);
assert.strictEqual(masterKraCreated.kpi, options.kpi);
assert.strictEqual(masterKraCreated.weight, options.weight);
assert.strictEqual(masterKraCreated.target, options.target);
assert.strictEqual(masterKraCreated.actualAchievement, options.actualAchievement);
assert.strictEqual(masterKraCreated.rate, options.rate);
assert.strictEqual(masterKraCreated.weightedRate, options.weightedRate);
assert.strictEqual(masterKraCreated.name, options.name);
assert.strictEqual(masterKraCreated.sectionId, options.sectionId);
    });
  });

  describe("#get", () => {
    it("should retrieve a masterKra by ID", async () => {
      const retrieved = await thisService.findById(masterKraCreated._id);
      assert.strictEqual(retrieved._id.toString(), masterKraCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"departmentId":"345345345345345345345","parSessionId":"345345345345345345345","balancedScorecard":"345345345345345345345","kpi":"updated value","weight":100,"target":100,"actualAchievement":100,"rate":100,"weightedRate":100,"name":"updated value","sectionId":"345345345345345345345"};

    it("should update an existing masterKra ", async () => {
      const masterKraUpdated = await thisService.findByIdAndUpdate(
        masterKraCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(masterKraUpdated.departmentId, options.departmentId);
assert.strictEqual(masterKraUpdated.parSessionId, options.parSessionId);
assert.strictEqual(masterKraUpdated.balancedScorecard, options.balancedScorecard);
assert.strictEqual(masterKraUpdated.kpi, options.kpi);
assert.strictEqual(masterKraUpdated.weight, options.weight);
assert.strictEqual(masterKraUpdated.target, options.target);
assert.strictEqual(masterKraUpdated.actualAchievement, options.actualAchievement);
assert.strictEqual(masterKraUpdated.rate, options.rate);
assert.strictEqual(masterKraUpdated.weightedRate, options.weightedRate);
assert.strictEqual(masterKraUpdated.name, options.name);
assert.strictEqual(masterKraUpdated.sectionId, options.sectionId);
    });
  });

  describe("#delete", () => {
    it("should delete a masterKra", async () => {
      const masterKraDeleted = await thisService.remove(masterKraCreated._id);
      assert.strictEqual(masterKraDeleted._id.toString(), masterKraCreated._id.toString());
    });
  });
});