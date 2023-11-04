import type { ComponentProps } from "preact";
import { useCallback, useRef } from "preact/hooks";

import { DDiv } from "@/components/primitive/default-components";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export interface SwitchProps
  extends Omit<ComponentProps<typeof DDiv>, "id" | "size"> {
  id: string;
  label: string;
  defaultChecked?: boolean;
  checked?: boolean;
  onChecked?: (v: boolean) => void;
  size?: Size;
  hoveringTimeout?: number;
  disabled?: boolean;
}

const getSize = (s: Size) => {
  switch (s) {
    case "xs":
      return 1.125;
    case "sm":
      return 1.25;
    case "md":
      return 1.5;
    case "lg":
      return 1.875;
    case "xl":
      return 2.25;
  }
};

export const Switch = ({
  id,
  label,
  defaultChecked,
  checked,
  onChecked,
  size = "md",
  className = "flex",
  hoveringTimeout = 225,
  disabled = false,
  ...props
}: SwitchProps) => {
  const timeout = useRef<number | null>(null);
  const elRef = useRef<HTMLLabelElement | null>(null);

  /** Clears the timeout incase it exits */
  const clear = useCallback(() => {
    if (timeout.current === null) return;

    clearTimeout(timeout.current);
    timeout.current = null;
  }, []);

  /** Starts the timeout */
  const onPointerEnter = useCallback(() => {
    if (disabled) return;
    clear();

    timeout.current = setTimeout(() => {
      elRef.current?.setAttribute("data-hovering", "true");
    }, hoveringTimeout) as unknown as number;
  }, [hoveringTimeout, clear, disabled]);

  /** Clears the timeout and resets the element */
  const onPointerLeave = useCallback(() => {
    if (disabled) return;
    clear();

    elRef.current?.setAttribute("data-hovering", "false");
  }, [clear, disabled]);

  return (
    <div className={className} {...props}>
      <input
        className={[
          "hidden",
          "[&:checked~label]:!bg-primary-300",
          "dark:[&:checked~label]:!bg-primary-300",
          "[&:checked~label]:after:bg-primary-500",
          "dark:[&:checked~label]:after:bg-primary-500",
          "motion-safe:[&:checked~label]:after:[clip-path:inset(0_0_0_46%_round_theme(borderRadius.3xl))]",
          "motion-safe:[&:checked~label[data-hovering=true]]:after:[clip-path:inset(0_0_0_35%_round_theme(borderRadius.3xl))]",
        ].join(" ")}
        id={id}
        type="checkbox"
        defaultChecked={defaultChecked}
        checked={checked}
        disabled={disabled}
        onChange={(e) =>
          onChecked && onChecked((e.target as HTMLInputElement).checked)
        }
      />
      <label
        ref={elRef}
        style={{
          width: `${getSize(size) * 1.75}rem`,
          height: `${getSize(size)}rem`,
        }}
        data-disabled={disabled}
        onPointerCancel={onPointerLeave}
        onPointerLeave={onPointerLeave}
        onPointerEnter={onPointerEnter}
        data-hovering={false}
        className={[
          "data-[disabled=true]:cursor-not-allowed",
          "data-[disabled=true]:opacity-75",
          "inline-block",
          "overflow-hidden",
          "rounded-[calc(theme(borderRadius.3xl)_-_.125rem)]",
          "transition-all",
          "select-none",
          "text-[0]",
          "relative",
          "data-[disabled=false]:hover:cursor-pointer",
          "bg-neutral-300",
          "data-[disabled=false]:hover:bg-neutral-200",
          "focus-visible:data-[disabled=false]:bg-neutral-200",
          "dark:bg-neutral-800",
          "dark:data-[disabled=false]:hover:bg-neutral-700",
          "dark:data-[disabled=false]:focus-visible:bg-neutral-700",
          "after:absolute",
          "after:transition-all",
          "after:top-[.125rem]",
          "after:left-[.125rem]",
          "after:w-[calc(100%_-_.25rem)]",
          "after:h-[calc(100%_-_.25rem)]",
          "after:bg-neutral-500",
          "after:dark:bg-neutral-500",
          "motion-reduce:after:opacity-85",
          "motion-reduce:after:[clip-path:inset(0_0_0_0_round_theme(borderRadius.3xl))]",
          "motion-safe:after:[clip-path:inset(0_46%_0_0_round_theme(borderRadius.3xl))]",
          "motion-safe:after:data-[hovering=true]:[clip-path:inset(0_35%_0_0_round_theme(borderRadius.3xl))]",
        ].join(" ")}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};
