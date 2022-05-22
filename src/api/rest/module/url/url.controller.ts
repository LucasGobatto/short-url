import { CreateShortUrlUseCase, GetOriginalUrlUseCase } from "@domain";
import { CreateShortUrlInput } from "@domain/model";
import { Body, Get, JsonController, Post, Param } from "routing-controllers";
import { Service } from "typedi";

@Service()
@JsonController("/url")
export class UrlController {
  constructor(
    private readonly createShortUrlUseCase: CreateShortUrlUseCase,
    private readonly getOriginalUrlUseCase: GetOriginalUrlUseCase
  ) {}

  @Post("/create-short-url")
  createShortUrl(@Body() data: CreateShortUrlInput) {
    return this.createShortUrlUseCase.exec(data);
  }

  @Get("/short-url/:path")
  getOriginalUrl(@Param("path") path: string) {
    return this.getOriginalUrlUseCase.exec(path);
  }
}
