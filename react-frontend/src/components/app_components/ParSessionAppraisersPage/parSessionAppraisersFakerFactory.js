
import { faker } from "@faker-js/faker";
export default (user,count,parSessionIdIds,appraiseeEmpNoIds,appraiserEmpNoIds,departmentIds,sectionIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
parSessionId: parSessionIdIds[i % parSessionIdIds.length],
appraiseeEmpNo: appraiseeEmpNoIds[i % appraiseeEmpNoIds.length],
appraiserEmpNo: appraiserEmpNoIds[i % appraiserEmpNoIds.length],
weightage: faker.lorem.sentence(""),
department: departmentIds[i % departmentIds.length],
section: sectionIds[i % sectionIds.length],
appraiserComment: faker.lorem.sentence(1),
kraScore: faker.lorem.sentence(1),
weightedKraScore: faker.lorem.sentence(1),
competencyScore: faker.lorem.sentence(1),
weightedCompetencyScore: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
