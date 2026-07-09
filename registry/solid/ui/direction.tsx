import { splitProps, type JSX } from "solid-js";

function DirectionProvider(props: JSX.HTMLAttributes<HTMLDivElement> & { dir?: "ltr" | "rtl" }) {
  const [local, rest] = splitProps(props, ["dir"]);
  return <div dir={local.dir} {...rest} />;
}

export { DirectionProvider };
