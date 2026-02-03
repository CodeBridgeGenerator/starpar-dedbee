import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeAppraisalRemarksCreateDialogComponent from "../YrEmployeeAppraisalRemarksCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeAppraisalRemarks create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeAppraisalRemarksCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeAppraisalRemarks-create-dialog-component")).toBeInTheDocument();
});
