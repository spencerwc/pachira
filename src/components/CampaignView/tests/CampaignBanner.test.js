import React from "react";
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testCampaign } from "../../../utils/testCampaign";
import CampaignBanner from "../CampaignBanner";

describe('campaign banner', () => {
    it('renders the campaign title and summary based on props', () => {
        render(
            <CampaignBanner 
                name={testCampaign.name} 
                summary={testCampaign.summary} 
            />
        );
        
        expect(screen.queryByRole('heading').textContent).toBe(testCampaign.name);
        expect(screen.getByText(testCampaign.summary)).toBeInTheDocument();
    });
})