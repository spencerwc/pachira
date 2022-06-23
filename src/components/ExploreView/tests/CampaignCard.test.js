import React from "react";
import { BrowserRouter } from "react-router-dom";
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testCampaign } from "../../../utils/testCampaign";
import CampaignCard from '../CampaignCard';

const MAX_SUMMARY_LENGTH = 80;

describe('campaign preview card', () => {
    it('renders the campaign title', () => {
        render(
            <BrowserRouter>
                <CampaignCard 
                    title={testCampaign.title}
                    summary={testCampaign.summary}
                />
            </BrowserRouter>
        );
        
        expect(screen.getByText(testCampaign.title)).toBeInTheDocument();
    });

    it('renders the campaign summary', () => {
        render(
            <BrowserRouter>
                <CampaignCard 
                    summary={'Hello World!'}
                />
            </BrowserRouter>
        );

        expect(screen.getByText('Hello World!')).toBeInTheDocument();
    });

    it('slices longer campaign summaries', () => {
        render(
            <BrowserRouter>
                <CampaignCard 
                    summary={testCampaign.summary}
                />
            </BrowserRouter>
        );

        expect(screen.getByText(`${testCampaign.summary.slice(0, MAX_SUMMARY_LENGTH)}...`)).toBeInTheDocument();
    });

    it ('links to the campaign', () => {
        render(
            <BrowserRouter>
                <CampaignCard 
                    title={testCampaign.title}
                    summary={testCampaign.summary}
                />
            </BrowserRouter>
        );
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});