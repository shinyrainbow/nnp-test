'use client'

import { Bell, LogOut, Plus, Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { LanguageSwitcher } from './language-switcher'
import { useClerk, useUser } from '@clerk/nextjs'
import { SignOutButton } from '@clerk/nextjs'
// import { DropdownMenu } from './ui/dropdown-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useLanguage } from '@/contexts/language-context'
import Link from 'next/link'

export function DashboardHeader() {
  const { isLoaded, isSignedIn, user } = useUser();
  const { t } = useLanguage()
  const { signOut } = useClerk()

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      <div className="flex items-center space-x-4 flex-1">
        <div className="relative max-w-md w-full">
          {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search properties, clients, contracts..."
            className="pl-10"
          /> */}
        </div>
      </div>
      <LanguageSwitcher />
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        {/* {isSignedIn ? (
        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
          U
        </div> */}

{isSignedIn && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    {user?.firstName || user?.emailAddresses[0]?.emailAddress}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <Plus className="h-4 w-4 mr-2" />
                      {t("dashboard")} 
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {t("signOut")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
)
}
      </div>
    </header>
  )
}
