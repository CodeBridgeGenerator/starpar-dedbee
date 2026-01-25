import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeKPIRateRangeEditDialogComponent from "../EmployeeKPIRateRangeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeKPIRateRange edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeKPIRateRangeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeKPIRateRange-edit-dialog-component")).toBeInTheDocument();
});
