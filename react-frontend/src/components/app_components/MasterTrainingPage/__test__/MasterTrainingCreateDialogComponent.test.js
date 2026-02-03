import React from "react";
import { render, screen } from "@testing-library/react";

import MasterTrainingCreateDialogComponent from "../MasterTrainingCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders masterTraining create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MasterTrainingCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("masterTraining-create-dialog-component")).toBeInTheDocument();
});
