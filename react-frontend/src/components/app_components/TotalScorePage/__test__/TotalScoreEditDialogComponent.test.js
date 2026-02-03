import React from "react";
import { render, screen } from "@testing-library/react";

import TotalScoreEditDialogComponent from "../TotalScoreEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders totalScore edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <TotalScoreEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("totalScore-edit-dialog-component")).toBeInTheDocument();
});
