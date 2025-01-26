import { render, screen } from "@testing-library/react";
import StatsCard from "@/components/user/StatsCard";

describe("StatsCards", () => {
  test("Renders title and count correctly", () => {
    render(<StatsCard title="Total Users" count={42} />);
    expect(screen.getByText("Total Users")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });
  test("Renders with zero count", () => {
    render(<StatsCard title="Total Users" count={0} />);
    expect(screen.getByText("0")).toBeInTheDocument();
  });
  test("Renders with large count", () => {
    render(<StatsCard title="Total Users" count={1999} />);
    expect(screen.getByText("1999")).toBeInTheDocument();
  });
});
