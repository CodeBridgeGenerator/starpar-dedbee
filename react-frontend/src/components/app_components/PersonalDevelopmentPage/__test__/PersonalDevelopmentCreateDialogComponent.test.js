import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalDevelopmentCreateDialogComponent from "../PersonalDevelopmentCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders personalDevelopment create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalDevelopmentCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("personalDevelopment-create-dialog-component")).toBeInTheDocument();
});
