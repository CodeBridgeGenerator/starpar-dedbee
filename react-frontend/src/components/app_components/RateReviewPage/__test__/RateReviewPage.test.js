import React from "react";
import { render, screen } from "@testing-library/react";

import RateReviewPage from "../RateReviewPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders rateReview page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RateReviewPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("rateReview-datatable")).toBeInTheDocument();
    expect(screen.getByRole("rateReview-add-button")).toBeInTheDocument();
});
