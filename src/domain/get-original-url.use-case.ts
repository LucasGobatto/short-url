import { Service } from "typedi";

@Service()
export class GetOriginalUrlUseCase {
  async exec(path: string) {
    return path;
  }
}
