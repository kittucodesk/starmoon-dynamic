"use client"

import React, { useState, useEffect, useRef } from "react"
import { useTheme } from "next-themes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Bell,
  ShoppingCart,
  Menu,
  X,
  Monitor,
  Briefcase,
  Zap,
  MessageSquare,
  TrendingUp,
  BarChart,
  Code,
  Megaphone,
  Calculator,
  GraduationCap,
  Phone,
  Ticket,
  MessageSquareQuote,
  HelpCircle,
  ChevronRight,
  Sun,
  Moon,
  LogOut,
  User,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn, authUtils, type StoredUserData } from "@/lib/utils"
import { type HeaderMenuItem } from "@/lib/api"
import { useRouter } from "next/navigation"
import { useAppSelector, useAppDispatch } from "@/lib/store/hooks"
import { logout, loginSuccess } from "@/lib/store/slices/authSlice"
import { toggleCart } from "@/lib/store/slices/cartSlice"
import { CartDrawer } from "@/components/cart/cart-drawer"

interface SiteHeaderProps {
  showSearch?: boolean
  menuData?: HeaderMenuItem[]
}

interface MenuItem {
  label: string
  href: string
  icon?: React.ReactElement
  isHighlight?: boolean
  description?: string
  image?: string
  subCategories?: {
    title: string
    items: { label: string; href: string }[]
  }[]
  featuredProducts?: {
    title: string
    image: string
    price: string
    href: string
    discount?: string
  }[]
}

interface MenuSection {
  title: string
  icon: React.ReactElement
  items: MenuItem[]
  bannerImage?: string
  bannerTitle?: string
  bannerDescription?: string
}

