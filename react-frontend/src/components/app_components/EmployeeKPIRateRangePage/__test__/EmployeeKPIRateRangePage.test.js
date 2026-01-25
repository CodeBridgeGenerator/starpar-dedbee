import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeKPIRateRangePage from "../EmployeeKPIRateRangePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders employeeKPIRateRange page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeKPIRateRangePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeKPIRateRange-datatable")).toBeInTheDocument();
    expect(screen.getByRole("employeeKPIRateRange-add-button")).toBeInTheDocument();
});
