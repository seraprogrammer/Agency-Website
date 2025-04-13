import { h } from "./olova.js";

// SVG tag support (future proof)
const SVG_TAGS = new Set([
  "svg",
  "path",
  "circle",
  "rect",
  "line",
  "polygon",
  "polyline",
  "ellipse",
  "g",
  "text",
  "defs",
  "filter",
  "mask",
  "marker",
  "pattern",
  "linearGradient",
  "radialGradient",
  "stop",
  "use",
  "clipPath",
  "textPath",
  "tspan",
  "foreignObject",
]);

// Fixed Helper component
export function Helper(rawProps) {
  const props = rawProps || {}; // Prevent null error
  const children = props.children ?? []; // Default to empty if undefined/null
  const safeChildren = Array.isArray(children) ? children : [children];

  return h("div", { class: "helper" }, ...safeChildren);
}
