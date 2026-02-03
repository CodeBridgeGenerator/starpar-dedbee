import React from "react";
import { render, screen } from "@testing-library/react";

import EmployeeAppraisalRemarksPage from "../EmployeeAppraisalRemarksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders employeeAppraisalRemarks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <EmployeeAppraisalRemarksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("employeeAppraisalRemarks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("employeeAppraisalRemarks-add-button")).toBeInTheDocument();
});
