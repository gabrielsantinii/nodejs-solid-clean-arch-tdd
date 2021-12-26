import faker from "faker";
import { PostModel } from "@/domain/models";

export const mockPostModel = (): PostModel => ({
    contentDescription: faker.lorem.lines(2),
    id: faker.datatype.uuid(),
    postedAt: faker.date.recent(),
    postedBy: {
        id: faker.datatype.uuid(),
        name: faker.name.title(),
        username: faker.random.word(),
    },
});
