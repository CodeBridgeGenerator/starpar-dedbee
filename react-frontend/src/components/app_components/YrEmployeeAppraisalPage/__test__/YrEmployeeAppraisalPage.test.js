import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeAppraisalPage from "../YrEmployeeAppraisalPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeAppraisal page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeAppraisalPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeAppraisal-datatable")).toBeInTheDocument();
    expect(screen.getByRole("yrEmployeeAppraisal-add-button")).toBeInTheDocument();
});
