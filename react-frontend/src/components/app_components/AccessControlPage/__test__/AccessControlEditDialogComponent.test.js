import React from "react";
import { render, screen } from "@testing-library/react";

import AccessControlEditDialogComponent from "../AccessControlEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders accessControl edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AccessControlEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("accessControl-edit-dialog-component")).toBeInTheDocument();
});
