import React from "react";
import { render, screen } from "@testing-library/react";

import PersonalDevelopmentPage from "../PersonalDevelopmentPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders personalDevelopment page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <PersonalDevelopmentPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("personalDevelopment-datatable")).toBeInTheDocument();
    expect(screen.getByRole("personalDevelopment-add-button")).toBeInTheDocument();
});
