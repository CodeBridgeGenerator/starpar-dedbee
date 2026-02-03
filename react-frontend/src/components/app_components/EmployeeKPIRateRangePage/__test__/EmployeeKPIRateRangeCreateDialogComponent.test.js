import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeKPIRateRangeCreateDialogComponent from "../EmployeeKPIRateRangeCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeKPIRateRange create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeKPIRateRangeCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeKPIRateRange-create-dialog-component")).toBeInTheDocument();
});
