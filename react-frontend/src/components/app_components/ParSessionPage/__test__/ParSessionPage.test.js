import React from "react";
import { render, screen } from "@testing-library/react";

import ParSessionPage from "../ParSessionPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders parSession page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <ParSessionPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("parSession-datatable")).toBeInTheDocument();
    expect(screen.getByRole("parSession-add-button")).toBeInTheDocument();
});
