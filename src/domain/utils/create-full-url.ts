import { BASE_URL_SHORT_URL } from "@core/env/env.config";
import Container from "typedi";

export function createFullUrl(path: string) {
  const baseUrl = Container.get(BASE_URL_SHORT_URL);

  return `${baseUrl}/short-url/${path}`;
}
