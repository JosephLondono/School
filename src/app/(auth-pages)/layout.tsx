export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-5xl flex flex-col gap-12 items-start flex-wrap content-center">
      {children}
    </div>
  );
}
