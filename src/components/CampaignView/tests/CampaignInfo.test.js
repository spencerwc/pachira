import React from "react";
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testCampaign } from "../../../utils/testCampaign";
import CampaignInfo from "../CampaignInfo";

const supportersLength = Object.keys(testCampaign.supporters).length.toLocaleString();

describe('campaign details', () => {
    it('renders the campaign supporter, follower, and post count', () => {
        render(
            <CampaignInfo 
                supporters={testCampaign.supporters} 
                followers={testCampaign.followers}
            />
        );
        
        expect(screen.getByText(`${supportersLength} supporters`)).toBeInTheDocument();
        expect(screen.getByText(`${testCampaign.followers.length.toLocaleString()} followers`)).toBeInTheDocument();
    });
    
    it('renders proper descriptors when count is exactly 1', () => {
        render(
            <CampaignInfo 
                supporters={[""]} 
                followers={[""]}
            />
        );

        expect(screen.getByText('1 supporter')).toBeInTheDocument();
        expect(screen.getByText('1 follower')).toBeInTheDocument();
    });

    it('renders proper descriptors when count is > 1', () => {
        render(
            <CampaignInfo 
                supporters={["", ""]} 
                followers={["", ""]}
            />
        );

        expect(screen.getByText('2 supporters')).toBeInTheDocument();
        expect(screen.getByText('2 followers')).toBeInTheDocument();
    })
})