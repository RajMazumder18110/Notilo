/** @notice Library imports */
import { eq } from "drizzle-orm";
import { Injectable } from "@nestjs/common";
/// Local imports
import { DatabaseService } from "@app/config/db/db.service";
import { NewUserPayload, User, users } from "@app/common/entities";

type FindOneResponse<T extends boolean> = T extends true | undefined
  ? User | undefined
  : Omit<User, "password"> | undefined;

@Injectable()
export class UsersRepository {
  constructor(private dbService: DatabaseService) {}

  async findOne<T extends boolean>(
    email: string,
    inPass?: T
  ): Promise<FindOneResponse<T>> {
    return (await this.dbService.database.query.users.findFirst({
      where: eq(users.email, email),
      columns: {
        password: inPass,
      },
    })) as FindOneResponse<T>;
  }

  async save(payload: NewUserPayload): Promise<Pick<User, "id">> {
    const { email, password } = payload;
    const [user] = await this.dbService.database
      .insert(users)
      .values({ email, password })
      .returning({ id: users.id });

    return user;
  }
}
