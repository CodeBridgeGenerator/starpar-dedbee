import React from "react";
import { render, screen } from "@testing-library/react";

import CompetenciesScoresCreateDialogComponent from "../CompetenciesScoresCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders competenciesScores create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CompetenciesScoresCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("competenciesScores-create-dialog-component")).toBeInTheDocument();
});
