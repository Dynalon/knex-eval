import * as Knex from "knex";
import { UserDao, UserDto, mapUserDtoFromDao } from "./models";

export const knex = Knex({
  client: "sqlite3",
  connection: {
    filename: "./mydb.sqlite",
  },
  useNullAsDefault: true,
});

export async function createInitialSchema() {
  const alreadyInitialized = await knex.schema.hasTable("users");
  if (alreadyInitialized) return;

  console.info("Creating initial database schema");
  await knex.schema
    //   .withSchema("public")
    .createTable("users", (table) => {
      table.increments();
      table.string("username").notNullable().unique();
      table.dateTime("signupDate");
      table.timestamps();
    });

  await addDefaultUsers();
}

async function addDefaultUsers() {
  await knex
    .insert({
      username: "timo",
      signupDate: new Date().toISOString(),
    })
    .into("users");

  await knex
    .insert({
      username: "horst",
      signupDate: new Date().toISOString(),
    })
    .into("users");
}
