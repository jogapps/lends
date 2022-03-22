/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
  .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
  .createTable("users", (table) => {
      table.uuid("id").primary().notNullable().defaultTo(knex.raw('uuid_generate_v4()'));;
      table.string("email").notNullable().unique();
      table.text("password").notNullable();
      table.decimal("wallet").notNullable().defaultTo(0);
      table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable("users");
};
