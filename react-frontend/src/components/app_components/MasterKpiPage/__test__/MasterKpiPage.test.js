import React from "react";
import { render, screen } from "@testing-library/react";

import MasterKpiPage from "../MasterKpiPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders masterKpi page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MasterKpiPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("masterKpi-datatable")).toBeInTheDocument();
    expect(screen.getByRole("masterKpi-add-button")).toBeInTheDocument();
});
