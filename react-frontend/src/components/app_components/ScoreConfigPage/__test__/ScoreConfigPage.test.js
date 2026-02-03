import React from "react";
import { render, screen } from "@testing-library/react";

import ScoreConfigPage from "../ScoreConfigPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders scoreConfig page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScoreConfigPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scoreConfig-datatable")).toBeInTheDocument();
    expect(screen.getByRole("scoreConfig-add-button")).toBeInTheDocument();
});
