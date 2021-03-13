import React from 'react';
import {create} from 'react-test-renderer';
import TransportOutput from '../../transport/TransportOutput';

// "2021-03-10T15:30:30.000Z"

const params = {
    params: {
        times: [
            {   
                arrival_time: "2021-03-10T15:30:30.000Z",
                trip_headsign: "Test-Dest",
                bus_number: "123",
                time_diff: "10",
                stop_name: "Test"
            },
            {   
                arrival_time: "2021-03-10T15:40:30.000Z",
                trip_headsign: "Test-Dest",
                bus_number: "123",
                time_diff: "20",
                stop_name: "Test"
            },
        ]
    }
}

jest.useFakeTimers();

const screen = create(<TransportOutput route={params} />)

test('TransportOutput Snapshot Test', () => {
    expect(screen).toMatchSnapshot();
})