import React from "react";
import { render, screen } from "@testing-library/react";

import RateReviewEditDialogComponent from "../RateReviewEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders rateReview edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <RateReviewEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("rateReview-edit-dialog-component")).toBeInTheDocument();
});
