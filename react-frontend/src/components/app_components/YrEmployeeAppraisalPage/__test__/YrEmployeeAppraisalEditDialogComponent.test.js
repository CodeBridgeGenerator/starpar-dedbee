import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeAppraisalEditDialogComponent from "../YrEmployeeAppraisalEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeAppraisal edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeAppraisalEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeAppraisal-edit-dialog-component")).toBeInTheDocument();
});
