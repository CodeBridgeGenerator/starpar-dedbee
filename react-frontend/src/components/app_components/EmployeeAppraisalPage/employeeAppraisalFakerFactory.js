
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
appraisalID: faker.datatype.number(""),
employeeNo: faker.datatype.number(""),
staffName: faker.datatype.number(""),
fYear: faker.datatype.number(""),
startDate: faker.datatype.number(""),
endDate: faker.datatype.number(""),
kRAScore: faker.datatype.number(""),
weightedKRAScore: faker.datatype.number(""),
competencyScore: faker.datatype.number(""),
weightedCompetencyScore: faker.datatype.number(""),
demeritScore: faker.datatype.number(""),
totalScore: faker.datatype.number(""),
finalScore: faker.datatype.number(""),
empComment: faker.datatype.number(""),
mngComment: faker.datatype.number(""),
mngSuperiorComment: faker.datatype.number(""),
managerEmpNO: faker.datatype.number(""),
managerName: faker.datatype.number(""),
kRAWeight: faker.datatype.number(""),
competencyWeight: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
