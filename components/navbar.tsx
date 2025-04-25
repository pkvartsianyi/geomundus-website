"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { LuMenu, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";

interface SiteSettings {
  logo: any;
  title: string;
}

interface NavbarProps {
  siteSettings: SiteSettings | null;
}

export default function Navbar({ siteSettings }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
      }`}
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
            <NavLink href="/#sponsors" isScrolled={isScrolled}>
              Sponsors
            </NavLink>
            <NavLink href="/#tour" isScrolled={isScrolled}>
              Preconference
            </NavLink>
            <NavLink href="/#contact" isScrolled={isScrolled}>
              Contact
            </NavLink>
            <Button
              asChild
              className={
                isScrolled ? "bg-emerald-700 hover:bg-emerald-800" : "bg-white text-emerald-800 hover:bg-gray-100"
              }
            >
              <Link href="/registration">Register</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? (
              <LuX className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
            ) : (
              <LuMenu className={`h-6 w-6 ${isScrolled ? "text-gray-800" : "text-white"}`} />
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
            <MobileNavLink href="/#sponsors" onClick={toggleMenu}>
              Sponsors
            </MobileNavLink>
            <MobileNavLink href="/#tour" onClick={toggleMenu}>
              Preconference
            </MobileNavLink>
            <MobileNavLink href="/#contact" onClick={toggleMenu}>
              Contact
            </MobileNavLink>
            <Button asChild className="w-full bg-emerald-700 hover:bg-emerald-800">
              <Link href="/registration" onClick={toggleMenu}>
                Register
              </Link>
            </Button>
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
      }`}
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
