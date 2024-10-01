export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="w-full h-[87vh] flex flex-col gap-12">{children}</div>;
}
