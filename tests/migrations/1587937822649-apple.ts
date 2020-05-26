import { Schema } from "../../mod.ts";

export const up = (schema: Schema): void => {
  schema.create({ name: "apple", schemaName: "testSchema", schemaCreate: true }, (table) => {
    table.id();
    table.string("col_1", 10);
    table.timestamps();
  });
};

export const down = (schema: Schema): void => {
  schema.drop("testSchema.apple");
};
