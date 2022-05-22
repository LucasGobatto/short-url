import { Service } from "typedi";

@Service()
export class GetOriginalUrlUseCase {
  exec(path: string) {
    return path;
  }
}
