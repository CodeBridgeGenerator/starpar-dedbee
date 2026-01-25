
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
appraisalID: faker.lorem.sentence(1),
secKPIID: faker.lorem.sentence(1),
rate: faker.lorem.sentence(1),
startValue: faker.lorem.sentence(1),
endValue: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
