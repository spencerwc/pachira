import React from "react";
import {render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { testCampaign } from "../../../utils/testCampaign";
import CampaignInfo from "../CampaignInfo";


describe('campaign banner', () => {
    it('renders the campaign supporter, follower, and post count', () => {
        render(
            <CampaignInfo 
                supporters={testCampaign.supporters} 
                followers={testCampaign.followers}
                posts={testCampaign.posts}
            />
        );
        
        expect(screen.getByText(`${testCampaign.supporters.length.toLocaleString()}`)).toBeInTheDocument();
        expect(screen.getByText(`${testCampaign.followers.length.toLocaleString()}`)).toBeInTheDocument();
        expect(screen.getByText(`${testCampaign.posts.length.toLocaleString()}`)).toBeInTheDocument();
    });
    
    it('renders proper descriptors when count is exactly 1', () => {
        render(
            <CampaignInfo 
                supporters={[""]} 
                followers={[""]}
                posts={[""]}
            />
        );

        expect(screen.getByText('supporter')).toBeInTheDocument();
        expect(screen.getByText('follower')).toBeInTheDocument();
        expect(screen.getByText('post')).toBeInTheDocument();
    });

    it('renders proper descriptors when count is > 1', () => {
        render(
            <CampaignInfo 
                supporters={["", ""]} 
                followers={["", ""]}
                posts={["", "", ""]}
            />
        );

        expect(screen.getByText('supporters')).toBeInTheDocument();
        expect(screen.getByText('followers')).toBeInTheDocument();
        expect(screen.getByText('posts')).toBeInTheDocument();
    })
})