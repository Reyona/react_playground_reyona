import React from "react";
import { StarFilled } from '@ant-design/icons';

export default function Star({ selected = false, onSelect = f => f }) {
  return <StarFilled style={{ color: selected ? "red" : "grey" }} onClick={onSelect} />;
}
