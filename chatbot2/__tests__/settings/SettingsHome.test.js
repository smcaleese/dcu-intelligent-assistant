import React from 'react';
import {create} from 'react-test-renderer';
import SettingsHome from '../../settings/SettingsHome';

//jest.mock('@react-native-async-storage/async-storage');
//jest.useFakeTimers();

const screen = create(<SettingsHome />)

test('SettingsHome Snapshot Test', () => {
    expect(screen).toMatchSnapshot();
})