'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Home, FileText, Users, Calculator, MessageSquare, BarChart3, Calendar, MapPin, Settings, TrendingUp, DollarSign, TableProperties, MessageSquareText, Newspaper } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useLanguage } from '@/contexts/language-context'
import { languages } from '@/lib/i18n'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: Home, language: 'menu.dashboard' },
  { name: 'Listings', href: '/dashboard/listings', icon: TableProperties , language: 'menu.propertyListings'},
  { name: 'Line Chat Bot', href: '/dashboard/line-chat-bot', icon: MessageSquare , language: 'menu.lineChatBot'},
  { name: 'Post Builder', href: '/dashboard/post-builder', icon: MessageSquareText , language: 'menu.postBuilder'},
  { name: 'Contract Builder', href: '/dashboard/contract-builder?tab=rent', icon: Newspaper , language: 'menu.contractBuilder'},
  { name: 'Calendar', href: '/dashboard/calendar', icon: Calendar, language: 'menu.calendar' },
 
  // { name: 'AI Assistant', href: '/dashboard/ai-assistant', icon: MessageSquare , language: 'aiAssistant'},
  // { name: 'Commission Track', href: '/dashboard/commission', icon: DollarSign, language: 'commissionTracker' },
  // { name: 'Price Calculator', href: '/dashboard/calculator', icon: Calculator, language: 'propertyListings' },
  // { name: 'Market Analysis', href: '/dashboard/market', icon: TrendingUp, language: 'marketInsights' },
  // { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3, language: 'analytics' },
  // { name: 'Settings', href: '/dashboard/settings', icon: Settings , language: 'analytics'},
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { t } = useLanguage()

  return (
    <Sidebar>
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2 p-2">
          <Building2 className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold text-primary">Naina Hub</span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{t(`${item.language}`)}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
