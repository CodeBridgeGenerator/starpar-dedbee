import React from "react";
import { render, screen } from "@testing-library/react";

import ParSessionCreateDialogComponent from "../ParSessionCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders parSession create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ParSessionCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("parSession-create-dialog-component")).toBeInTheDocument();
});
