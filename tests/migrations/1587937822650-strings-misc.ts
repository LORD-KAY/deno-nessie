import { Schema } from "../../mod.ts";

export const up = (schema: Schema): void => {
  schema.create("strings_misc", (table) => {
    table.increments('col_0')

    table.char("col_1", 10);
    table.string("col_2", 10);
    table.text("col_3");

    table.date("col_4")
    table.dateTime("col_5")
    table.dateTimeTz("col_6")
    table.time("col_7")
    table.timeTz("col_8")
    table.timestamp("col_9")
    table.timestampTz("col_10")
    table.timestampsTz()

    table.ipAddress("col_12")
    table.json("col_13")
    table.jsonb("col_14")
    table.macAddress("col_15")
    table.macAddress8("col_16")
    table.uuid("col_17")

    console.log(table.toSql())
  });
};

export const down = (schema: Schema): void => {
  schema.drop("strings_misc");
};
