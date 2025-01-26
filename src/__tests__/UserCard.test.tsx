import UserCard from "@/components/user/UserCard";
import { render, screen } from "@testing-library/react";

describe("UserCard", () => {
  const mockProps = {
    avatarUrl: "https://example.com/avatar.jpg",
    name: "John Doe",
    bio: "Frontend Developer",
    url: "https://github.com/johndoe",
  };
  test("renders user information correctly", () => {
    render(<UserCard {...mockProps} />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Frontend Developer")).toBeInTheDocument();

    const avatarImage = screen.getByAltText("John Doe");
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      "src",
      "https://example.com/avatar.jpg"
    );

    const folloeLink = screen.getByRole("link", { name: /follow/i });
    expect(folloeLink).toHaveAttribute("href", "https://github.com/johndoe");
    expect(folloeLink).toHaveAttribute("target", "_blank");
    expect(folloeLink).toHaveAttribute("rel", "noreferrer");
  });
  test("renders default value when name and bio are not provided", () => {
    const propsWithoutNameBio = {
      ...mockProps,
      name: "",
      bio: "",
    };
    render(<UserCard {...propsWithoutNameBio} />);

    expect(screen.getByText("Coding Addict")).toBeInTheDocument();
    expect(
      screen.getByText("Passionate about coding and technology")
    ).toBeInTheDocument();
  });
});
