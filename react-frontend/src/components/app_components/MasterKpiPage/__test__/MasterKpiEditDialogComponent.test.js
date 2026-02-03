import React from "react";
import { render, screen } from "@testing-library/react";

import MasterKpiEditDialogComponent from "../MasterKpiEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders masterKpi edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MasterKpiEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("masterKpi-edit-dialog-component")).toBeInTheDocument();
});
