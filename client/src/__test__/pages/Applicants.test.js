import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Applicants from '../../pages/Applicants';
import * as fn from '../../components/Function';

jest.mock('universal-cookie');

const mockGetPostingsByEmployerId = jest.spyOn(fn, 'getPostingsByEmployerId');
const mockFetchUserProfile = jest.spyOn(fn, 'fetchUserProfile');

describe('Applicants', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const samplePostings = [
        {
            _id: 'posting1',
            title: 'Sample Posting 1',
            pendingApplicantsIds: ['student1'],
            interviewApplicantIds: [],
            acceptedApplicantIds: [],
        },
    ];

    const sampleStudent1 = {
        firstName: 'John',
        lastName: 'Doe',
        studentId: 'student1',
        biography: 'Bio 1',
    };

    test('renders Applicants component with fetched applications', async () => {
        mockGetPostingsByEmployerId.mockResolvedValue(samplePostings);
        mockFetchUserProfile
            .mockResolvedValueOnce(sampleStudent1);

        render(<Applicants/>);

        await waitFor(() => expect(mockGetPostingsByEmployerId).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(mockFetchUserProfile).toHaveBeenCalledTimes(1));

        expect(screen.getByText('Sample Posting 1')).toBeInTheDocument();
    });
});
