import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeKRAScorePage from "../EmployeeKRAScorePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders employeeKRAScore page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeKRAScorePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeKRAScore-datatable")).toBeInTheDocument();
    expect(screen.getByRole("employeeKRAScore-add-button")).toBeInTheDocument();
});
