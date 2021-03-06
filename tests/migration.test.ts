import { assert, assertArrayContains } from "../deps.ts";
import {
  DIALECTS,
  runner,
  TYPE_MIGRATE,
  TYPE_ROLLBACK,
} from "./config/migration.config.ts";

const strings = [
  {
    name: "Migrate and create table",
    string: TYPE_MIGRATE,
    solution: [
      "Database setup complete",
      "Migrated 1587937822648-test.ts",
      "Migrated 1587937822649-apple.ts",
      "Migrated 1587937822650-mango.ts",
      "Migration complete",
    ],
  },
  {
    name: "Migrate empty",
    string: TYPE_MIGRATE,
    solution: ["Nothing to migrate"],
  },
  {
    name: "Rollback Mango",
    string: TYPE_ROLLBACK,
    solution: ["Rolled back 1587937822650-mango.ts"],
  },
  {
    name: "Rollback Apple",
    string: TYPE_ROLLBACK,
    solution: ["Rolled back 1587937822649-apple.ts"],
  },
  {
    name: "Migrate Apple and Mango",
    string: TYPE_MIGRATE,
    solution: [
      "Migrated 1587937822649-apple.ts",
      "Migrated 1587937822650-mango.ts",
      "Migration complete",
    ],
  },
  {
    name: "Rollback Mango",
    string: TYPE_ROLLBACK,
    solution: ["Rolled back 1587937822650-mango.ts"],
  },
  {
    name: "Rollback Apple",
    string: TYPE_ROLLBACK,
    solution: ["Rolled back 1587937822649-apple.ts"],
  },
  {
    name: "Rollback Test",
    string: TYPE_ROLLBACK,
    solution: ["Rolled back 1587937822648-test.ts"],
  },
  {
    name: "Rollback empty",
    string: TYPE_ROLLBACK,
    solution: ["Nothing to rollback"],
  },
];

const allStrings: any[] = [];
strings.forEach((el) =>
  DIALECTS.forEach((dialect: string) => allStrings.push({ ...el, dialect }))
);

for await (const { name, string, solution, dialect } of allStrings) {
  Deno.test(`Migration ${dialect}: ` + (name || "Empty"), async () => {
    const response = await runner(string, dialect);
    const hasFailed = response[response.length - 1].includes("Code was");

    assert(!hasFailed, response.join("\n"));

    assertArrayContains(response, solution);
  });
}
