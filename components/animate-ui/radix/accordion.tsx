"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { CaretDown } from "@phosphor-icons/react";
import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps, type Transition } from "motion/react";

type AccordionContentProps = Omit<
  AccordionPrimitive.AccordionContentProps,
  "asChild" | "forceMount"
> &
  Omit<HTMLMotionProps<"div">, "children"> & {
    transition?: Transition;
    keepRendered?: boolean;
  };

type AccordionTriggerProps = AccordionPrimitive.AccordionTriggerProps & {
  showArrow?: boolean;
};

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 150,
  damping: 22
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

const Accordion = AccordionPrimitive.Root;

const AccordionItem = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-line/90 last:border-b-0", className)}
    {...props}
  />
));
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionTrigger = forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  AccordionTriggerProps
>(({ className, children, showArrow = true, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "group flex w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold tracking-tight text-zinc-950 outline-none transition hover:text-sage focus-visible:text-sage",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {showArrow ? (
        <CaretDown
          className="size-4 shrink-0 text-copper transition-transform duration-300 group-data-[state=open]:rotate-180"
          weight="bold"
          aria-hidden="true"
        />
      ) : null}
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionMotionContent = forwardRef<
  HTMLDivElement,
  Omit<HTMLMotionProps<"div">, "children"> & {
    children?: ReactNode;
    keepRendered: boolean;
    transition: Transition;
  }
>(({ className, children, keepRendered, transition, ...props }, ref) => {
  const isOpen = (props as HTMLMotionProps<"div"> & { "data-state"?: string })["data-state"] === "open";

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={{
        open: { height: "auto", opacity: 1 },
        closed: { height: 0, opacity: 0 }
      }}
      transition={transition}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      <div className="pb-5 text-sm leading-6 text-muted">
        {keepRendered || isOpen ? children : null}
      </div>
    </motion.div>
  );
});
AccordionMotionContent.displayName = "AccordionMotionContent";

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, transition = defaultTransition, keepRendered = false, ...props }, ref) => (
    <AccordionPrimitive.Content forceMount asChild>
      <AccordionMotionContent
        ref={ref}
        className={className}
        keepRendered={keepRendered}
        transition={transition}
        {...props}
      >
        {children}
      </AccordionMotionContent>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
