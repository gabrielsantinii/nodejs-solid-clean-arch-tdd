import faker from "faker";
import { ProfileModel } from "@/domain/models";

export const mockProfileModel = (): ProfileModel => {
  return {
    avatarUrl: faker.image.animals(),
    backgroundUrl: faker.image.abstract(),
    createdAt: faker.date.recent(),
    description: faker.lorem.lines(4),
    id: faker.datatype.uuid(),
    name: faker.random.words(),
    username: faker.random.word(),
  };
};
