/*
 * Copyright The Athenz Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { waitFor } from '@testing-library/react';
import RolePage from '../../../../pages/domain/[domain]/role';
import {
    mockAllDomainDataApiCalls,
    mockRolesApiCalls,
    renderWithRedux,
} from '../../../../tests_utils/ComponentsTestUtils';
import MockApi from '../../../../mock/MockApi';
import { listUserDomains_response } from '../../../../mock/MockData';

afterEach(() => {
    MockApi.cleanMockApi();
});

describe('RolePage', () => {
    it('should render', async () => {
        let query = {
            domain: 'dom',
        };
        let domainDetails = {
            modified: '2020-02-12T21:44:37.792Z',
        };
        let headerDetails = {
            headerLinks: [
                {
                    title: 'Website',
                    url: 'http://www.athenz.io',
                    target: '_blank',
                },
            ],
            userData: {
                userLink: {
                    title: 'User Link',
                    url: '',
                    target: '_blank',
                },
            },
        };

        const mockApi = {
            ...mockAllDomainDataApiCalls(domainDetails, headerDetails),
            ...mockRolesApiCalls(),
            getPendingDomainMembersList: jest.fn().mockReturnValue(
                new Promise((resolve, reject) => {
                    resolve([]);
                })
            ),
            getServiceDependencies: jest.fn().mockReturnValue(
                new Promise((resolve, reject) => {
                    resolve([]);
                })
            ),
            listUserDomains: jest.fn().mockReturnValue(
                new Promise((resolve, reject) => {
                    resolve(listUserDomains_response);
                })
            ),
            getReviewGroups: jest.fn().mockReturnValue([]),
            getReviewRoles: jest.fn().mockReturnValue([]),
            getPageFeatureFlag: jest.fn().mockResolvedValue({}),
        };
        MockApi.setMockApi(mockApi);

        const { getByTestId } = renderWithRedux(
            <RolePage
                req='req'
                userId='userid'
                query={query}
                reload={false}
                domainName='dom'
                domainResult={[]}
            />
        );

        await waitFor(() => {
            expect(getByTestId('role')).toBeInTheDocument();
        });

        const rolePage = getByTestId('role');
        expect(rolePage).toMatchSnapshot();
    });
});
