import ColorProvider from "@/components/color/ColorProvider";
import ColorList from "@/components/color/ColorList.js";
import AddColorForm from "@/components/color/AddColorForm";

export default function ColorPage() {
  return (
    <ColorProvider>
      <AddColorForm />
      <ColorList />
    </ColorProvider>
  );
}
