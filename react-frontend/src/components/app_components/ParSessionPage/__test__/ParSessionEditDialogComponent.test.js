import React from "react";
import { render, screen } from "@testing-library/react";

import ParSessionEditDialogComponent from "../ParSessionEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders parSession edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ParSessionEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("parSession-edit-dialog-component")).toBeInTheDocument();
});