export function SiteHeader({
  showSearch = false,
  menuData = [],
}: SiteHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const mobileSearchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Redux state
  const dispatch = useAppDispatch();
  const { isAuthenticated: isLoggedIn, user: userData } = useAppSelector(state => state.auth);
  const { totalItems: cartItemCount, isOpen: cartIsOpen } = useAppSelector(state => state.cart);

  console.log("🔍 Auth State Debug:", {
    isLoggedIn,
    userData,
    hasUserData: !!userData,
    userName: userData?.name,
    userEmail: userData?.email
  });

  // Check localStorage directly
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUserData = localStorage.getItem('user_data');
      const storedToken = localStorage.getItem('auth_token');
      console.log("🗄️ Direct localStorage check:", {
        storedUserData: storedUserData ? JSON.parse(storedUserData) : null,
        storedToken,
        allLocalStorageKeys: Object.keys(localStorage)
      });
    }
  }, []);

  // Theme toggle state
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // After hydration, mark as mounted so we can read the current theme
    setMounted(true);
  }, []);

  // Get user initials from Redux state
  const getUserInitials = () => {
    if (userData?.name) {
      return userData.name
        .split(' ')
        .map(name => name.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return "U";
  };

  // Handle logout using Redux
  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
  };

  // Handle cart toggle
  const handleCartToggle = () => {
    dispatch(toggleCart());
  };

  // Temporary test function
  const testUserData = () => {
    dispatch(loginSuccess({
      user: {
        id: 999,
        name: "Test User",
        email: "test@example.com",
        user_type: "CUSTOMER"
      },
      token: "test_token"
    }));
  };

  // Handle click outside to close search overlay
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isOutsideDesktop = searchRef.current && !searchRef.current.contains(target);
      const isOutsideMobile = mobileSearchRef.current && !mobileSearchRef.current.contains(target);

      if (isOutsideDesktop && isOutsideMobile) {
        setShowSearchOverlay(false);
      }
    };

    if (showSearchOverlay) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showSearchOverlay]);

  // Icon mapping for dynamic icons
  const getIconComponent = (iconName: string) => {
    const iconMap: { [key: string]: React.ReactElement } = {
      Monitor: <Monitor className="h-5 w-5" />,
      Briefcase: <Briefcase className="h-4 w-4" />,
      Zap: <Zap className="h-4 w-4" />,
      MessageSquare: <MessageSquare className="h-4 w-4" />,
      TrendingUp: <TrendingUp className="h-5 w-5" />,
      BarChart: <BarChart className="h-4 w-4" />,
      Code: <Code className="h-4 w-4" />,
      Megaphone: <Megaphone className="h-4 w-4" />,
      Calculator: <Calculator className="h-4 w-4" />,
      GraduationCap: <GraduationCap className="h-4 w-4" />,
      // Add more icons as needed
    };
    return iconMap[iconName] || <Monitor className="h-5 w-5" />;
  };

  // Transform API data to component format
  const transformMenuData = (apiData: HeaderMenuItem[]): MenuSection[] => {
    return apiData
      .filter(menu => menu.is_active)
      .sort((a, b) => b.sort_order - a.sort_order)
      .map(menu => ({
        title: menu.title,
        icon: getIconComponent(menu.icon),
        bannerImage: menu.bannerImage,
        bannerTitle: menu.bannerTitle,
        bannerDescription: menu.bannerDescription,
        items: menu.items.map(item => ({
          label: item.label,
          href: item.href,
          icon: getIconComponent(item.icon),
          subCategories: item.subCategories.map(subCat => ({
            title: subCat.title,
            items: subCat.items.map(subItem => ({
              label: subItem.label,
              href: subItem.href,
            })),
          })),
        })),
      }));
  };

  // Use API data if available, otherwise fallback to default
  const headerMenu: MenuSection[] = menuData.length > 0 ? transformMenuData(menuData) : [
    {
      title: "Products",
      icon: <Monitor className="h-5 w-5" />,
      bannerImage: "/Banner/products-banner.jpg",
      bannerTitle: "Explore Our Products",
      bannerDescription: "Discover top-rated business solutions",
      items: [
        {
          label: "Business Software",
          href: "/products?category=business",
          icon: <Briefcase className="h-4 w-4" />,
          subCategories: [
            {
              title: "CRM & Sales",
              items: [
                { label: "Bitrix24", href: "/products/Bitrix24" },
                { label: "Sales Management", href: "/products/1" },
                { label: "Customer Support", href: "/products/1" },
              ],
            },
          ],
        },
      ],
    },
  ];

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 dark:from-slate-800/50 dark:via-slate-700/50 dark:to-slate-800/50 border-b border-primary/10 dark:border-slate-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-2">
            {/* Left: Contact Info */}
            <div className="flex items-center justify-center md:justify-start space-x-4 md:space-x-6">
              <div className="flex items-center text-primary">
                <Phone className="h-4 w-4 mr-2" />
                <span className="font-medium text-sm md:text-base text-nowrap whitespace-nowrap">+1 (555) 123-4567</span>
              </div>
              <div className="hidden md:block h-4 w-px bg-primary/20"></div>
              <a
                href="mailto:support@starmoon.com"
                className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors text-sm md:text-base"
              >
                support@starmoon.com
              </a>
            </div>

            {/* Center: Quick Links */}
            <div className="hidden md:flex items-center justify-center space-x-6">
              <Link
                href="/support/tickets"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary transition-colors group"
              >
                <div className="relative">
                  <Ticket className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full"></span>
                </div>
                <span>Support Center</span>
              </Link>
              <div className="h-4 w-px bg-primary/20"></div>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-gray-600 dark:text-gray-300 hover:text-green-600 transition-colors group"
              >
                <MessageSquareQuote className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform" />
                <span>Live Chat</span>
              </a>
            </div>

            {/* Right: Top Links */}
            <div className="hidden md:flex items-center justify-end space-x-6 text-sm">
              <Link href="/terms" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                Terms
              </Link>
              <div className="h-4 w-px bg-primary/20"></div>
              <Link href="/privacy" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                Privacy
              </Link>
              <div className="h-4 w-px bg-primary/20"></div>
              <Link href="/contact" className="text-gray-600 dark:text-gray-300 hover:text-primary transition-colors">
                Contact
              </Link>
              <div className="h-4 w-px bg-primary/20"></div>
              {/* Theme Toggle */}
              {mounted && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full"
                >
                  {theme === "dark" ? <Sun className="h-5 w-5 text-yellow-500" /> : <Moon className="h-5 w-5 text-gray-700" />}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm border-b border-gray-200 dark:border-slate-700">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Left: Logo */}
            <Link href="/" className="flex items-center">
              <img
                src="/Company_Logo.png"
                alt="Starmoon Logo"
                className="h-12 w-auto min-w-[120px] dark:brightness-0 dark:invert transition-all duration-300"
              />
            </Link>

            {/* Center: Navigation Menu */}
            <div className="hidden lg:flex items-center space-x-4">
              <NavigationMenu>
                <NavigationMenuList className="flex items-center gap-2 xl:gap-3">
                  {headerMenu.map((menu) => (
                    <NavigationMenuItem key={menu.title}>
                      {/* If menu has no items or items is empty, render as direct link */}
                      {!menu.items || menu.items.length === 0 ? (
                        <Link
                          href={`/${menu.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="inline-flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2 xl:py-2.5 min-w-[160px] xl:min-w-[180px] rounded-lg bg-gray-50/80 dark:bg-slate-800/80 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 text-gray-800 dark:text-gray-200 font-medium group transition-colors"
                        >
                          <div className="flex items-center justify-center h-7 w-7 xl:h-8 xl:w-8 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                            <div className="h-4 w-4 xl:h-4.5 xl:w-4.5 text-primary">{menu.icon}</div>
                          </div>
                          <span className="font-medium text-gray-800 dark:text-gray-200 text-sm xl:text-base">{menu.title}</span>
                        </Link>
                      ) : (
                        <>
                          <NavigationMenuTrigger
                            className="bg-gray-50/80 dark:bg-slate-800/80 data-[state=open]:bg-gray-100/80 dark:data-[state=open]:bg-slate-700/80 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 rounded-lg px-3 xl:px-4 py-2 xl:py-2.5 min-w-[160px] xl:min-w-[180px] group"
                          >
                            <span className="flex items-center gap-2 xl:gap-3">
                              <div className="flex items-center justify-center h-7 w-7 xl:h-8 xl:w-8 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                                <div className="h-4 w-4 xl:h-4.5 xl:w-4.5 text-primary">{menu.icon}</div>
                              </div>
                              <span className="font-medium text-gray-800 dark:text-gray-200 text-sm xl:text-base">{menu.title}</span>
                            </span>
                          </NavigationMenuTrigger>
                          <NavigationMenuContent>
                            <div className="w-[90vw] max-w-[1200px] p-4 xl:p-8">
                              <div className="grid grid-cols-12 gap-4 xl:gap-8">
                                {/* Categories */}
                                <div className="col-span-12 lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                  {menu.items.map((item) => (
                                    <div key={item.label} className="space-y-3">
                                      <Link
                                        href={item.href}
                                        className="group flex items-center justify-center gap-3 p-2 rounded-xl hover:bg-primary/5 dark:hover:bg-slate-700/50 transition-colors"
                                      >
                                        {item.icon && (
                                          <div className="flex items-center justify-center h-8 w-8 rounded-xl bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30 transition-colors">
                                            <div className="h-6 w-6 mx-auto flex items-center justify-center text-primary">
                                              {item.icon}
                                            </div>
                                          </div>
                                        )}
                                        <span className="text-base font-semibold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors">
                                          {item.label}
                                        </span>
                                        <ChevronRight className="h-5 w-5 ml-auto text-gray-400 group-hover:text-primary transition-colors" />
                                      </Link>
                                      {item.subCategories?.map((subCat, idx) => (
                                        <div key={subCat.title} className="pl-13">
                                          {idx > 0 && <div className="my-4 border-t border-gray-200 dark:border-slate-600"></div>}
                                          <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 pl-3">
                                            {subCat.title}
                                          </div>
                                          <ul className="space-y-2.5 pl-3">
                                            {subCat.items.map((subItem) => (
                                              <li key={subItem.label}>
                                                <Link
                                                  href={subItem.href}
                                                  className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary hover:underline flex items-center group"
                                                >
                                                  <span className="relative">
                                                    <span className="absolute -left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                      •
                                                    </span>
                                                    {subItem.label}
                                                  </span>
                                                </Link>
                                              </li>
                                            ))}
                                          </ul>
                                        </div>
                                      ))}
                                    </div>
                                  ))}
                                </div>

                                {/* Featured Section */}
                                <div className="col-span-4 space-y-8">
                                  {menu.bannerImage && (
                                    <div className="relative h-48 rounded-2xl overflow-hidden">
                                      <Image
                                        src={menu.bannerImage}
                                        alt={menu.title}
                                        fill
                                        className="object-cover"
                                      />
                                      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/40 dark:from-slate-900/90 dark:to-slate-800/40" />
                                      <div className="absolute bottom-0 left-0 p-6 text-white">
                                        <h3 className="font-bold text-2xl mb-2">{menu.bannerTitle}</h3>
                                        <p className="text-white/90 text-sm leading-relaxed">
                                          {menu.bannerDescription}
                                        </p>
                                      </div>
                                    </div>
                                  )}

                                  {/* Featured Products */}
                                  {/* <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6">
                                <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 text-lg">
                                  Featured Products
                                </h4>
                                <div className="space-y-4">
                                  {menu.items.map((item) =>
                                    item.featuredProducts?.map((product) => (
                                      <Link key={product.title} href={product.href}>
                                        <div className="group flex items-center gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-slate-700 transition-colors">
                                          <div className="relative w-24 h-24 bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm">
                                            <Image
                                              src={product.image}
                                              alt={product.title}
                                              fill
                                              className="object-cover group-hover:scale-105 transition-transform"
                                            />
                                            {product.discount && (
                                              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                                                {product.discount}
                                              </div>
                                            )}
                                          </div>
                                          <div className="flex-1 min-w-0">
                                            <h4 className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors truncate">
                                              {product.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1">
                                              <span className="text-primary font-semibold">
                                                {product.price}
                                              </span>
                                              {product.discount && (
                                                <Badge
                                                  variant="secondary"
                                                  className="bg-green-100 text-green-800"
                                                >
                                                  Save {product.discount}
                                                </Badge>
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </Link>
                                    ))
                                  )}
                                </div>
                              </div> */}
                                </div>
                              </div>
                            </div>
                          </NavigationMenuContent>
                        </>
                      )}
                    </NavigationMenuItem>
                  ))}

                  {/* <NavigationMenuItem>
                    <Link
                      href="/consultation"
                      className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-gray-50/80 dark:bg-slate-800/80 hover:bg-gray-100/80 dark:hover:bg-slate-700/80 text-gray-800 dark:text-gray-200 font-medium group"
                    >
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-white dark:bg-slate-900 shadow-sm">
                        <HelpCircle className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <span>Consultation</span>
                    </Link>
                  </NavigationMenuItem> */}
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Right: Search, Theme Toggle, Auth & Cart */}
            <div className="flex items-center space-x-2 md:space-x-5">
              {/* Search Bar */}
              <div ref={searchRef} className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products and services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onFocus={() => setShowSearchOverlay(true)}
                  className="pl-10 w-[200px] xl:w-[300px] bg-gray-50/80 dark:bg-slate-800/80 border focus:ring-2 ring-primary/20 rounded-full"
                />
                {showSearchOverlay && (
                  <div className="absolute top-full right-0 w-[300px] lg:w-[400px] mt-1 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 p-4">
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        Popular Searches
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {[
                          "CRM Software",
                          "Web Development",
                          "Digital Marketing",
                          "Business Automation",
                        ].map((term) => (
                          <Button
                            key={term}
                            variant="outline"
                            size="sm"
                            className="rounded-full text-xs"
                            onClick={() => setSearchTerm(term)}
                          >
                            {term}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                        Trending Products
                      </h4>
                      <div className="space-y-2">
                        {headerMenu[0].items.slice(0, 3).map((item) =>
                          item.featuredProducts?.[0] ? (
                            <Link
                              key={item.label}
                              href={item.featuredProducts[0].href}
                            >
                              <div className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-lg group">
                                <div className="relative w-12 h-12 bg-gray-100 dark:bg-slate-700 rounded-md overflow-hidden">
                                  <Image
                                    src={item.featuredProducts[0].image}
                                    alt={item.featuredProducts[0].title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <div>
                                  <h5 className="font-medium group-hover:text-primary transition-colors">
                                    {item.featuredProducts[0].title}
                                  </h5>
                                  <p className="text-sm text-gray-600 dark:text-gray-300">
                                    {item.featuredProducts[0].price}
                                  </p>
                                </div>
                              </div>
                            </Link>
                          ) : null
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setShowSearchOverlay(!showSearchOverlay)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={handleCartToggle}
                className="relative bg-primary/5 dark:bg-primary/10 hover:bg-primary/10 dark:hover:bg-primary/20 rounded-full transition-colors duration-200"
              >
                <ShoppingCart className="h-5 w-5 text-primary" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-primary dark:bg-none text-white text-xs font-medium rounded-full flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-slate-900">
                    {cartItemCount}
                  </span>
                )}
              </Button>

              {isLoggedIn ? (
                <>
                  {/* <Button
                    variant="ghost"
                    size="icon"
                    className="relative hover:bg-gray-100 dark:hover:bg-slate-700 rounded-full hidden md:flex"
                  >
                    <Bell className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                    <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center shadow-sm ring-2 ring-white dark:ring-slate-900">
                      2
                    </span>
                  </Button> */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8 md:h-9 md:w-9 ring-2 ring-primary/10 flex items-center justify-center">
                          {/* <AvatarImage
                            src="/placeholder.svg?height=32&width=32"
                            alt="User"
                          /> */}
                          {getUserInitials()}
                          {/* <AvatarFallback className="bg-primary text-primary">
                            {getUserInitials()}
                          </AvatarFallback> */}
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="center" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {userData?.name || 'User'}
                          </p>
                          <p className="text-xs leading-none text-muted-foreground">
                            {userData?.email || 'user@example.com'}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {/* <DropdownMenuItem asChild>
                        <Link href="/dashboard/customer" className="flex items-center">
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                      </DropdownMenuItem> */}
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard/customer" className="flex items-center">
                          <Monitor className="mr-2 h-4 w-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="text-red-600 dark:text-red-400 cursor-pointer"
                        onClick={handleLogout}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <div className="hidden md:flex items-center space-x-3">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-primary/5 dark:hover:bg-slate-700 rounded-full px-4 lg:px-6"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button className="rounded-full px-4 lg:px-6">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setMobileMenuOpen((prev) => !prev)}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search & Menu */}
          {showSearchOverlay && (
            <div ref={mobileSearchRef} className="md:hidden mt-4 p-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search products and services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full bg-gray-50 dark:bg-slate-700 border-0 focus:ring-2 ring-primary/20"
                />
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2">
                  Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["CRM Software", "Web Development", "Digital Marketing"].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      className="rounded-full text-xs"
                      onClick={() => setSearchTerm(term)}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-gray-200 dark:border-slate-700 overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-slate-700">
                {headerMenu.map((menu) => (
                  <div key={menu.title} className="p-4">
                    <div className="flex items-center gap-3 font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary/10 dark:bg-primary/20">
                        <div className="h-5 w-5 text-primary">{menu.icon}</div>
                      </div>
                      <span className="text-base">{menu.title}</span>
                    </div>
                    <div className="space-y-4">
                      {menu.items.map((item) => (
                        <div key={item.label}>
                          <Link
                            href={item.href}
                            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-primary/5 dark:hover:bg-slate-700"
                          >
                            {item.icon && (
                              <div className="flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 dark:bg-primary/20 group-hover:bg-primary/20 dark:group-hover:bg-primary/30">
                                <div className="h-4 w-4 text-primary">{item.icon}</div>
                              </div>
                            )}
                            <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary text-sm">
                              {item.label}
                            </span>
                            <ChevronRight className="h-4 w-4 ml-auto text-gray-400 group-hover:text-primary" />
                          </Link>
                          {item.subCategories?.map((subCat, idx) => (
                            <div key={subCat.title} className="mt-2 ml-9">
                              {idx > 0 && <div className="my-2 border-t border-gray-200 dark:border-slate-600"></div>}
                              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-2">
                                {subCat.title}
                              </div>
                              <ul className="space-y-1.5">
                                {subCat.items.map((subItem) => (
                                  <li key={subItem.label}>
                                    <Link
                                      href={subItem.href}
                                      className="text-sm text-gray-600 dark:text-gray-300 hover:text-primary group flex items-center"
                                    >
                                      <span className="relative">
                                        <span className="absolute -left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                          •
                                        </span>
                                        {subItem.label}
                                      </span>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="p-4">
                  <Link href="/consultation" className="flex items-center gap-2 text-primary font-semibold">
                    <HelpCircle className="h-5 w-5" />
                    Consultation
                  </Link>
                </div>

                {!isLoggedIn && (
                  <div className="p-4 bg-gray-50 dark:bg-slate-800 space-y-3">
                    <Link href="/login">
                      <Button variant="outline" className="w-full rounded-full">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/signup">
                      <Button className="w-full rounded-full">Get Started</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer />
    </>
  )
}
