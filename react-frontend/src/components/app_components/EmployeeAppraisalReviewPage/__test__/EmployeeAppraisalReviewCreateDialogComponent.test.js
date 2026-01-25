import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeAppraisalReviewCreateDialogComponent from "../EmployeeAppraisalReviewCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeAppraisalReview create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeAppraisalReviewCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeAppraisalReview-create-dialog-component")).toBeInTheDocument();
});
