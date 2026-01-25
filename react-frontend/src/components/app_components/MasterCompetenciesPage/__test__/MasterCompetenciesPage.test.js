import React from "react";
import { render, screen } from "@testing-library/react";

import MasterCompetenciesPage from "../MasterCompetenciesPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders masterCompetencies page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MasterCompetenciesPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("masterCompetencies-datatable")).toBeInTheDocument();
    expect(screen.getByRole("masterCompetencies-add-button")).toBeInTheDocument();
});
