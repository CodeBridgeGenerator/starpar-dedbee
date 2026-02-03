import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeAppraisalReviewPage from "../YrEmployeeAppraisalReviewPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeAppraisalReview page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeAppraisalReviewPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeAppraisalReview-datatable")).toBeInTheDocument();
    expect(screen.getByRole("yrEmployeeAppraisalReview-add-button")).toBeInTheDocument();
});
