import React from "react";
import { render, screen } from "@testing-library/react";

import CompetenciesScoresPage from "../CompetenciesScoresPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders competenciesScores page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompetenciesScoresPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("competenciesScores-datatable")).toBeInTheDocument();
    expect(screen.getByRole("competenciesScores-add-button")).toBeInTheDocument();
});
