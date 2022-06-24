import React from "react";
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testCampaign } from "../../../utils/testCampaign";
import CampaignDonations from "../CampaignDonations";

describe('campaign recent donations', () => {
    it('renders donator name and amount', () => {
        render(
            <CampaignDonations donations={testCampaign.donations} />
        );
        
        expect(screen.getByText(testCampaign.donations[0].name)).toBeInTheDocument();
        expect(screen.getByText(`$${testCampaign.donations[1].donationAmount.toLocaleString()}`)).toBeInTheDocument();
    });

    it('renders donation date', () => {
        const date = new Date(testCampaign.donations[0].date.seconds * 1000).toLocaleDateString();

        render(
            <CampaignDonations donations={testCampaign.donations} />
        );
        expect(screen.getAllByText(date)).toHaveLength(2); // There are two donations with the same date
    });
})