import React from "react";
import { DeleteFilled } from '@ant-design/icons';
import StarRating from "@/components/color/StarRating";
import { useColors } from "@/components/color/ColorProvider";

export default function Color({ id, title, color, rating }) {
  const { rateColor, removeColor } = useColors();
  return (
    <section>
      <h1>
        id: { id } title: { title }
      </h1>
      <button onClick={() => removeColor(id)}>
        <DeleteFilled />
      </button>
      <div style={{ height: 50, backgroundColor: color }} />
      <StarRating
        selectedStars={ rating }
        onRate={ (rating) => rateColor(id, rating) }
      />
    </section>
  );
}
