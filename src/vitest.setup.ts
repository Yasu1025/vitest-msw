import "@testing-library/jest-dom";
import { expect, afterEach, beforeAll, afterAll } from "vitest";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import server from "@/mocks/server";

expect.extend(matchers);

afterEach(() => {
  cleanup();
  server.resetHandlers();
});

beforeAll(() => {
  server.listen();
});

afterAll(() => {
  server.close();
});
