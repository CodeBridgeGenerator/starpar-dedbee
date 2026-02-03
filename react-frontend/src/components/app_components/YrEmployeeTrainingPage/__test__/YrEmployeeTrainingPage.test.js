import React from "react";
import { render, screen } from "@testing-library/react";

import YrEmployeeTrainingPage from "../YrEmployeeTrainingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders yrEmployeeTraining page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <YrEmployeeTrainingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("yrEmployeeTraining-datatable")).toBeInTheDocument();
    expect(screen.getByRole("yrEmployeeTraining-add-button")).toBeInTheDocument();
});
