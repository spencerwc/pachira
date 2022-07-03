import React from "react";
import '@testing-library/jest-dom';
import {render, screen } from '@testing-library/react';
import { UserAuthProvider } from "../../../context/UserAuthContext";
import DashboardProfile from "../DashboardProfile";

describe('dashboard profile information', () => {
    const testUser = {
        avatar: '',
        displayName: 'username',
        email: 'test@email.com'
    }

    it('renders the user avatar', () => {
        render(
            <UserAuthProvider>
                <DashboardProfile 
                    avatar={testUser.avatar} 
                    displayName={testUser.displayName}
                    email={testUser.email}
                />
            </UserAuthProvider>
        );
        
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders the user display name and email address', () => {
        render(
            <UserAuthProvider>
                <DashboardProfile 
                    avatar={testUser.avatar} 
                    displayName={testUser.displayName}
                    email={testUser.email}
                />
            </UserAuthProvider>
        );

        expect(screen.getByText(testUser.displayName)).toBeInTheDocument();
        expect(screen.getByText(testUser.email)).toBeInTheDocument();
    });
});