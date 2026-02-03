import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeAppraisalReviewPage from "../EmployeeAppraisalReviewPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders employeeAppraisalReview page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeAppraisalReviewPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeAppraisalReview-datatable")).toBeInTheDocument();
    expect(screen.getByRole("employeeAppraisalReview-add-button")).toBeInTheDocument();
});
