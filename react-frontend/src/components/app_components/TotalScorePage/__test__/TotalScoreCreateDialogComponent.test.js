import React from "react";
import { render, screen } from "@testing-library/react";

import TotalScoreCreateDialogComponent from "../TotalScoreCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders totalScore create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TotalScoreCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("totalScore-create-dialog-component")).toBeInTheDocument();
});
