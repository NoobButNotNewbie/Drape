import React, { useState } from 'react';
import { brandData } from '../data/mockData';
import { Check, UserPlus } from 'lucide-react';

export default function BrandHero({ isMobileFrame }) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(brandData.followers);

  const toggleFollow = () => {
    if (isFollowing) {
      setIsFollowing(false);
      setFollowerCount((prev) => prev - 1);
    } else {
      setIsFollowing(true);
      setFollowerCount((prev) => prev + 1);
    }
  };

  const formattedCount = isFollowing
    ? `${(followerCount / 1000).toFixed(1)}k`
    : brandData.formattedFollowers;

  // Mobile layout matching screenshot 1
  if (isMobileFrame) {
    return (
      <section className="px-5 pt-8 pb-6 text-center border-b border-[#EFECE6] bg-[#FBFBFA]">
        {/* Monogram Box */}
        <div className="mx-auto w-20 h-20 rounded-2xl bg-[#F5F2EC] border border-[#E5E0D7] flex items-center justify-center shadow-xs mb-5">
          <span className="font-serif-luxury text-xl font-semibold text-[#1A3C24] tracking-wider">
            {brandData.monogram}
          </span>
        </div>

        {/* Brand Name */}
        <h2 className="font-serif-luxury text-3xl font-bold text-[#151816] tracking-tight mb-2">
          {brandData.name}
        </h2>

        {/* Short Bio */}
        <p className="font-serif-luxury italic text-xs text-[#6A675F] max-w-xs mx-auto leading-relaxed mb-6">
          {brandData.shortDescription}
        </p>

        {/* Metrics Row */}
        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="text-center">
            <div className="font-serif-luxury text-2xl font-bold text-[#151816]">
              {formattedCount}
            </div>
            <div className="text-[11px] text-[#78756E] font-medium tracking-wide">
              Followers
            </div>
          </div>

          <div className="w-[1px] h-8 bg-[#E3DFD7]"></div>

          <div className="text-center">
            <div className="font-serif-luxury text-2xl font-bold text-[#151816]">
              {brandData.outfitsCount}
            </div>
            <div className="text-[11px] text-[#78756E] font-medium tracking-wide">
              Outfits
            </div>
          </div>

          <div className="w-[1px] h-8 bg-[#E3DFD7]"></div>

          <div className="text-center">
            <div className="font-serif-luxury text-2xl font-bold text-[#1A3C24]">
              {brandData.confidenceScore}
            </div>
            <div className="text-[11px] text-[#78756E] font-medium tracking-wide">
              Confidence
            </div>
          </div>
        </div>

        {/* Follow Button */}
        <button
          onClick={toggleFollow}
          className={`w-full py-3 px-6 rounded-md font-medium text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center space-x-2 ${
            isFollowing
              ? 'bg-[#EAE6DF] text-[#1A3C24] hover:bg-[#E0DCD4]'
              : 'bg-[#183B22] text-white hover:bg-[#122E1A] shadow-sm'
          }`}
        >
          {isFollowing ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>Following</span>
            </>
          ) : (
            <span>Follow Brand</span>
          )}
        </button>
      </section>
    );
  }

  // Desktop layout matching screenshot 2
  return (
    <section className="border-b border-[#EAE6DF] bg-[#FBFBFA] pt-8 pb-9">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8">
          {/* Brand Monogram / Logo Box */}
          <div className="w-24 h-24 rounded-2xl bg-[#F5F2EC] border border-[#E5E0D7] flex items-center justify-center shrink-0 shadow-xs">
            <span className="font-serif-luxury text-sm font-semibold text-[#1A3C24] tracking-widest text-center px-2">
              Linen&Logic
            </span>
          </div>

          {/* Details & Stats */}
          <div className="flex-1">
            {/* Top row: Brand Name + Follow Button */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
              <h2 className="font-serif-luxury text-3xl sm:text-4xl font-bold text-[#151816] tracking-tight">
                {brandData.name}
              </h2>

              <button
                onClick={toggleFollow}
                className={`px-7 py-2.5 rounded-sm font-medium text-xs tracking-widest uppercase transition-all duration-200 flex items-center space-x-2 ${
                  isFollowing
                    ? 'bg-[#ECE8E1] text-[#1A3C24] hover:bg-[#E2DDD5] border border-[#D5CFC5]'
                    : 'bg-[#183B22] text-white hover:bg-[#122E1A] shadow-xs'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Following</span>
                  </>
                ) : (
                  <span>Follow Brand</span>
                )}
              </button>
            </div>

            {/* Editorial Bio */}
            <p className="text-xs sm:text-sm text-[#6A675F] max-w-3xl leading-relaxed mb-5 font-normal">
              {brandData.description}
            </p>

            {/* Metrics Row */}
            <div className="flex items-center space-x-6 sm:space-x-8 pt-1">
              <div>
                <div className="text-[10px] text-[#86837C] uppercase tracking-wider font-semibold mb-0.5">
                  Followers
                </div>
                <div className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#151816]">
                  {formattedCount}
                </div>
              </div>

              <div className="w-[1px] h-8 bg-[#E5E1D8]"></div>

              <div>
                <div className="text-[10px] text-[#86837C] uppercase tracking-wider font-semibold mb-0.5">
                  Outfits
                </div>
                <div className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#151816]">
                  {brandData.outfitsCount}
                </div>
              </div>

              <div className="w-[1px] h-8 bg-[#E5E1D8]"></div>

              <div>
                <div className="text-[10px] text-[#86837C] uppercase tracking-wider font-semibold mb-0.5">
                  Confidence
                </div>
                <div className="font-serif-luxury text-xl sm:text-2xl font-bold text-[#1A3C24]">
                  {brandData.confidenceScore}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
