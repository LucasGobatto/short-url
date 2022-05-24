import { InputError } from "@core/error";
import { UrlDbDatasource } from "@data/source";
import { CreateCustomRouteInput, ShortUrlResponse } from "@domain/model";
import { createFullUrl } from "@domain/utils/create-full-url";
import { Service } from "typedi";

@Service()
export class CreateCustomRouteUseCase {
  constructor(private readonly urlDbDatasource: UrlDbDatasource) {}

  async exec(data: CreateCustomRouteInput): Promise<ShortUrlResponse> {
    const { originalUrl, customRoute } = data;

    const existingUrl = await this.urlDbDatasource.findOneByPath(customRoute);

    if (existingUrl?.id) {
      throw new InputError("Custom route already exists");
    }

    const savedUrl = await this.urlDbDatasource.save({
      originalUrl,
      shortUrl: customRoute,
    });

    return { data: createFullUrl(savedUrl.shortUrl) };
  }
}
