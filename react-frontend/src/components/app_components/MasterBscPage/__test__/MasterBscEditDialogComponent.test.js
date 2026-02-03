import React from "react";
import { render, screen } from "@testing-library/react";

import MasterBscEditDialogComponent from "../MasterBscEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders masterBsc edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MasterBscEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("masterBsc-edit-dialog-component")).toBeInTheDocument();
});
