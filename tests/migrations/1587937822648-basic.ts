import { Schema } from "../../mod.ts";

export const up = (schema: Schema): void => {
  schema.create("basic", (table) => {
    table.id();
    table.string("col_1", 10);
    table.timestamps();
    table.enum("col_11", ["enum_1", "enum_2"])

    console.log(table.toSql())
  });
};

export const down = (schema: Schema): void => {
  schema.drop("basic");
};
