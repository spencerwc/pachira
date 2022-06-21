import React from "react";
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testCampaign } from "../../../utils/testCampaign";
import CampaignGoal from '../CampaignGoal';

describe('campaign donation goal', () => {
    it('includes the goal name and description', () => {
        render(
            <CampaignGoal goal={testCampaign.goal} />
        );
        
        expect(screen.getByText(testCampaign.goal.name)).toBeInTheDocument();
        expect(screen.getByText(testCampaign.goal.description)).toBeInTheDocument();
    });

    it('displays the donation progress towards the goal', () => {
        render(
            <CampaignGoal goal={testCampaign.goal} />
        );

        expect(screen.getByText(`${testCampaign.goal.currentFunding / testCampaign.goal.targetFunding * 100}% of $${testCampaign.goal.targetFunding.toLocaleString()}`)).toBeInTheDocument();
    });

    it('renders donation button on mobile screens', () => {
        render(
            <CampaignGoal goal={testCampaign.goal} />
        );

        expect(screen.queryByRole('button')).toBeVisible();
    });

});