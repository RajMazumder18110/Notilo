/** @notice Library imports */
import { eq, ilike, or } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
/// Local imports
import {
  User,
  FindOneUser,
  NewUserPayload,
  UserWithoutPassword,
} from "@app/common/entities/types/users.type";
import { users } from "@app/common/entities";
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
      columns: {
        password: includePassword ?? false,
      },
    })) as FindOneUser<T>;
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
    const { email, password, name, username, bio } = payload;
    const [user] = await this.dbService.database
      .insert(users)
      .values({ email, password, name, username, bio })
      .returning({ id: users.id });

    return user;
  }
}
