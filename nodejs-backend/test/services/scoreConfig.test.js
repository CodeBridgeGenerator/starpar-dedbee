const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("scoreConfig service", () => {
  let thisService;
  let scoreConfigCreated;
  let usersServiceResults;
  let users;

  beforeEach(async () => {
    thisService = await app.service("scoreConfig");

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
    assert.ok(thisService, "Registered the service (scoreConfig)");
  });

  describe("#create", () => {
    const options = {"parSessionId":"aasdfasdfasdfadsfadfa","empGradeCode":"new value","kpiWeight":"new value","competencyWeight":"new value","demeritWeight":"new value","meritPointRule":{"name":"John Doe Many","age":20,"dateofbirth":"1999-01-01T00:00:00.000Z"},"ratingScaleMax":"new value"};

    beforeEach(async () => {
      scoreConfigCreated = await thisService.create({...options, ...users});
    });

    it("should create a new scoreConfig", () => {
      assert.strictEqual(scoreConfigCreated.parSessionId, options.parSessionId);
assert.strictEqual(scoreConfigCreated.empGradeCode, options.empGradeCode);
assert.strictEqual(scoreConfigCreated.kpiWeight, options.kpiWeight);
assert.strictEqual(scoreConfigCreated.competencyWeight, options.competencyWeight);
assert.strictEqual(scoreConfigCreated.demeritWeight, options.demeritWeight);
assert.strictEqual(scoreConfigCreated.meritPointRule, options.meritPointRule);
assert.strictEqual(scoreConfigCreated.ratingScaleMax, options.ratingScaleMax);
    });
  });

  describe("#get", () => {
    it("should retrieve a scoreConfig by ID", async () => {
      const retrieved = await thisService.findById(scoreConfigCreated._id);
      assert.strictEqual(retrieved._id.toString(), scoreConfigCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"parSessionId":"345345345345345345345","empGradeCode":"updated value","kpiWeight":"updated value","competencyWeight":"updated value","demeritWeight":"updated value","meritPointRule":{"name":"John Doe","age":200,"dateofbirth":"2025-01-31T00:00:00.000Z"},"ratingScaleMax":"updated value"};

    it("should update an existing scoreConfig ", async () => {
      const scoreConfigUpdated = await thisService.findByIdAndUpdate(
        scoreConfigCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(scoreConfigUpdated.parSessionId, options.parSessionId);
assert.strictEqual(scoreConfigUpdated.empGradeCode, options.empGradeCode);
assert.strictEqual(scoreConfigUpdated.kpiWeight, options.kpiWeight);
assert.strictEqual(scoreConfigUpdated.competencyWeight, options.competencyWeight);
assert.strictEqual(scoreConfigUpdated.demeritWeight, options.demeritWeight);
assert.strictEqual(scoreConfigUpdated.meritPointRule, options.meritPointRule);
assert.strictEqual(scoreConfigUpdated.ratingScaleMax, options.ratingScaleMax);
    });
  });

  describe("#delete", () => {
    it("should delete a scoreConfig", async () => {
      const scoreConfigDeleted = await thisService.remove(scoreConfigCreated._id);
      assert.strictEqual(scoreConfigDeleted._id.toString(), scoreConfigCreated._id.toString());
    });
  });
});