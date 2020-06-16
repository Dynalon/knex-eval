import * as express from "express";
import { createInitialSchema, knex } from "./database";
import { Response, Request } from "express";
import { UserDao, mapUserDtoFromDao, CreateUserDto, UserDto } from "./models";

const app = express();
app.use(express.json());

app.get("/users", async (req, res: Response<UserDto[]>) => {
  const usersDao = await knex.select<UserDao[]>("*").from("users");
  const usersDto = usersDao.map(mapUserDtoFromDao);
  res.send(usersDto);
});

// test with:
// curl -X POST -H "Content-Type: application/json" --data '{"username":"abc"}' http://localhost:3000/users
app.post("/users", async (req: Request<{}, UserDto, CreateUserDto>, res) => {
  const signupDate = new Date().toISOString();
  const userDto = req.body;
  const result = await knex
    .insert({
      username: userDto.username,
      signupDate,
    })
    .into("users");

  const id = result[0];
  // alternate: query db for inserted user and return from DAO
  res.send({ id, username: userDto.username, signupDate });
});

async function main() {
  await createInitialSchema();

  app.listen(3000, () => {
    console.info("Express listening on port 3000!");
  });
}

main();
