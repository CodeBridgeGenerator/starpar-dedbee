import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeTrainingEditDialogComponent from "../YrEmployeeTrainingEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeTraining edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeTrainingEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeTraining-edit-dialog-component")).toBeInTheDocument();
});
