import Container, { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UrlEntity, UserEntity } from "@entity";

@Service()
export class Repositories {
  constructor(
    @InjectRepository(UserEntity)
    readonly userRespository: Repository<UserEntity>,
    @InjectRepository(UrlEntity) readonly urlRepository: Repository<UrlEntity>,
  ) {}

  static async clear() {
    const repositories = Container.get(Repositories);
    const properties = Object.getOwnPropertyNames(repositories);

    const clearAll = properties.map((property) => (repositories as any)[property].clear());

    await Promise.all(clearAll);
  }
}
