import React from "react";
import { render, screen } from "@testing-library/react";

import AppraisalsPage from "../AppraisalsPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders appraisals page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AppraisalsPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("appraisals-datatable")).toBeInTheDocument();
    expect(screen.getByRole("appraisals-add-button")).toBeInTheDocument();
});
