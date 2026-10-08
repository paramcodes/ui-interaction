export const motion = {
  duration: { fast: 0.12, normal: 0.25, slow: 0.5 },
  ease: { standard: [0.2, 0, 0, 1], enter: [0, 0, 0.2, 1], exit: [0.4, 0, 1, 1] },
  spring: {
    soft: { type: "spring", stiffness: 120, damping: 20 },
    snappy: { type: "spring", stiffness: 400, damping: 30 },
    bouncy: { type: "spring", stiffness: 300, damping: 10 },
  },
} as const;
