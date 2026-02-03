import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeCompetenciesscorePage from "../YrEmployeeCompetenciesscorePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeCompetenciesscore page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeCompetenciesscorePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeCompetenciesscore-datatable")).toBeInTheDocument();
    expect(screen.getByRole("yrEmployeeCompetenciesscore-add-button")).toBeInTheDocument();
});
