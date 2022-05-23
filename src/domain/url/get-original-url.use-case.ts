import { NotFoundError } from "@core/error";
import { UrlDbDatasource } from "@data/source";
import { ShortUrlResponse } from "@domain/model";
import { Service } from "typedi";

@Service()
export class GetOriginalUrlUseCase {
  constructor(private readonly urlDbDatasource: UrlDbDatasource) {}

  async exec(path: string): Promise<ShortUrlResponse> {
    const url = await this.urlDbDatasource.findOneByPath(path);

    if (!url?.id) {
      throw new NotFoundError("Invalid short path");
    }

    return { data: url.originalUrl };
  }
}
