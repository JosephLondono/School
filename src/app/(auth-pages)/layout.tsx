export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-[80vh] flex flex-col gap-12 items-start flex-wrap content-center justify-center">
      {children}
    </div>
  );
}
