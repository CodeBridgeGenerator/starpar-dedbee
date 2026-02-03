import React from "react";
import { render, screen } from "@testing-library/react";

import ScoreConfigCreateDialogComponent from "../ScoreConfigCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders scoreConfig create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ScoreConfigCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("scoreConfig-create-dialog-component")).toBeInTheDocument();
});
