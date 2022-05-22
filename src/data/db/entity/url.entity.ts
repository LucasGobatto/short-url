import { Column, Entity } from "typeorm";
import { BaseEntity } from "./base.entity";

@Entity("url")
export class UrlEntity extends BaseEntity {
  @Column()
  shortUrl: string;

  @Column()
  originalUrl: string;
}
