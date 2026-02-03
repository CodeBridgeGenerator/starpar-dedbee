import React from "react";
import { render, screen } from "@testing-library/react";

import KraScoresEditDialogComponent from "../KraScoresEditDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders kraScores edit dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <KraScoresEditDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("kraScores-edit-dialog-component")).toBeInTheDocument();
});
