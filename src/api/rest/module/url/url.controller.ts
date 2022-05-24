import { Service } from "typedi";
import { Body, Get, JsonController, Post, Param } from "routing-controllers";
import { CreateShortUrlUseCase, GetOriginalUrlUseCase, CreateCustomRouteUseCase } from "@domain/url";
import { CreateShortUrlInput, ShortUrlResponse, CreateCustomRouteInput } from "@domain/model";
import { RequestLogger } from "@core/decorators";

@Service()
@JsonController()
export class UrlController {
  constructor(
    private readonly createShortUrlUseCase: CreateShortUrlUseCase,
    private readonly createCustomRouteUseCase: CreateCustomRouteUseCase,
    private readonly getOriginalUrlUseCase: GetOriginalUrlUseCase,
  ) {}

  @Post("/create-short-url")
  @RequestLogger("createShortUrl")
  createShortUrl(@Body() data: CreateShortUrlInput): Promise<ShortUrlResponse> {
    return this.createShortUrlUseCase.exec(data);
  }

  @Post("/create-custom-route")
  @RequestLogger("createCustomRoute")
  createCustomRoute(@Body() data: CreateCustomRouteInput): Promise<ShortUrlResponse> {
    return this.createCustomRouteUseCase.exec(data);
  }

  @Get("/short-url/:path")
  @RequestLogger("getOriginalUrl")
  getOriginalUrl(@Param("path") path: string): Promise<ShortUrlResponse> {
    return this.getOriginalUrlUseCase.exec(path);
  }
}
