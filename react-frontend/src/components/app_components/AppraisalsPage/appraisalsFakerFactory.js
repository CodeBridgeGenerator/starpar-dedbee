
import { faker } from "@faker-js/faker";
export default (user,count,employeeNoIds,managerEmpNoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
appraisalId: faker.datatype.number(""),
employeeNo: employeeNoIds[i % employeeNoIds.length],
fYear: faker.datatype.number(""),
startDate: faker.datatype.number(""),
endDate: faker.datatype.number(""),
kraScore: faker.datatype.number(""),
weightedKraScore: faker.datatype.number(""),
competencyScore: faker.datatype.number(""),
weightedCompetencyScore: faker.datatype.number(""),
demeritScore: faker.datatype.number(""),
totalScore: faker.datatype.number(""),
finalScore: faker.datatype.number(""),
empComment: faker.datatype.number(""),
mngComment: faker.datatype.number(""),
mngSuperiorComment: faker.datatype.number(""),
managerEmpNo: managerEmpNoIds[i % managerEmpNoIds.length],
kraWeight: faker.datatype.number(""),
competencyWeight: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
