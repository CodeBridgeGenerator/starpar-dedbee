
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
parId: faker.lorem.sentence(1),
appraisorId: faker.lorem.sentence(1),
appraiseeId: faker.lorem.sentence(1),
kpiScore: faker.lorem.sentence(1),
competency: faker.lorem.sentence(1),
totalScore: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
