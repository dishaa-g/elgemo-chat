"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { ArrowRight, MessageSquare, Shield, Zap, Globe, Github } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.replace("/chat")
    }
  }, [user, loading, router])

  if (loading || user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm font-medium animate-pulse text-muted-foreground">Initializing...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <MessageSquare className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold tracking-tight">elgemo</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="#features" className="text-sm font-medium transition-colors hover:text-primary">
              Features
            </Link>
            <Link href="#about" className="text-sm font-medium transition-colors hover:text-primary">
              About
            </Link>
            <Link href="#pricing" className="text-sm font-medium transition-colors hover:text-primary">
              Pricing
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost" className="font-medium">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button className="font-medium">Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24 lg:pt-40 lg:pb-32">
          <div className="container relative z-10 mx-auto px-4 text-center sm:px-6">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium">
                <span className="mr-2 rounded-full bg-primary px-2 py-0.5 text-[10px] uppercase text-primary-foreground">
                  New
                </span>
                <span className="text-muted-foreground">Version 2.0 is now live</span>
                <ArrowRight className="ml-2 h-3 w-3" />
              </div>
              <h1 className="text-balance text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
                The evolution of{" "}
                <span className="bg-gradient-to-r from-neutral-400 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-100 dark:to-neutral-400">
                  real-time chat.
                </span>
              </h1>
              <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed text-pretty">
                Professional grade messaging for teams. Built for speed, security, and scalability. Experience the
                future of collaborative communication.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row pt-4">
                <Link href="/register">
                  <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg shadow-primary/20">
                    Deploy Your Workspace <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-12 px-8 text-base font-semibold bg-transparent">
                  <Github className="mr-2 h-4 w-4" /> View on GitHub
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl mb-4">Engineered for teams.</h2>
              <p className="text-muted-foreground text-lg">
                Everything you need to communicate effectively in one place.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-4 max-w-6xl mx-auto">
              <div className="md:col-span-3 rounded-3xl border bg-background p-8 hover:shadow-xl transition-shadow group">
                <div className="h-12 w-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Sub-millisecond latency powered by Socket.io and optimized MongoDB queries.
                </p>
              </div>

              <div className="md:col-span-3 rounded-3xl border bg-background p-8 hover:shadow-xl transition-shadow group">
                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Secure by Default</h3>
                <p className="text-muted-foreground">
                  End-to-end encryption for all messages and robust JWT-based authentication.
                </p>
              </div>

              <div className="md:col-span-2 rounded-3xl border bg-background p-8 hover:shadow-xl transition-shadow group">
                <div className="h-12 w-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Presence</h3>
                <p className="text-sm text-muted-foreground">
                  Edge-optimized delivery ensuring a smooth experience anywhere in the world.
                </p>
              </div>

              <div className="md:col-span-4 rounded-3xl border bg-background p-8 hover:shadow-xl transition-shadow flex items-center justify-between group overflow-hidden">
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold mb-2">Dynamic Workspace</h3>
                  <p className="text-muted-foreground">
                    Create rooms, share media, and express yourself with our integrated emoji and file system.
                  </p>
                </div>
                <div className="relative hidden lg:block">
                  <div className="absolute -right-4 -top-4 h-32 w-32 bg-primary/5 rounded-full blur-2xl" />
                  <MessageSquare className="h-24 w-24 text-muted/50" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12">
        <div className="container mx-auto px-4 text-center sm:px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              <span className="text-lg font-bold tracking-tight">elgemo</span>
            </div>
            <p className="text-sm text-muted-foreground">© 2025 elgemo. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
