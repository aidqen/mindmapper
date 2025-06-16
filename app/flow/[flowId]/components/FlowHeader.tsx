import { motion } from 'framer-motion';

export const FlowHeader = () => {
  return (
    <motion.div
      className="absolute top-4 left-4 z-10 liquid-glass rounded-xl p-6"
      animate={{
        y: [0, -6, 0]
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "loop"
      }}
      style={{
        willChange: "transform"
      }}
    >
      <h1 className="text-2xl font-bold mb-2 bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent drop-shadow-sm">
        Mind Mapper
      </h1>
      <p className="text-sm text-white/80 drop-shadow-sm">
        Drag nodes around, connect them, and build your mind map!
      </p>
    </motion.div>
  );
};
