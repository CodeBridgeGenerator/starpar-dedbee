import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeCompetenciesscoreCreateDialogComponent from "../YrEmployeeCompetenciesscoreCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeCompetenciesscore create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeCompetenciesscoreCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeCompetenciesscore-create-dialog-component")).toBeInTheDocument();
});
