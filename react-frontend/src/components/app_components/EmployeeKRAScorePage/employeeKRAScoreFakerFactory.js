
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
appraisalID: faker.lorem.sentence(1),
secKPIID: faker.lorem.sentence(1),
weight: faker.lorem.sentence(1),
score: faker.lorem.sentence(1),
rate: faker.lorem.sentence(1),
weightedRate: faker.lorem.sentence(1),
target: faker.lorem.sentence(1),
kRA: faker.lorem.sentence(1),
kPIGoal: faker.lorem.sentence(1),
unitMeasurement: faker.lorem.sentence(1),
sortOrder: faker.lorem.sentence(1),
balancedScoreCard: faker.lorem.sentence(1),
importanceRelevance: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
