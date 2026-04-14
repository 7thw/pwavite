import React from 'react';
import { cn } from '@/lib/utils';
import { HomeIcon, MediatationIcon, EnergyIcon, ProfileIcon } from './NavIcons';
import { AnimateIcon } from '@/components/animate-ui/icons/icon';
import { Moon } from '@/components/animate-ui/icons/moon';

interface FooterProps {
  tone?: 'light' | 'dark';
  showBackButton?: boolean;
  showProgressiveBlur?: boolean;
}

export function Footer({ tone = 'dark', className }: FooterProps & { className?: string }) {
  return (
    <div className={cn(
      "w-full max-w-md mx-auto rounded-[32px] p-2 flex items-center justify-around shadow-2xl backdrop-blur-xl border",
      tone === 'light' ? "bg-white/10 border-white/10" : "bg-black/40 border-white/5",
      className
    )}>
      <button className="p-4 text-white hover:bg-white/10 rounded-2xl transition-colors">
        <HomeIcon size={24} />
      </button>
      <button className="p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl transition-colors">
        <AnimateIcon animateOnTap>
          <Moon size={24} />
        </AnimateIcon>
      </button>
      <button className="p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl transition-colors">
        <MediatationIcon size={24} />
      </button>
      <button className="p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl transition-colors">
        <EnergyIcon size={24} />
      </button>
      <button className="p-4 text-white/40 hover:text-white hover:bg-white/10 rounded-2xl transition-colors">
        <ProfileIcon size={24} />
      </button>
    </div>
  );
}
