
import { faker } from "@faker-js/faker";
export default (user,count,parSessionIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
parSessionId: parSessionIdIds[i % parSessionIdIds.length],
empGradeCode: faker.lorem.sentence(""),
kpiWeight: faker.lorem.sentence(""),
competencyWeight: faker.lorem.sentence(""),
demeritWeight: faker.lorem.sentence(""),
meritPointRule: faker.lorem.sentence(""),
ratingScaleMax: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
