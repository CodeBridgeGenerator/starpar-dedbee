import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeCompetenciesscorePage from "../EmployeeCompetenciesscorePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders employeeCompetenciesscore page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeCompetenciesscorePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeCompetenciesscore-datatable")).toBeInTheDocument();
    expect(screen.getByRole("employeeCompetenciesscore-add-button")).toBeInTheDocument();
});
