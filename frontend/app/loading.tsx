
import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FCFAFF] px-5">

      {/* Background Decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-pink-200/50 blur-[100px]" />

        <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-purple-200/60 blur-[100px]" />

        <div className="absolute right-[20%] top-[15%] h-48 w-48 rounded-full bg-pink-100/60 blur-[80px]" />

      </div>

      {/* Loading Content */}
      <section
        role="status"
        aria-live="polite"
        className="relative z-10 flex w-full max-w-sm flex-col items-center rounded-[32px] border border-white/80 bg-white/70 px-8 py-12 text-center shadow-[0_24px_80px_rgba(121,80,242,0.12)] backdrop-blur-xl"
      >

        {/* Animated Spinner */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center">

          {/* Outer Ring */}
          <div className="absolute inset-0 rounded-full border-[5px] border-[#F2E9FF]" />

          {/* Spinning Ring */}
          <div className="absolute inset-0 animate-spin rounded-full border-[5px] border-transparent border-t-[#7950F2] border-r-[#F08AC8]" />

          {/* Inner Circle */}
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFE5F2] via-[#F5F0FF] to-[#E8DDFF] shadow-inner">

            <Sparkles
              size={32}
              strokeWidth={1.8}
              className="text-[#7950F2]"
            />

          </div>

        </div>

        {/* Text */}
        <h1 className="text-xl font-bold tracking-tight text-[#49336F]">
          Getting things ready
        </h1>

        <p className="mt-3 text-sm text-[#A69AB9]">
          กำลังเตรียมทุกอย่างให้คุณ
        </p>

        {/* Loading Dots */}
        <div className="mt-8 flex items-center gap-2">

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#F08AC8] [animation-delay:-0.3s]" />

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#C28AF2] [animation-delay:-0.15s]" />

          <span className="h-2.5 w-2.5 animate-bounce rounded-full bg-[#7950F2]" />

        </div>

        {/* Divider */}
        <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-[#E9DDFB] to-transparent" />

        <p className="mt-5 text-[10px] font-semibold tracking-[0.25em] text-[#B5A9C8]">
          PLEASE WAIT
        </p>

      </section>

      {/* Footer */}
      <div className="absolute bottom-7 text-xs text-[#B9ADC9]">
        Made with love
        <span className="mx-1 text-[#F08AC8]">♥</span>
      </div>

    </main>
  );
}
