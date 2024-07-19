import React from "react";
import { render } from "@testing-library/react";
import Cell from "./Cell";

it("renders Cell without crashing", function() {
  render(<Cell />);
});

it("matches Cell snapshot", function() {
  const { asFragment } = render(<Cell />);
  expect(asFragment()).toMatchSnapshot();
});