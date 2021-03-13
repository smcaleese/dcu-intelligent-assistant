import React from 'react';
import {create} from 'react-test-renderer';
import TransportHome from '../../transport/TransportHome';
import { getStops } from '../../utils/GetBus';

jest.mock('../../utils/GetBus', () => ({ getStops: jest.fn() }))
jest.useFakeTimers();

getStops.mockImplementation(() => {
    return new Promise((resolve) => {
        resolve([])
    })
})

const screen = create(<TransportHome />)

test('TransportHome Snapshot Test', () => {
    expect(screen).toMatchSnapshot();
})
