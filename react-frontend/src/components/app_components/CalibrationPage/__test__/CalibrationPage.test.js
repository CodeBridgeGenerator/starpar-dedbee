import React from "react";
import { render, screen } from "@testing-library/react";

import CalibrationPage from "../CalibrationPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders calibration page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CalibrationPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("calibration-datatable")).toBeInTheDocument();
    expect(screen.getByRole("calibration-add-button")).toBeInTheDocument();
});
