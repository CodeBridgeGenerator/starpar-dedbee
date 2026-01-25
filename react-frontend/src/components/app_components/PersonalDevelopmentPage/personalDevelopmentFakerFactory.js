
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
appraiseeId: faker.lorem.sentence(1),
strengthsAndAreasOfConcernIdentified: faker.lorem.sentence(1),
specialAchievementsForThePeriodUnderReview: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
