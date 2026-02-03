
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
parId: faker.lorem.sentence(1),
appraisorId: faker.lorem.sentence(1),
appraiseeId: faker.lorem.sentence(1),
balancedScorecard: faker.lorem.sentence(1),
kpi: faker.lorem.sentence(1),
weight: faker.lorem.sentence(1),
target: faker.lorem.sentence(1),
actualAchievement: faker.lorem.sentence(1),
rate: faker.lorem.sentence(1),
weightedRate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
