
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#f7f8fc] px-4 text-[#0B0F4F] sm:px-6 lg:px-8">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-[5%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(240,98,192,0.2)_0%,rgba(240,98,192,0.08)_42%,transparent_72%)] blur-3xl" />
        <div className="absolute -right-32 top-[25%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(124,92,255,0.18)_0%,rgba(124,92,255,0.08)_46%,transparent_74%)] blur-3xl" />
        <div className="absolute bottom-[-10%] left-[28%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(255,178,76,0.18)_0%,rgba(255,178,76,0.08)_46%,transparent_74%)] blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-xl space-y-8 rounded-3xl border border-[#e8e4f6] bg-white/90 p-8 text-center shadow-[0_18px_55px_rgba(124,92,255,0.1)] sm:p-10">
        
        {/* Animated / Glowing 404 Text */} 
        <div className="relative">
          <h1 className="animate-pulse bg-gradient-to-r from-[#7C5CFF] via-[#C45BE8] to-[#F062C0] bg-clip-text text-9xl font-extrabold tracking-widest text-transparent">
            404
          </h1>
          <div className="absolute left-1/2 top-10 -translate-x-1/2 rotate-12 rounded bg-[#7C5CFF] px-2 py-1 text-xs text-white shadow-lg">
            Page Not Found
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            The page you&apos;re looking for could not be found.
          </h2>
          <p className="text-sm text-slate-600 sm:text-base">
            Sorry, this page may have been moved or removed, or the URL may be incorrect.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 pt-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-transparent bg-[#FFB24C] px-6 py-3 text-base font-bold text-[#0B0F4F] shadow-lg shadow-[#FFB24C]/25 transition-colors duration-200 hover:bg-[#F4A62F]"
          >
            Return to Home
          </Link>
          {/* <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-slate-700 text-base font-medium rounded-xl text-slate-300 hover:bg-slate-800 hover:text-white transition-colors duration-200"
          >
            ย้อนกลับ
          </button> */}
        </div>

      </div>
    </div>
  );
}
