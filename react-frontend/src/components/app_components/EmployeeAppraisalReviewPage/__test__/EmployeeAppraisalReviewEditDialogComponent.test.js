import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeAppraisalReviewEditDialogComponent from "../EmployeeAppraisalReviewEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeAppraisalReview edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeAppraisalReviewEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeAppraisalReview-edit-dialog-component")).toBeInTheDocument();
});
