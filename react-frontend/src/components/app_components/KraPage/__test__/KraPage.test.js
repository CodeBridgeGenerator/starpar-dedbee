import React from "react";
import { render, screen } from "@testing-library/react";

import KraPage from "../KraPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders kra page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <KraPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("kra-datatable")).toBeInTheDocument();
    expect(screen.getByRole("kra-add-button")).toBeInTheDocument();
});
