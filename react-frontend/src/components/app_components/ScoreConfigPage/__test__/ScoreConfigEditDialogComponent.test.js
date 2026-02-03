import React from "react";
import { render, screen } from "@testing-library/react";

import ScoreConfigEditDialogComponent from "../ScoreConfigEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders scoreConfig edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScoreConfigEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scoreConfig-edit-dialog-component")).toBeInTheDocument();
});
