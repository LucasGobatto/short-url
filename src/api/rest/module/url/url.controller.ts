import { Service } from "typedi";
import { Body, Get, JsonController, Post, Param } from "routing-controllers";
import { CreateShortUrlUseCase, GetOriginalUrlUseCase } from "@domain/url";
import { CreateShortUrlInput, ShortUrlResponse } from "@domain/model";
import { RequestLogger } from "@core/decorators";

@Service()
@JsonController()
export class UrlController {
  constructor(
    private readonly createShortUrlUseCase: CreateShortUrlUseCase,
    private readonly getOriginalUrlUseCase: GetOriginalUrlUseCase
  ) {}

  @Post("/create-short-url")
  @RequestLogger("RequestLogger")
  createShortUrl(@Body() data: CreateShortUrlInput): Promise<ShortUrlResponse> {
    return this.createShortUrlUseCase.exec(data);
  }

  @Get("/short-url/:path")
  @RequestLogger("RequestLogger")
  getOriginalUrl(@Param("path") path: string): Promise<ShortUrlResponse> {
    return this.getOriginalUrlUseCase.exec(path);
  }
}
