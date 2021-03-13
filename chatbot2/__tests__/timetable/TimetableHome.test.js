import React from 'react';
import {create} from 'react-test-renderer';
import TimetableHome from '../../timetable/TimetableHome';

const screen = create(<TimetableHome />)

test('TimetableHome Snapshot Test', () => {
    expect(screen).toMatchSnapshot();
})