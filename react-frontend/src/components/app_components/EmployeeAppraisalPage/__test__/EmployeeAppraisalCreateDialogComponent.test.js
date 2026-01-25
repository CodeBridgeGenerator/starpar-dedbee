import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeAppraisalCreateDialogComponent from "../EmployeeAppraisalCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeAppraisal create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeAppraisalCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeAppraisal-create-dialog-component")).toBeInTheDocument();
});
