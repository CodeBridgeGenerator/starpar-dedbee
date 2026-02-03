import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeTrainingPage from "../EmployeeTrainingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders employeeTraining page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeTrainingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeTraining-datatable")).toBeInTheDocument();
    expect(screen.getByRole("employeeTraining-add-button")).toBeInTheDocument();
});
