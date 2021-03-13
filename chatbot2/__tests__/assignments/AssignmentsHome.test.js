import React from 'react';
import {create} from 'react-test-renderer';
import AssignmentsHome from '../../assignments/AssignmentsHome';

const screen = create(<AssignmentsHome assignments={[]} />)

test('AssignmentsHome Snapshot Test', () => {
    expect(screen).toMatchSnapshot()
})