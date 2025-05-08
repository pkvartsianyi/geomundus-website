"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMenu, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

interface SiteSettings {
  logo: any;
  title: string;
  registrationOpen?: boolean;
  banner?: {
    enabled: boolean;
  };
}

interface NavbarProps {
  siteSettings: SiteSettings | null;
}

export default function Navbar({ siteSettings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hasBanner = siteSettings?.banner?.enabled || false;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      } ${hasBanner ? "top-[46px] sm:top-[42px]" : "top-0"}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            {siteSettings && siteSettings.logo ? (
              <Image
                src={siteSettings.logo || "/images/white-logo.png"}
                alt={siteSettings?.title || "GeoMundus Logo"}
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            ) : (
              <Image
                src={"/images/white-logo.png"}
                alt={"GeoMundus Logo"}
                width={150}
                height={50}
                className="h-10 w-auto"
              />
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink href="/#info" isScrolled={isScrolled}>
              About
            </NavLink>
            <NavLink href="/#speakers" isScrolled={isScrolled}>
              Speakers
            </NavLink>
            <NavLink href="/sponsors" isScrolled={isScrolled}>
              Sponsors
            </NavLink>
            <NavLink href="/submissions" isScrolled={isScrolled}>
              Submissions
            </NavLink>

            {/* Archive Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`font-medium hover:text-emerald-700 transition-colors flex items-center gap-1 ${
                    isScrolled ? "text-gray-800" : "text-white"
                  } px-3 py-2 rounded-md hover:bg-white/10`}
                >
                  Archive <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href="/archive">All Past Conferences</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/2023">2023 Conference</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/2022">2022 Conference</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/#contact" isScrolled={isScrolled}>
              Contact
            </NavLink>

            {siteSettings?.registrationOpen ? (
              <Button
                asChild
                className={
                  isScrolled
                    ? "bg-emerald-700 hover:bg-emerald-800"
                    : "bg-white text-emerald-800 hover:bg-gray-100"
                }
              >
                <Link href="/registration">Register</Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className={
                  isScrolled
                    ? "border-emerald-700 text-emerald-700 hover:bg-emerald-50"
                    : "border-white text-white hover:bg-white/10"
                }
              >
                <Link href="/registration">Registration Coming Soon</Link>
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isOpen ? (
              <LuX
                className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`}
              />
            ) : (
              <LuMenu
                className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`}
              />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <MobileNavLink href="/#info" onClick={toggleMenu}>
              About
            </MobileNavLink>
            <MobileNavLink href="/#speakers" onClick={toggleMenu}>
              Speakers
            </MobileNavLink>
            <MobileNavLink href="/sponsors" onClick={toggleMenu}>
              Sponsors
            </MobileNavLink>
            <MobileNavLink href="/submissions" onClick={toggleMenu}>
              Submissions
            </MobileNavLink>
            <MobileNavLink href="/archive" onClick={toggleMenu}>
              Archive
            </MobileNavLink>
            <MobileNavLink href="/#contact" onClick={toggleMenu}>
              Contact
            </MobileNavLink>

            {siteSettings?.registrationOpen ? (
              <Button
                asChild
                className="w-full bg-emerald-700 hover:bg-emerald-800"
              >
                <Link href="/registration" onClick={toggleMenu}>
                  Register
                </Link>
              </Button>
            ) : (
              <Button
                asChild
                variant="outline"
                className="w-full border-emerald-700 text-emerald-700"
              >
                <Link href="/registration" onClick={toggleMenu}>
                  Registration Coming Soon
                </Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  isScrolled: boolean;
}

function NavLink({ href, children, isScrolled }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`font-medium hover:text-emerald-700 transition-colors ${
        isScrolled ? "text-gray-800" : "text-white"
      } px-3 py-2 rounded-md hover:bg-white/10`}
    >
      {children}
    </Link>
  );
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}

function MobileNavLink({ href, children, onClick }: MobileNavLinkProps) {
  return (
    <Link
      href={href}
      className="block py-2 text-gray-800 font-medium hover:text-emerald-700 transition-colors"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
