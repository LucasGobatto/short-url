import { CryptoService } from "@core/security/crypto";
import { UrlDbDatasource } from "@data/source";
import { Service } from "typedi";
import { CreateShortUrlInput, ShortUrlResponse } from "@domain/model";
import { createFullUrl } from "@domain/utils/create-full-url";
import { InputError } from "@core/error";

@Service()
export class CreateShortUrlUseCase {
  constructor(private readonly urlDbDatasource: UrlDbDatasource, private readonly cryptoService: CryptoService) {}

  async exec(data: CreateShortUrlInput): Promise<ShortUrlResponse> {
    const { url } = data;

    if (!url) {
      throw new InputError();
    }

    const cryptoUrl = await this.cryptoService.hash(url);

    const shortUrl = cryptoUrl.slice(0, 16);

    await this.urlDbDatasource.save({ shortUrl, originalUrl: url });

    return { data: createFullUrl(shortUrl) };
  }
}
