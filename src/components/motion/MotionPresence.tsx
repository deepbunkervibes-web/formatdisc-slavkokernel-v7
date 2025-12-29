import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";

import { variants } from "@/lib/motionTokens";

type MotionPresenceProps = {
    children: ReactNode;
    routeKey: string;
};

export function MotionPresence({ children, routeKey }: MotionPresenceProps) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={routeKey}
                variants={variants.sectionEnter}
                initial="initial"
                animate="animate"
                exit="initial"
                className="min-h-screen will-change-transform will-change-opacity"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
