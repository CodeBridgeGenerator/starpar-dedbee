import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeKPIRateRangeCreateDialogComponent from "../YrEmployeeKPIRateRangeCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeKPIRateRange create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeKPIRateRangeCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeKPIRateRange-create-dialog-component")).toBeInTheDocument();
});
