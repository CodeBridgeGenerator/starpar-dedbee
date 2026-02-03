import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeKRAScorePage from "../YrEmployeeKRAScorePage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeKRAScore page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeKRAScorePage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeKRAScore-datatable")).toBeInTheDocument();
    expect(screen.getByRole("yrEmployeeKRAScore-add-button")).toBeInTheDocument();
});
