import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeAppraisalReviewCreateDialogComponent from "../YrEmployeeAppraisalReviewCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeAppraisalReview create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeAppraisalReviewCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeAppraisalReview-create-dialog-component")).toBeInTheDocument();
});
