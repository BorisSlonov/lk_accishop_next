"use client";

import { useInView, IntersectionOptions } from "react-intersection-observer";
import clsx from "clsx";

interface InViewAnimationProps extends IntersectionOptions {
    children: React.ReactNode;
    className?: string;
    animationClass?: string;
    initialClass?: string;
}

export function InViewStyle({
    children,
    className,
    animationClass,
    initialClass,
    ...props
}: InViewAnimationProps) {
    const { ref, inView } = useInView(props)
    return (
        <div
            ref={ref}
            className={clsx(className, initialClass, inView && animationClass)}
        >
            {children}
        </div>
    );
}