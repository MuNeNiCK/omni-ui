import { splitProps, type ParentProps, type JSX } from "solid-js";

function AspectRatio(
  props: ParentProps<{ ratio?: number; class?: string } & JSX.HTMLAttributes<HTMLDivElement>>,
) {
  const [local, rest] = splitProps(props, ["ratio", "children", "class"]);
  const ratio = () => local.ratio ?? 1;
  return (
    <div
      data-slot="aspect-ratio"
      class={local.class}
      style={{
        position: "relative",
        width: "100%",
        "padding-bottom": `${(1 / ratio()) * 100}%`,
      }}
      {...rest}
    >
      <div
        style={{
          position: "absolute",
          inset: "0",
        }}
      >
        {local.children}
      </div>
    </div>
  );
}

export { AspectRatio };
