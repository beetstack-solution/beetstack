"use client";

import { Icons } from "@beetstack/icons";
import { Button } from "@repo/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@repo/ui/card";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background text-foreground p-8 font-[family-name:var(--font-geist-sans)]">
      <header className="mb-12 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Beetstack UI</h1>
          <p className="text-muted-foreground mt-2">Centralized Icons & Tailwind Components</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Icons.Sun className="h-5 w-5" /> : <Icons.Moon className="h-5 w-5" />}
        </Button>
      </header>

      <main className="grid gap-8 md:grid-cols-2">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Buttons</h2>
          <Card>
            <CardHeader>
              <CardTitle>Button Variants</CardTitle>
              <CardDescription>Support for light and dark modes with Tailwind utility classes.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>Default</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Icons.Plus className="mr-2 h-4 w-4" /> Add Item
              </Button>
            </CardFooter>
          </Card>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Centralized Icons</h2>
          <Card>
            <CardHeader>
              <CardTitle>@beetstack/icons</CardTitle>
              <CardDescription>Commonly used icons from react-icons/hi.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-5 gap-8 place-items-center">
              <Icons.Home className="h-6 w-6" />
              <Icons.User className="h-6 w-6" />
              <Icons.Settings className="h-6 w-6" />
              <Icons.Bell className="h-6 w-6" />
              <Icons.Heart className="h-6 w-6 text-red-500" />
              <Icons.Mail className="h-6 w-6" />
              <Icons.Search className="h-6 w-6" />
              <Icons.Plus className="h-6 w-6" />
              <Icons.Check className="h-6 w-6 text-green-500" />
              <Icons.Logout className="h-6 w-6" />
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
