import React from "react";
import { render, screen } from "@testing-library/react";

import CompetenciesCreateDialogComponent from "../CompetenciesCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders competencies create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompetenciesCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("competencies-create-dialog-component")).toBeInTheDocument();
});
