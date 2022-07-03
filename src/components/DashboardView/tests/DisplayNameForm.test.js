import React from "react";
import '@testing-library/jest-dom';
import {render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { UserAuthProvider } from "../../../context/UserAuthContext";
import DisplayNameForm from '../DisplayNameForm';

describe('display name form', () => {
    it('contains a text input', () => {
        render(
            <UserAuthProvider>
                <DisplayNameForm />
            </UserAuthProvider>
        );

        expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('updates the display name on user input', () => {
        const onChangeMock = jest.fn();

        render(
            <UserAuthProvider>
                <DisplayNameForm 
                    updateDisplayName={onChangeMock} 
                />
            </UserAuthProvider>
        );

        const input = screen.getByRole('textbox');
        const displayName = 'spencer';
        userEvent.type(input, displayName);
        expect(onChangeMock).toHaveBeenCalledTimes(displayName.length);
    });

    it('calls onChange with correct arguments on each input', () => {
        const onChangeMock = jest.fn();
        
        render(
            <UserAuthProvider>
                <DisplayNameForm 
                    updateDisplayName={onChangeMock} 
                />
            </UserAuthProvider>
        );

        const input = screen.getByRole('textbox');
        const displayName = 'stardropvalley';

        userEvent.type(input, displayName);
        expect(onChangeMock).toHaveBeenNthCalledWith(1, 's');
        expect(onChangeMock).toHaveBeenNthCalledWith(5, 'stard');
        expect(onChangeMock).toHaveBeenNthCalledWith(14, 'stardropvalley');
    });
});