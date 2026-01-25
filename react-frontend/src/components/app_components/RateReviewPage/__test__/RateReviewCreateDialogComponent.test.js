import React from "react";
import { render, screen } from "@testing-library/react";

import RateReviewCreateDialogComponent from "../RateReviewCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rateReview create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RateReviewCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("rateReview-create-dialog-component")).toBeInTheDocument();
});
