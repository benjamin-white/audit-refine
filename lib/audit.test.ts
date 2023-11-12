import { describe, it, assert } from "vitest";
import isEqual from "lodash.isequal";
import getJSONStub from "./getJSONStub";
import audit from "./audit";

describe("filter audit report by highest severity", () => {
  it("should identify 'critical' severity", () => {
    const input = getJSONStub(["critical", "moderate", "low", "info"]);
    const output = getJSONStub(["critical"]);

    assert(isEqual(JSON.parse(audit(input)), JSON.parse(output)));
  });

  it("should identify 'high' severity", () => {
    const input = getJSONStub(["high", "moderate", "low", "info"]);
    const output = getJSONStub(["high"]);

    assert(isEqual(JSON.parse(audit(input)), JSON.parse(output)));
  });

  it("should identify 'moderate' severity", () => {
    const input = getJSONStub(["moderate", "low", "info"]);
    const output = getJSONStub(["moderate"]);

    assert(isEqual(JSON.parse(audit(input)), JSON.parse(output)));
  });

  it("should identify 'low' severity", () => {
    const input = getJSONStub(["low", "info"]);
    const output = getJSONStub(["low"]);

    assert(isEqual(JSON.parse(audit(input)), JSON.parse(output)));
  });

  it("should identify 'info' severity", () => {
    const input = getJSONStub(["info"]);
    const output = getJSONStub(["info"]);

    assert(isEqual(JSON.parse(audit(input)), JSON.parse(output)));
  });

  it("should should identify no vulnerabilities", () => {
    const input = getJSONStub([]);
    const output = getJSONStub([]);

    assert(isEqual(JSON.parse(audit(input)), JSON.parse(output)));
  });
});
