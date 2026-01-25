import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeKRAScoreCreateDialogComponent from "../EmployeeKRAScoreCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders employeeKRAScore create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeKRAScoreCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeKRAScore-create-dialog-component")).toBeInTheDocument();
});
