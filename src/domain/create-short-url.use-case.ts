import { Service } from "typedi";
import { CreateShortUrlInput } from "./model";

@Service()
export class CreateShortUrlUseCase {
  async exec(data: CreateShortUrlInput) {
    return data;
  }
}
