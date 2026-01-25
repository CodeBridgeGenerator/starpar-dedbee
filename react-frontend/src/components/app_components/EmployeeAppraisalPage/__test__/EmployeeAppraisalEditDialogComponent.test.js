import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeAppraisalEditDialogComponent from "../EmployeeAppraisalEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeAppraisal edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeAppraisalEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeAppraisal-edit-dialog-component")).toBeInTheDocument();
});
