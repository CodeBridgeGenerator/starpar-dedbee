import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeAppraisalReviewEditDialogComponent from "../YrEmployeeAppraisalReviewEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeAppraisalReview edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeAppraisalReviewEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeAppraisalReview-edit-dialog-component")).toBeInTheDocument();
});
