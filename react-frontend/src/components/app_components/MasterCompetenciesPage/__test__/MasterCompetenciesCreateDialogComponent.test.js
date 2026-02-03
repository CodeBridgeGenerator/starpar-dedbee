import React from "react";
import { render, screen } from "@testing-library/react";

import MasterCompetenciesCreateDialogComponent from "../MasterCompetenciesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders masterCompetencies create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MasterCompetenciesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("masterCompetencies-create-dialog-component")).toBeInTheDocument();
});
