
import { faker } from "@faker-js/faker";
export default (user,count,kraIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
kra: kraIds[i % kraIds.length],
name: faker.lorem.sentence(""),
weight: faker.lorem.sentence(""),
target: faker.lorem.sentence(""),
actualAchievement: faker.lorem.sentence(""),
rate: faker.lorem.sentence(""),
weightedRate: faker.lorem.sentence(""),
startValue: faker.lorem.sentence(""),
endValue: faker.lorem.sentence(""),
importanceRelevance: faker.lorem.sentence(""),
sortOrder: faker.lorem.sentence(""),
unitMeasurement: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
