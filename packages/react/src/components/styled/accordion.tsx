import {
  type ComponentPropsWithoutRef,
  type MouseEventHandler,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

//----- Third Party Utils -----//
import { twMerge } from "tailwind-merge";

//----- AccordionContext -----//
const AccordionContext = createContext<{
  selected: string | null;
  setSelected: (v: string | null) => void;
}>({
  selected: null,
  setSelected: () => {},
});

//----- Accordion -----//
interface AccordionProps extends ComponentPropsWithoutRef<"div"> {
  selected?: string | null;
  onSelected?: (v: string | null) => void;
  bodyElementBorderWidth?: number;
}

export const Accordion = ({
  children,
  onSelected,
  selected = null,
  className = "",
  bodyElementBorderWidth = 2,
  ...props
}: AccordionProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  /**
   * Animates the content of selected item
   * @param {string|null} selected
   * @returns {void}
   */
  const onSelectHandler = useCallback(
    (selected: string | null): void => {
      // Verifying the accordion
      const accordion = ref.current;
      if (accordion === null) return;

      accordion.childNodes.forEach((element) => {
        const accordionItem = element as HTMLDivElement;
        const isSelected = accordionItem.id === selected;

        let selectedBodyHeight = 0;

        // Finding the body element
        const accordionItemBody = accordionItem.querySelector(
          "[data-accordion-body]"
        );
        if (accordionItemBody === null) return;

        // Height of `AccordionItemTitle` + the border of `AccordionItem`
        const accordionItemTitle =
          (
            accordionItem.firstChild as HTMLButtonElement
          ).getBoundingClientRect().height +
          // Incase you have changed the border width inside the `AccordionItem` you need to apply it to `bodyElementBorderWidth` prop
          bodyElementBorderWidth;

        // Applying th states

        // Applying the selected attribute to `AccordionItemBody`
        accordionItemBody.setAttribute("data-selected", `${isSelected}`);

        if (isSelected && accordionItemBody) {
          // Incase the `AccordionItem` is selected one, adding the height `AccordionItemBody` of it to it.
          selectedBodyHeight = accordionItemBody.getBoundingClientRect().height;
          accordionItem.style.setProperty(
            "--max-height",
            selectedBodyHeight + accordionItemTitle + "px"
          );
        } else {
          // Incase the it isn't the selected one, applying the height of it to the `AccordionItemTitle`
          accordionItem.style.setProperty(
            "--max-height",
            accordionItemTitle + "px"
          );
        }

        // Applying max unlimited height for animation purposes
        accordionItem.style.setProperty("--height", "9999vh");
      });

      onSelected && onSelected(selected);
    },
    [onSelected, bodyElementBorderWidth]
  );

  useEffect(() => {
    onSelectHandler(selected);
  }, [selected, onSelectHandler]);

  return (
    <AccordionContext.Provider
      value={{ selected, setSelected: onSelectHandler }}
    >
      <div
        {...props}
        className={twMerge(
          "not-prose transition-all duration-200 motion-reduce:duration-0 flex flex-col gap-2",
          className
        )}
        ref={ref}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

//----- AccordionItem -----//
interface AccordionItemProps
  extends Omit<ComponentPropsWithoutRef<"div">, "id"> {
  id: string;
}

export const AccordionItem = ({
  id,
  children,
  className = "",
  ...props
}: AccordionItemProps) => (
  <div
    {...props}
    id={id}
    className={twMerge(
      [
        "relative",
        "transition-all",
        "duration-200 motion-reduce:duration-0",
        "border-neutral-300",
        "dark:border-neutral-700",
        "bg-neutral-100",
        "dark:bg-neutral-900",
        "border",
        "rounded-3xl",
        "h-[var(--height,_auto)]",
        "max-h-[var(--max-height)]",
        "will-change-[max-height]",
      ].join(" "),
      className
    )}
  >
    {children}
  </div>
);

//----- AccordionItemTitle -----//
export const AccordionItemTitle = ({
  children,
  className = "",
  onClick,
  ...props
}: ComponentPropsWithoutRef<"button">) => {
  const { setSelected, selected } = useContext(AccordionContext);

  const onSelect = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      const id = (e.target as HTMLButtonElement).parentElement?.id;
      if (typeof id === "undefined") return;

      setSelected(selected === id ? null : id);

      onClick && onClick(e);
    },
    [setSelected, onClick, selected]
  );

  return (
    <button
      onClick={onSelect}
      className={twMerge(
        "block w-full border-none text-md font-semibold  py-2 px-6 [&_*]:pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

//----- AccordionItemBody -----//
export const AccordionItemBody = ({
  children,
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) => (
  <div
    {...props}
    data-accordion-body
    className={twMerge(
      [
        "absolute",
        "duration-200 motion-reduce:duration-0",
        "w-full",
        "transition-all",
        "overflow-hidden",
        "py-4",
        "px-6",
        "data-[selected=false]:[clip-path:_inset(0_0_100%_0_round_calc(theme(borderRadius.3xl)_-_theme(space.2)))]",
        "data-[selected=false]:pointer-events-none",
        "data-[selected=true]:[clip-path:_inset(0_0_0_0_round_calc(theme(borderRadius.3xl)_-_theme(space.2)))]",
      ].join(" "),
      className
    )}
    data-selected={false}
  >
    {children}
  </div>
);
