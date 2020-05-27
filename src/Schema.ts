import { Table, tableOptions } from "./Table.ts";
import { dbDialects } from "./TypeUtils.ts";

export type tablefn = (table: Table) => void;
export interface createOptions extends tableOptions {
  name: string;
}
export interface dropOptions extends createOptions {
  ifExists?: boolean
  cascade?: boolean
}
export type schemaCreateArgs = [string, tablefn] | [
  string,
  tableOptions,
  tablefn,
];

/** The schema class exposed in the `up()` and `down()` methods in the migration files.
 * 
 * By using this exposed class, you can generate sql strings via the helper methods`.
 */
export class Schema {
  query: string = "";
  dialect: dbDialects;

  constructor(dialenct: dbDialects = "pg") {
    this.dialect = dialenct;
  }

  /** Method for exposing a Table instance for creating a table with columns */
  create(name: string, createfn: tablefn): string;
  create(options: createOptions, createfn: tablefn): string;
  create(options: string | createOptions, createfn: tablefn): string {
    let table: Table;
    if (typeof options === "string") {
      table = new Table(options, { dbDialect: this.dialect });
    } else {
      const name = options.name;
      delete options.name;
      table = new Table(name, { dbDialect: this.dialect, ...options });
    }

    createfn(table);

    const sql = table.toSql();

    this.query += sql;

    return sql;
  }

  /** Adds a custom query string to the migration */
  queryString(queryString: string) {
    this.query += queryString;
  }

  /** Drops a table */
  drop(
    name: string | string[],
    ifExists: boolean = false,
    cascade: boolean = false,
  ) {
    if (typeof name === "string") name = [name];

    const sql = `DROP TABLE${ifExists ? " IF EXISTS" : ""} ${
      name.join(
        ", ",
      )
      }${cascade ? " CASCADE" : ""};`;

    this.query += sql;

    return sql;
  }

  /** Generates a string for checking if a table exists */
  hasTable(name: string) {
    switch (this.dialect) {
      case "mysql":
        //SELECT 1 FROM testtable LIMIT 1;
        return `show tables like '${name}';`;
      case "sqlite":
        return `SELECT name FROM sqlite_master WHERE type='table' AND name='${name}';`;
      case "pg":
      default:
        return `SELECT to_regclass('${name}');`;
    }
  }
}

export default Schema;
