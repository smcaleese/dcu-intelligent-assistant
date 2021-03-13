import React from 'react';
import {create} from 'react-test-renderer';
import SignupScreen from '../../assignments/SignupScreen';

const screen = create(<SignupScreen />)

test('SignupScreen Snapshot Test', () => {
    expect(screen).toMatchSnapshot();
})