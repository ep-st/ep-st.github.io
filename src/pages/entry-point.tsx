import { URLSync } from "@/features/entry-point/components/url-sync";
import { Card } from "@/shared/components/ui/card";
import Editor from "@/features/entry-point/components/editor";
import Sidebar from "@/features/entry-point/components/sidebar";
import Header from "@/shared/components/header";

export default function EntryPoint() {
  return (
    <div className="bg-background selection:bg-primary/30 flex flex-col items-center justify-center overflow-hidden xl:h-screen xl:w-screen">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(var(--primary-rgb),0.05),transparent_50%)]" />
      <URLSync />

      <Header title="Entry Point Skill Tree Editor" />

      <main className="relative z-10 mx-auto flex min-h-0 w-full flex-1 flex-col items-center justify-center gap-10 overflow-hidden p-4 xl:flex-row xl:p-10">
        <Card className="bg-card/60 group ring-primary/10 hover:ring-primary/20 flex aspect-square max-h-full w-full overflow-hidden rounded-2xl ring-1 transition-all duration-500 md:backdrop-blur-md lg:w-1/2">
          <Editor />
        </Card>

        <div className="flex h-full w-full min-w-0 flex-1 flex-col overflow-hidden lg:max-w-220">
          <Sidebar />
        </div>
      </main>

      <footer className="border-border/40 bg-muted/10 z-50 flex h-[4vh] w-full shrink-0 items-center justify-between border-t px-8" />
    </div>
  );
}
