import React from "react";
import { render, screen } from "@testing-library/react";

import KraScoresPage from "../KraScoresPage";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../../models";

test("renders kraScores page", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <KraScoresPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("kraScores-datatable")).toBeInTheDocument();
    expect(screen.getByRole("kraScores-add-button")).toBeInTheDocument();
});
