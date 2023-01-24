import { render, screen } from "@testing-library/react";
import Pick from "./pages/Pick";

test("renders learn react link", () => {
    render(<Pick />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
