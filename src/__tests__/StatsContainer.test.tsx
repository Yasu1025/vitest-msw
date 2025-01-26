import StatsContainer from "@/components/user/StatsContainer";
import { render, screen } from "@testing-library/react";

describe("StatsContainer", () => {
  const mockProps = {
    totalRepos: 25,
    followers: 100,
    following: 50,
    gists: 10,
  };
  test("Render all stats corecctly", () => {
    render(<StatsContainer {...mockProps} />);
    expect(screen.getByText("Total Repositories")).toBeInTheDocument();
    expect(screen.getByText("25")).toBeInTheDocument();

    expect(screen.getByText("Followers")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();

    expect(screen.getByText("Following")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();

    expect(screen.getByText("Gists")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });
});
