import React from "react";
import { render, screen } from "@testing-library/react";

import ParSessionAppraisersEditDialogComponent from "../ParSessionAppraisersEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders parSessionAppraisers edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ParSessionAppraisersEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("parSessionAppraisers-edit-dialog-component")).toBeInTheDocument();
});
