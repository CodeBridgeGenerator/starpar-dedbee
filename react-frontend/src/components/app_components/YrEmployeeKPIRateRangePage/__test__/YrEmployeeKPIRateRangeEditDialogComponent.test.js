import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeKPIRateRangeEditDialogComponent from "../YrEmployeeKPIRateRangeEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeKPIRateRange edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeKPIRateRangeEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeKPIRateRange-edit-dialog-component")).toBeInTheDocument();
});
