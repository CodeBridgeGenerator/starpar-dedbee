import React from "react";
import { render, screen } from "@testing-library/react";

import ParSessionAppraisersPage from "../ParSessionAppraisersPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders parSessionAppraisers page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ParSessionAppraisersPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("parSessionAppraisers-datatable")).toBeInTheDocument();
    expect(screen.getByRole("parSessionAppraisers-add-button")).toBeInTheDocument();
});
