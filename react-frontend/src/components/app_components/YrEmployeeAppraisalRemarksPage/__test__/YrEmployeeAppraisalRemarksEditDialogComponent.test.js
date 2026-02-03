import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeAppraisalRemarksEditDialogComponent from "../YrEmployeeAppraisalRemarksEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeAppraisalRemarks edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeAppraisalRemarksEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeAppraisalRemarks-edit-dialog-component")).toBeInTheDocument();
});
