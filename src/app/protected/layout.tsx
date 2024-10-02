import LayoutPrincipal from "@/src/components/home/Layout";

export const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <LayoutPrincipal>
      <div className="w-full h-[87vh] flex flex-col gap-12 justify-center items-center">
        {children}
      </div>
    </LayoutPrincipal>
  );
};

export default layout;
