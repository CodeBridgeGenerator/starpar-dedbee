import React from "react";
import { render, screen } from "@testing-library/react";

import AccessControlPage from "../AccessControlPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders accessControl page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <AccessControlPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("accessControl-datatable")).toBeInTheDocument();
    expect(screen.getByRole("accessControl-add-button")).toBeInTheDocument();
});
