import { CryptoService } from "@core/security/crypto";
import { UrlEntity } from "@entity";
import { Service } from "typedi";
import { Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

@Service()
export class UrlSeed {
  constructor(
    @InjectRepository(UrlSeed)
    private readonly urlRepository: Repository<UrlEntity>,
    private readonly cryptoService: CryptoService
  ) {}

  async create(options: Partial<UrlEntity>[] = []): Promise<UrlEntity[]> {
    const urls = [...new Array(options.length || 5)].map((_, index) =>
      this.seed(options[index], index + 1)
    );

    return this.urlRepository.save(await Promise.all(urls));
  }

  private async seed(options: Partial<UrlEntity> = {}, count: number) {
    options.originalUrl = await this.cryptoService.hash(
      options.originalUrl ?? "some-hash" + count
    );

    const defaultUser = {
      originalUrl: options.originalUrl,
    };

    return Object.assign(new UrlEntity(), defaultUser, options);
  }
}
