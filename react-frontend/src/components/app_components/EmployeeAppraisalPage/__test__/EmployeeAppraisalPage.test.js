import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeAppraisalPage from "../EmployeeAppraisalPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders employeeAppraisal page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeAppraisalPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeAppraisal-datatable")).toBeInTheDocument();
    expect(screen.getByRole("employeeAppraisal-add-button")).toBeInTheDocument();
});
