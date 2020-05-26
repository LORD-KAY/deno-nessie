import { assertEquals } from "../deps.ts";
import { Table, tableOptions } from "../mod.ts";

const tableOptions: tableOptions = { dbDialect: "mysql" };

const mySqlStrings = [
  {
    name: "Standard Table",
    string: new Table("testTable", tableOptions)
      .toSql(),
    solution: "CREATE TABLE testTable ();",
  },
  {
    name: "Table with custom",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.custom("testName testType");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testName testType);",
  },
  {
    name: "Table with two custom",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.custom("testName testType");
      table.custom("testName2 testType2");
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (testName testType, testName2 testType2);",
  },
  {
    name: "Table with 1 unique",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.integer("testCol");
      table.unique("testCol");
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (testCol int); ALTER TABLE testTable ADD UNIQUE (testCol);",
  },
  {
    name: "Table with 2 unique",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.integer("testCol");
      table.integer("testCol2");
      table.unique(["testCol", "testCol2"]);
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (testCol int, testCol2 int); ALTER TABLE testTable ADD UNIQUE (testCol, testCol2);",
  },
  {
    name: "Table with 1 primary",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.integer("testCol");
      table.primary("testCol");
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (testCol int); ALTER TABLE testTable ADD PRIMARY KEY (testCol);",
  },
  {
    name: "Table with 2 primary",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.integer("testCol");
      table.integer("testCol2");
      table.primary("testCol", "testCol2");
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (testCol int, testCol2 int); ALTER TABLE testTable ADD PRIMARY KEY (testCol, testCol2);",
  },
  {
    name: "Table with 1 index",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.integer("testCol");
      table.index("testCol");
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (testCol int); CREATE INDEX ON testTable (testCol);",
  },
  {
    name: "Table with 2 index",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.integer("testCol");
      table.integer("testCol2");
      table.index("testCol");
      table.index("testCol2");
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (testCol int, testCol2 int); CREATE INDEX ON testTable (testCol); CREATE INDEX ON testTable (testCol2);",
  },
  {
    name: "Table with 2 index alt",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.integer("testCol");
      table.integer("testCol2");
      table.index("testCol", "testCol2");
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (testCol int, testCol2 int); CREATE INDEX ON testTable (testCol); CREATE INDEX ON testTable (testCol2);",
  },
  {
    name: "Table with id",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.id();
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (id bigint AUTO_INCREMENT PRIMARY KEY);",
  },
  {
    name: "Table with bigIncrements",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.bigIncrements("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol bigint AUTO_INCREMENT);",
  },
  {
    name: "Table with binary",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.binary("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol longblob);",
  },
  {
    name: "Table with boolean",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.boolean("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol tinyint (1));",
  },
  {
    name: "Table with char",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.char("testCol", 1);
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol char (1));",
  },
  {
    name: "Table with createdAt",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.createdAt();
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (created_at timestamp (0) default current_timestamp);",
  },
  {
    name: "Table with createdAtTz",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.createdAtTz();
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (created_at timestamptz (0) default current_timestamp);",
  },
  {
    name: "Table with date",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.date("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol date);",
  },
  {
    name: "Table with dateTime",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.dateTime("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol timestamp (0));",
  },
  {
    name: "Table with decimal",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.decimal("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol decimal (8, 2));",
  },
  {
    name: "Table with double",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.double("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol double (8, 2));",
  },
  {
    name: "Table with enum",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.enum("testCol", ["one", "two", "three"]);
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol testCol ENUM(one, two, three));",
  },
  {
    name: "Table with float",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.real("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol float (8, 2));",
  },
  {
    name: "Table with increments",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.increments("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol int AUTO_INCREMENT);",
  },
  {
    name: "Table with integer",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.integer("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol int);",
  },
  {
    name: "Table with ipAddress",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.ipAddress("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol inet);",
  },
  {
    name: "Table with json",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.json("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol json);",
  },
  {
    name: "Table with jsonb",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.jsonb("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol jsonb);",
  },
  {
    name: "Table with macAddress",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.macAddress("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol macaddr);",
  },
  {
    name: "Table with macAddress8",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.macAddress8("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol macaddr8);",
  },
  {
    name: "Table with point",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.point("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol point);",
  },
  {
    name: "Table with polygon",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.polygon("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol polygon);",
  },
  {
    name: "Table with smallIncrements",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.smallIncrements("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol smallint AUTO_INCREMENT);",
  },
  {
    name: "Table with smallInteger",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.smallInteger("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol smallint);",
  },
  {
    name: "Table with string",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.string("testCol", 1);
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol varchar (1));",
  },
  {
    name: "Table with text",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.text("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol longtext);",
  },
  {
    name: "Table with time",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.time("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol time (0));",
  },
  {
    name: "Table with timeTz",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.timeTz("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol timetz (0));",
  },
  {
    name: "Table with timestamp",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.timestamp("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol timestamp (0));",
  },
  {
    name: "Table with timestamp",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.timestampTz("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol timestamptz (0));",
  },
  {
    name: "Table with timestamps",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.timestamps();
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (created_at timestamp (0) default current_timestamp, updated_at timestamp (0) default current_timestamp on update current_timestamp);",
  },
  {
    name: "Table with timestampsTz",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.timestampsTz();
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (created_at timestamptz (0) default current_timestamp, updated_at timestamptz (0) default current_timestamp on update current_timestamp);",
  },
  {
    name: "Table with updatedAt mysql",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.updatedAt();
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (updated_at timestamp (0) default current_timestamp on update current_timestamp);",
  },
  {
    name: "Table with updatedAtTz",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.updatedAtTz();
      return table.toSql();
    })(),
    solution:
      "CREATE TABLE testTable (updated_at timestamptz (0) default current_timestamp on update current_timestamp);",
  },
  {
    name: "Table with text",
    string: (() => {
      const table = new Table("testTable", tableOptions);
      table.uuid("testCol");
      return table.toSql();
    })(),
    solution: "CREATE TABLE testTable (testCol uuid);",
  },
];

mySqlStrings.forEach(({ name, string, solution }) =>
  Deno.test({
    name: "MySQL: " + (name || "Empty"),
    fn(): void {
      assertEquals(string, solution);
    },
  })
);
