export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400">
        Sorry, we couldnt find that page.
      </p>
    </div>
  );
}
