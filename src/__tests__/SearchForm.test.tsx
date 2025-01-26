import SearchForm from "@/components/form/SearchForm";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockToast = vi.fn();
const setUserNameMock = vi.fn();

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({
    toast: mockToast,
  }),
}));

describe("SearchForm", () => {
  const user = userEvent.setup();
  beforeEach(() => {
    vi.clearAllMocks();
  });
  function getFormElement() {
    const inputEl = screen.getByRole("textbox", { name: /search/i });
    const buttonEl = screen.getByRole("button", { name: /search/i });
    return { inputEl, buttonEl };
  }

  test("Renderthe form correctlly", () => {
    render(<SearchForm userName="john_doe" setUserName={setUserNameMock} />);
    const { inputEl, buttonEl } = getFormElement();
    expect(inputEl).toHaveValue("john_doe");
    expect(buttonEl).toBeInTheDocument();
  });
  test("Renderthe empty user name form", () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { inputEl } = getFormElement();
    expect(inputEl).toHaveValue("");
  });
  test("Update input value on change", async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { inputEl } = getFormElement();
    await user.type(inputEl, "hoge");
    expect(inputEl).toHaveValue("hoge");
  });
  test("Shows toast when user name is empty", async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { buttonEl } = getFormElement();
    await user.click(buttonEl);
    expect(mockToast).toHaveBeenCalledWith({
      description: "Please enter a valid username",
    });
    expect(setUserNameMock).not.toHaveBeenCalled();
  });
  test("Calls setUserName on valid form value", async () => {
    render(<SearchForm userName="" setUserName={setUserNameMock} />);
    const { inputEl, buttonEl } = getFormElement();
    await user.type(inputEl, "john_doe");
    await user.click(buttonEl);

    expect(setUserNameMock).toHaveBeenCalledWith("john_doe");
    expect(mockToast).not.toHaveBeenCalled();
  });
});
