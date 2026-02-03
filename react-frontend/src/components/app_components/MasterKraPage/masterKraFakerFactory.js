
import { faker } from "@faker-js/faker";
export default (user,count,departmentIdIds,parSessionIdIds,balancedScorecardIds,sectionIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
departmentId: departmentIdIds[i % departmentIdIds.length],
parSessionId: parSessionIdIds[i % parSessionIdIds.length],
balancedScorecard: balancedScorecardIds[i % balancedScorecardIds.length],
kpi: faker.datatype.number(""),
weight: faker.datatype.number(""),
target: faker.datatype.number(""),
actualAchievement: faker.datatype.number(""),
rate: faker.datatype.number(""),
weightedRate: faker.datatype.number(""),
name: faker.lorem.sentence(""),
sectionId: sectionIdIds[i % sectionIdIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
