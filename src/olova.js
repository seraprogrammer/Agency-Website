export function signal(val) {
  const subs = new Set();
  const s = () => {
    if (currentEffect) subs.add(currentEffect);
    return val;
  };
  s.set = (v) => {
    val = v;
    subs.forEach((fn) => fn());
  };
  return s;
}

let currentEffect = null;
export function effect(fn) {
  currentEffect = fn;
  fn();
  currentEffect = null;
}

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

export function h(type, props = {}, ...children) {
  // If type is a function, treat it as a component
  if (typeof type === "function") {
    return type(props); // Call the component function
  }

  // Create element (SVG or HTML)
  const isSvgElement = SVG_TAGS.has(type);
  const el = isSvgElement
    ? document.createElementNS("http://www.w3.org/2000/svg", type)
    : document.createElement(type);

  // Set props/attributes
  for (let k in props) {
    if (k.startsWith("on")) {
      el[k.toLowerCase()] = props[k]; // event listener
    } else {
      // For SVG elements, use setAttributeNS for xlink attributes
      if (isSvgElement && k.startsWith("xlink:")) {
        el.setAttributeNS("http://www.w3.org/1999/xlink", k, props[k]);
      } else {
        el.setAttribute(k, props[k]);
      }
    }
  }

  // Add children (support signals too)
  children.flat().forEach((c) => {
    if (c === null || c === undefined) {
      return; // Skip null or undefined children
    }

    if (typeof c === "function") {
      const text = document.createTextNode("");
      effect(() => (text.textContent = c()));
      el.appendChild(text);
    } else {
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
  });

  return el;
}
