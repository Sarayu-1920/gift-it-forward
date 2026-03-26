import { TreePine, GraduationCap, Heart } from "lucide-react";

interface ImpactBadgeProps {
  type: string;
  description: string;
  amount: number;
  size?: "sm" | "md";
}

const iconMap: Record<string, typeof TreePine> = {
  tree_planting: TreePine,
  education: GraduationCap,
  ngo_support: Heart,
};

const labelMap: Record<string, string> = {
  tree_planting: "Trees Planted",
  education: "Education",
  ngo_support: "NGO Support",
};

const ImpactBadge = ({ type, description, amount, size = "sm" }: ImpactBadgeProps) => {
  const Icon = iconMap[type] || Heart;
  const label = labelMap[type] || "Impact";

  if (size === "md") {
    return (
      <div className="flex items-start gap-3 bg-primary/5 border border-primary/15 rounded-xl p-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary shrink-0">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
          <p className="text-xs font-semibold text-primary mt-1">₹{amount} contributed</p>
        </div>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs font-medium">
      <Icon className="h-3 w-3" />
      <span>{label}</span>
    </div>
  );
};

export default ImpactBadge;