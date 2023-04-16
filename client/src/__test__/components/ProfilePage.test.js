import React from "react";
import {act} from "react-dom/test-utils";
import {render, screen, waitFor} from "@testing-library/react";
import ProfilePage from "../../components/profile/ProfilePage";
import {MemoryRouter, Route, Routes} from "react-router-dom";
import * as fn from "../../components/Function";
import {cookies} from "../../components/Function";

// Mock Function.fetchUserProfile and Cookies
jest.mock("../../components/Function");
jest.mock("universal-cookie");

// Mock user data
const mockUser = {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    age: 25,
    companyName: "Tech Inc",
    userType: "employer",
    biography: "I'm a software engineer.",
    workExperience: [
        {
            position: "Software Engineer",
            companyName: "ABC Corp",
            startDate: "2019-01-01",
            endDate: "2021-12-31",
        },
    ],
    education: [
        {
            degree: "Bachelor of Science in Computer Science",
            schoolName: "XYZ University",
            startDate: "2014-01-01",
            endDate: "2018-12-31",
        },
    ],
};

describe("ProfilePage", () => {
    beforeEach(() => {
        fn.fetchUserProfile.mockImplementation(() => Promise.resolve(mockUser));
        fn.isLoggedIn.mockImplementation(true)
        cookies.get.mockImplementation('aaaa')
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("renders user profile information", async () => {

        await act(async () => {
            render(
                <MemoryRouter initialEntries={["/profile/1"]}>
                    <Routes>
                        <Route path="/profile/:userId" element={<ProfilePage/>}/>
                    </Routes>
                </MemoryRouter>
            );
        });

        // Wait for user profile to load
        await waitFor(() => screen.getByText("John Doe"));

        expect(screen.getByText("John Doe")).toBeInTheDocument();
        expect(screen.getByText("john@example.com")).toBeInTheDocument();
        expect(screen.getByText("Age: 25")).toBeInTheDocument();
        expect(screen.getByText("Company: Tech Inc")).toBeInTheDocument();
        expect(screen.getByText("I'm a software engineer.")).toBeInTheDocument();
    });

});
