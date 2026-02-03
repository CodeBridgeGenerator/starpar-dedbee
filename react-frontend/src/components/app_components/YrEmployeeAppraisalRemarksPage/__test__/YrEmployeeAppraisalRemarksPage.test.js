import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeAppraisalRemarksPage from "../YrEmployeeAppraisalRemarksPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeAppraisalRemarks page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeAppraisalRemarksPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeAppraisalRemarks-datatable")).toBeInTheDocument();
    expect(screen.getByRole("yrEmployeeAppraisalRemarks-add-button")).toBeInTheDocument();
});
