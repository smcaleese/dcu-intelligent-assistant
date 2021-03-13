import React from 'react';
import {create} from 'react-test-renderer';
import LoginScreen from '../../assignments/LoginScreen';

const screen = create(<LoginScreen />)

test('LoginScreen Snapshot Test', () => {
    expect(screen).toMatchSnapshot();
})
