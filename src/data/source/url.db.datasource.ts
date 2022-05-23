import { UrlEntity } from "@data/db/entity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UrlDbDatasource {
  constructor(
    @InjectRepository(UrlEntity)
    private readonly repository: Repository<UrlEntity>
  ) {}

  findOne(id: string) {
    return this.repository.findOne(id);
  }

  findOneByPath(shortUrl: string) {
    return this.repository.findOne({ where: { shortUrl } });
  }

  save(url: Partial<UrlEntity>) {
    return this.repository.save(url);
  }
}
