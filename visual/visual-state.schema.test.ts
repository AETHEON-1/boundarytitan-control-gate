import fs from "node:fs";
import path from "node:path";
import Ajv2020 from "ajv/dist/2020";
import addFormats from "ajv-formats";

describe("Boundary State Inspector schema", () => {
  test("accepts the canonical fixture", () => {
    const schema = JSON.parse(fs.readFileSync(path.join(__dirname, "visual-state.schema.json"), "utf8"));
    const fixture = JSON.parse(fs.readFileSync(path.join(__dirname, "visual-state.json"), "utf8"));
    const ajv = new Ajv2020({ allErrors: true, strict: false });
    addFormats(ajv);
    const validate = ajv.compile(schema);
    expect(validate(fixture)).toBe(true);
  });
});
