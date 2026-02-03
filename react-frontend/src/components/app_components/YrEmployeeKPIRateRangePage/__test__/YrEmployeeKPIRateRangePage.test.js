import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeKPIRateRangePage from "../YrEmployeeKPIRateRangePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeKPIRateRange page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeKPIRateRangePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeKPIRateRange-datatable")).toBeInTheDocument();
    expect(screen.getByRole("yrEmployeeKPIRateRange-add-button")).toBeInTheDocument();
});
