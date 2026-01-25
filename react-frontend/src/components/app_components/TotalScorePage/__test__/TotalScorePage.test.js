import React from "react";
import { render, screen } from "@testing-library/react";

import TotalScorePage from "../TotalScorePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders totalScore page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TotalScorePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("totalScore-datatable")).toBeInTheDocument();
    expect(screen.getByRole("totalScore-add-button")).toBeInTheDocument();
});
