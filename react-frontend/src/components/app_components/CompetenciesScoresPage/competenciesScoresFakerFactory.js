
import { faker } from "@faker-js/faker";
export default (user,count,parAppraisersIdIds,competencyIds,appraisalIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
parAppraisersId: parAppraisersIdIds[i % parAppraisersIdIds.length],
competency: competencyIds[i % competencyIds.length],
rate: faker.lorem.sentence(1),
weightedRate: faker.lorem.sentence(1),
remarks: faker.lorem.sentence(1),
appraisalId: appraisalIdIds[i % appraisalIdIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
