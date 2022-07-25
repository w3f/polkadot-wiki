import React from "react";
import { render, screen } from "@testing-library/react";
import RPC from "../components/RPC-Connection";
import "@testing-library/jest-dom";

test("RPC falls back to default", () => {
  const { container } = render(<RPC network="polkadot" path="BAD.PATH" defaultValue="150"/>);
  const content = container.firstChild.textContent;
  expect(content === "150");
});

test("human readable filter with integer value", () => {
  const { container } = render(<RPC network="polkadot" path="BAD.PATH" defaultValue={50000000000} filter="humanReadable"/>);
  const content = container.firstChild.textContent;
  expect(content).toEqual("5 DOT");
});

test("human readable filter with float value", () => {
  const { container } = render(<RPC network="polkadot" path="BAD.PATH" defaultValue={202580000000} filter="humanReadable"/>);
  const content = container.firstChild.textContent;
  expect(content).toEqual("20.258 DOT");
});