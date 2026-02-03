import React from "react";
import { render, screen } from "@testing-library/react";

import MasterTrainingPage from "../MasterTrainingPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders masterTraining page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <MasterTrainingPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("masterTraining-datatable")).toBeInTheDocument();
    expect(screen.getByRole("masterTraining-add-button")).toBeInTheDocument();
});
