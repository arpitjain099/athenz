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
import { render, waitFor } from '@testing-library/react';
import TemplatePage from '../../../../pages/domain/[domain]/template';
import {
    mockAllDomainDataApiCalls,
    renderWithRedux,
} from '../../../../tests_utils/ComponentsTestUtils';
import MockApi from '../../../../mock/MockApi';
import { listUserDomains_response } from '../../../../mock/MockData';

afterEach(() => {
    MockApi.cleanMockApi();
});

describe('Template Page', () => {
    it('should render', async () => {
        const query = {
            domain: 'dom',
        };
        const userId = 'test';
        const domain = 'home.test';
        const domainDetails = {
            description: 'test',
            org: 'athenz',
            enabled: true,
            auditEnabled: false,
            account: '1231243134',
            ypmId: 0,
            name: 'home.test',
            modified: '2020-01-24T18:14:51.939Z',
            id: 'a48cb050-e4fa-11e7-9d38-9d13efb959d1',
        };
        let headerDetails = {
            headerLinks: [
                {
                    title: 'Website',
                    url: 'http://www.athenz.io',
                    target: '_blank',
                },
            ],
        };

        const mockApi = {
            ...mockAllDomainDataApiCalls(domainDetails, headerDetails),
            getPendingDomainMembersList: jest.fn().mockReturnValue(
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
            <TemplatePage
                req='req'
                userId={userId}
                query={query}
                reload={false}
                domainName={domain}
                domainResult={[]}
            />
        );

        await waitFor(() => {
            expect(getByTestId('template')).toBeInTheDocument();
        });

        const templatePage = getByTestId('template');
        expect(templatePage).toMatchSnapshot();
    });
});
