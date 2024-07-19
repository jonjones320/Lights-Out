import React from "react";
import { render } from "@testing-library/react";
import Board from "../Board";

it("renders Board without crashing", function() {
  render(<Board />);
});

it("matches Board snapshot", function() {
  const { asFragment } = render(<Board />);
  expect(asFragment()).toMatchSnapshot();
});