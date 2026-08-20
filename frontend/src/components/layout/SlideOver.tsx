import React, {
    ReactNode,
    useEffect,
} from "react";

interface SlideOverProps {
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    ariaLabel?: string;
}

export const SlideOver = ({
    open,
    onClose,
    children,
    ariaLabel,
}: SlideOverProps) => {
    useEffect(() => {
        if (!open) return undefined;

        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener(
            "keydown",
            onKey,
        );

        const prev =
            document.body.style.overflow;

        document.body.style.overflow = "hidden";

        return () => {
            document.removeEventListener(
                "keydown",
                onKey,
            );

            document.body.style.overflow = prev;
        };
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div
            className="fixed inset-0 z-50"
            role="dialog"
            aria-modal="true"
            aria-label={
                ariaLabel || "Details"
            }
        >
            <div
                className="absolute inset-0 bg-scout-text/40 backdrop-blur-[2px] animate-in fade-in-0 duration-200"
                onClick={onClose}
                aria-hidden
            />

            <div
                className="absolute inset-y-0 right-0 w-full sm:max-w-xl bg-white border-l border-scout-border shadow-scout-md animate-in slide-in-from-right-4 fade-in-0 duration-300"
                onClick={(e) =>
                    e.stopPropagation()
                }
            >
                {children}
            </div>
        </div>
    );
};