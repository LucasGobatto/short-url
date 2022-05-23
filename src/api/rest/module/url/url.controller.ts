import { Service } from "typedi";
import { Body, Get, JsonController, Post, Param } from "routing-controllers";
import { CreateShortUrlUseCase, GetOriginalUrlUseCase } from "@domain";
import { CreateShortUrlInput } from "@domain/model";
import { RequestLogger } from "@core/decorators";

@Service()
@JsonController("/url")
export class UrlController {
  constructor(
    private readonly createShortUrlUseCase: CreateShortUrlUseCase,
    private readonly getOriginalUrlUseCase: GetOriginalUrlUseCase
  ) {}

  @Post("/create-short-url")
  @RequestLogger("RequestLogger")
  createShortUrl(@Body() data: CreateShortUrlInput) {
    return this.createShortUrlUseCase.exec(data);
  }

  @Get("/short-url/:path")
  @RequestLogger("RequestLogger")
  getOriginalUrl(@Param("path") path: string) {
    return this.getOriginalUrlUseCase.exec(path);
  }
}
