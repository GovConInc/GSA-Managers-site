import { motion } from "framer-motion";
import Card from "./Card";
import { cn } from "./cn";

export default function StatCard({
  label,
  value,
  detail,
  accent = "primary",
}: {
  label: string;
  value: string;
  detail: string;
  accent?: "primary" | "secondary" | "destructive";
}) {
  const accents = {
    primary: "from-primary to-primary/70",
    secondary: "from-secondary to-secondary/70",
    destructive: "from-destructive to-destructive/70",
  };

  return (
    <motion.div 
      whileHover={{ y: -4 }} 
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <Card className="p-6 h-full" variant="elevated">
        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="mt-3 font-display text-3xl font-bold text-foreground">{value}</p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{detail}</p>
        <div className="mt-5 h-1.5 w-full rounded-full bg-secondary overflow-hidden">
          <div className={cn("h-full w-2/3 rounded-full bg-gradient-to-r", accents[accent])} />
        </div>
      </Card>
    </motion.div>
  );
}