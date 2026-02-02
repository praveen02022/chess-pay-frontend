// components/ui/tabs.tsx
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "@/lib/utils"

export const Tabs = TabsPrimitive.Root
export const TabsList = ({ className, ...props }: any) => (
  <TabsPrimitive.List
    className={cn(
      "flex border-b bg-muted rounded-md p-1",
      className
    )}
    {...props}
  />
)

export const TabsTrigger = ({ className, ...props }: any) => (
  <TabsPrimitive.Trigger
    className={cn(
      "px-4 py-2 text-sm font-medium data-[state=active]:bg-background data-[state=active]:shadow rounded-md",
      className
    )}
    {...props}
  />
)

export const TabsContent = ({ className, ...props }: any) => (
  <TabsPrimitive.Content className={cn("pt-6", className)} {...props} />
)
