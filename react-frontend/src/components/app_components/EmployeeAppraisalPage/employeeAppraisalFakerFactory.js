
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
appraisalID: faker.lorem.sentence(1),
employeeNo: faker.lorem.sentence(1),
staffName: faker.lorem.sentence(1),
fYear: faker.lorem.sentence(1),
startDate: faker.lorem.sentence(1),
endDate: faker.lorem.sentence(1),
kRAScore: faker.lorem.sentence(1),
weightedKRAScore: faker.lorem.sentence(1),
competencyScore: faker.lorem.sentence(1),
weightedCompetencyScore: faker.lorem.sentence(1),
demeritScore: faker.lorem.sentence(1),
totalScore: faker.lorem.sentence(1),
finalScore: faker.lorem.sentence(1),
empComment: faker.lorem.sentence(1),
mngComment: faker.lorem.sentence(1),
mngSuperiorComment: faker.lorem.sentence(1),
managerEmpNO: faker.lorem.sentence(1),
managerName: faker.lorem.sentence(1),
kRAWeight: faker.lorem.sentence(1),
competencyWeight: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
