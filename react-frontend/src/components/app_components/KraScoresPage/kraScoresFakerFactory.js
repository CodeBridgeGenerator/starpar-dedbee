
import { faker } from "@faker-js/faker";
export default (user,count,parAppraisersIdIds,kpiIds,appraisalIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
parAppraisersId: parAppraisersIdIds[i % parAppraisersIdIds.length],
kpi: kpiIds[i % kpiIds.length],
actualAchievement: faker.datatype.number(""),
rate: faker.datatype.number(""),
weightedRate: faker.datatype.number(""),
score: faker.datatype.number(""),
appraisalId: appraisalIdIds[i % appraisalIdIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
