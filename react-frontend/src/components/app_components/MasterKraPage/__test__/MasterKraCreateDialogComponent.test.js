import React from "react";
import { render, screen } from "@testing-library/react";

import MasterKraCreateDialogComponent from "../MasterKraCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders masterKra create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MasterKraCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("masterKra-create-dialog-component")).toBeInTheDocument();
});
