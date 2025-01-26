import ForkedRepos from "@/components/charts/ForkedRepos";
import { render, screen } from "@testing-library/react";
import React from "react";
import { mockRepositories } from "./utils.test";

vi.mock("@/components/ui/chart", () => ({
  ChartContainer: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  ChartTooltip: ({ content }: { content: React.ReactNode }) => (
    <div>{content}</div>
  ),
  ChartTooltipContent: () => <div>Tooltip Content</div>,
}));

vi.mock("recharts", () => ({
  BarChart: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  CartesianGrid: () => <div>CartesianGrid</div>,
  XAxis: () => <div>XAxis</div>,
  YAxis: () => <div>YAxis</div>,
  Bar: () => <div>Bar</div>,
}));

describe("Forked Repos", () => {
  beforeEach(() => {
    render(<ForkedRepos repositories={mockRepositories} />);
  });

  test("Render ForkedRepos component", () => {
    expect(screen.getByText("Forked Repos")).toBeInTheDocument();
  });
  test("Should render the charts with correct data", () => {
    expect(screen.getByText("CartesianGrid")).toBeInTheDocument();
    expect(screen.getByText("XAxis")).toBeInTheDocument();
    expect(screen.getByText("YAxis")).toBeInTheDocument();
    expect(screen.getByText("Bar")).toBeInTheDocument();
  });
});
