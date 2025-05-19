/** @notice Library imports */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
/// Local imports
import { Environments } from "./env.schema";

@Injectable()
export class EnvironmentService {
  constructor(private configService: ConfigService<Environments, true>) {}

  get<T extends keyof Environments>(key: T) {
    return this.configService.get(key, { infer: true });
  }
}
