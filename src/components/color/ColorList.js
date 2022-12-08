import React from "react";
import Color from "@/components/color/Color";
import { useColors } from "@/components/color/ColorProvider";

export default function ColorList() {
  const { colors } = useColors();

  if (!colors.length) return <div>No Colors Listed. (Add a Color)</div>;

  return (
    <div>
      { colors.map(color => (
        <Color key={ color.id } { ...color } />
      )) }
    </div>
  );
}
