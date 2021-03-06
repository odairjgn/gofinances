import React from "react";
import { Register } from ".";
import { render, fireEvent, waitFor } from "@testing-library/react-native";
import theme from "../../global/styles/theme";
import { ThemeProvider } from "styled-components/native";

const Providers: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Register Screen", () => {
  it("Should be open category modal when user click buttom", async () => {
    const { getByTestId } = render(<Register />, { wrapper: Providers });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("category-select-button");
    fireEvent.press(buttonCategory);
    await waitFor(() => {
      expect(categoryModal.props.visible).toBeTruthy();
    });
  });
});
