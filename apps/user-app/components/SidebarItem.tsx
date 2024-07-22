"use client"

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

interface SidebarItemProps {
  href: string;
  title: string;
  icon: React.ReactNode;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({ href, title, icon }) => {
  const router = useRouter();
  const pathname = usePathname();
  const selected = pathname === href;

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      router.push(href);
    }
  };

  return (
    <Link
      href={href}
      className={`
        flex items-center px-4 py-3 my-1 rounded-lg transition-colors duration-200 ease-in-out
        ${selected
          ? "bg-purple-100 text-purple-700"
          : "text-slate-600 hover:bg-purple-50 hover:text-purple-600"
        }
      `}
    >
      <div
        className="flex items-center w-full outline-none"
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
      >
        <div className="mr-3 text-xl">
          {React.cloneElement(icon as React.ReactElement, {
            className: selected ? "text-purple-700" : "text-slate-600"
          })}
        </div>
        <div className={`font-medium ${selected ? "text-purple-700" : "text-slate-600"}`}>
          {title}
        </div>
      </div>
    </Link>
  );
};