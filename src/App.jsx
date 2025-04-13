import { h, signal, effect } from "./olova.js";

export default function App() {
  const count = signal(0);

  effect(() => {
    console.log(count());
  });

  return (
    <div>
      <h1>{() => count()}</h1>
      <button onclick={() => count.set(count() + 1)}>Click me!</button>

      <p>This is inside the Helper component</p>

      {/* SVG element example */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-air-vent-icon lucide-air-vent"
      >
        <path d="M6 12H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 8h12" />
        <path d="M18.3 17.7a2.5 2.5 0 0 1-3.16 3.83 2.53 2.53 0 0 1-1.14-2V12" />
        <path d="M6.6 15.6A2 2 0 1 0 10 17v-5" />
      </svg>

      {/* Another content */}
      <button>Another button inside Helper</button>
    </div>
  );
}
