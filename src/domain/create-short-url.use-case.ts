import { Service } from "typedi";
import { CreateShortUrlInput } from "./model";

@Service()
export class CreateShortUrlUseCase {
  exec(data: CreateShortUrlInput) {
    return data;
  }
}
