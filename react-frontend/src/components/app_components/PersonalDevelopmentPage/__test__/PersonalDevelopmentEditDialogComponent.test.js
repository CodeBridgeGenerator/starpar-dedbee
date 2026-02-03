import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalDevelopmentEditDialogComponent from "../PersonalDevelopmentEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders personalDevelopment edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalDevelopmentEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("personalDevelopment-edit-dialog-component")).toBeInTheDocument();
});
