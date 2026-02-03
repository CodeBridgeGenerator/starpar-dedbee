
import { faker } from "@faker-js/faker";
export default (user,count,departmentIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
departmentId: departmentIdIds[i % departmentIdIds.length],
name: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
weight: faker.lorem.sentence(1),
rate: faker.lorem.sentence(1),
weightedScore: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
