import React, { useState } from 'react';
import { brandData } from '../data/mockData';
import BrandHeroMobile from './mobile/BrandHeroMobile';
import BrandHeroDesktop from './desktop/BrandHeroDesktop';
export default function BrandHero({ isMobileFrame }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(brandData.followers);
  const toggleFollow = () => { setIsFollowing((previous) => !previous); setFollowerCount((previous) => previous + (isFollowing ? -1 : 1)); };
  const formattedCount = isFollowing ? `${(followerCount / 1000).toFixed(1)}k` : brandData.formattedFollowers;
  const props = { isFollowing, formattedCount, onToggleFollow: toggleFollow };
  return isMobileFrame ? <BrandHeroMobile {...props} /> : <BrandHeroDesktop {...props} />;
}
