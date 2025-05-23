/** @notice Library imports */
import { eq, ilike, or } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
/// Local imports
import {
  User,
  FindOneUser,
  NewUserPayload,
  UserWithoutPassword,
} from "@app/users/users.type";
import { users } from "./users.entity";
import { DatabaseService } from "@app/config/db/db.service";

@Injectable()
export class UsersRepository {
  constructor(private dbService: DatabaseService) {}

  async findOne<T extends boolean>(
    emailOrUsername: string,
    includePassword?: T
  ): Promise<FindOneUser<T>> {
    return (await this.dbService.database.query.users.findFirst({
      where: or(
        eq(users.email, emailOrUsername),
        eq(users.username, emailOrUsername)
      ),
      columns: includePassword
        ? undefined
        : {
            password: false,
          },
    })) as FindOneUser<T>;
  }

  async validateSave(
    email: string,
    username: string
  ): Promise<UserWithoutPassword | undefined> {
    return await this.dbService.database.query.users.findFirst({
      where: or(eq(users.email, email), eq(users.username, username)),
      columns: {
        password: false,
      },
    });
  }

  async findByKeyword(keyword: string): Promise<UserWithoutPassword[]> {
    return await this.dbService.database.query.users.findMany({
      where: or(
        ilike(users.name, `%${keyword}%`),
        ilike(users.username, `%${keyword}%`)
      ),
      columns: {
        password: false,
      },
    });
  }

  async save(payload: NewUserPayload): Promise<Pick<User, "id">> {
    const { email, password, name, username } = payload;
    const [user] = await this.dbService.database
      .insert(users)
      .values({ email, password, name, username })
      .returning({ id: users.id });

    return user;
  }
}
