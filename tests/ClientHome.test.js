import ClientHome from "../pages/ClientHome";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Client Home", () => {
    it("renders Listings", () => {
      render(<ClientHome />);
      //expect(screen.getByTestId("result")).toBeInTheDocument();
    });
});