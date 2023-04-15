import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";

test("should render app component", () => {
  render(<App />, { timeout: 10000 }); // Set a timeout of 10 seconds
  const todoElement = screen.getByTestId("footer-1");
  expect(todoElement).toBeInTheDocument();
});
