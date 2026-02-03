import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeCompetenciesscoreCreateDialogComponent from "../EmployeeCompetenciesscoreCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeCompetenciesscore create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeCompetenciesscoreCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeCompetenciesscore-create-dialog-component")).toBeInTheDocument();
});
