import React from 'react';
import {create} from 'react-test-renderer';
import ChatBotHome from '../../chatbot/ChatBotHome';

jest.mock('@react-navigation/native');

const screen = create(<ChatBotHome />);

test('ChatBotHome Snapshot Test', () => {
    expect(screen).toMatchSnapshot();
})