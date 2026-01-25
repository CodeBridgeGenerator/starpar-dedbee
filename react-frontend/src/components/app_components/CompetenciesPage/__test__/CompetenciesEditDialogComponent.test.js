import React from "react";
import { render, screen } from "@testing-library/react";

import CompetenciesEditDialogComponent from "../CompetenciesEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders competencies edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompetenciesEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("competencies-edit-dialog-component")).toBeInTheDocument();
});
