import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeTrainingCreateDialogComponent from "../EmployeeTrainingCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeTraining create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeTrainingCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeTraining-create-dialog-component")).toBeInTheDocument();
});
