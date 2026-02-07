"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Package, CheckCircle, Clock } from "lucide-react";
import { getLostItems, getFoundItems } from "@/lib/api";

interface Stats {
  totalLost: number;
  totalFound: number;
  resolved: number;
  pending: number;
}

function AnimatedNumber({
  value,
  duration = 1200,
}: {
  value: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const startValue = displayValue;

    function animate(currentTime: number) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(
        Math.floor(startValue + (value - startValue) * easeOutQuart)
      );

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }, [value, duration, displayValue]);

  return <span>{displayValue}</span>;
}

const statsConfig = [
  {
    key: "totalLost" as const,
    label: "Total Lost",
    description: "Items reported as lost",
    icon: Search,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
  },
  {
    key: "totalFound" as const,
    label: "Total Found",
    description: "Items reported as found",
    icon: Package,
    color: "text-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
  },
  {
    key: "resolved" as const,
    label: "Resolved",
    description: "Successfully reunited",
    icon: CheckCircle,
    color: "text-foreground",
    bgColor: "bg-muted",
    borderColor: "border-border",
  },
  {
    key: "pending" as const,
    label: "Pending",
    description: "Awaiting resolution",
    icon: Clock,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    borderColor: "border-secondary/20",
  },
];

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalLost: 0,
    totalFound: 0,
    resolved: 0,
    pending: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      try {
        const [lost, found] = await Promise.all([
          getLostItems(),
          getFoundItems(),
        ]);

        const resolved = [...lost, ...found].filter(
          (item: any) => item.status === "Resolved"
        ).length;

        setStats({
          totalLost: lost.length,
          totalFound: found.length,
          resolved,
          pending: lost.length + found.length - resolved,
        });
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    }

    fetchStats();
    const interval = setInterval(fetchStats, 3000);
    return () => clearInterval(interval);
  }, []);

  const totalItems = stats.totalLost + stats.totalFound || 1;
  const resolutionRate = Math.round((stats.resolved / totalItems) * 100);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Real-time campus lost and found statistics
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.key}
              className={`relative overflow-hidden transition-all hover:shadow-lg ${stat.borderColor}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-4xl font-bold tracking-tight">
                      <AnimatedNumber value={stats[stat.key]} />
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </div>
                  <div className={`rounded-xl ${stat.bgColor} p-3`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold">Quick Actions</h3>
            <div className="space-y-3">
              <a
                href="/report-lost"
                className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted"
              >
                <Search className="h-5 w-5 text-secondary" />
                <div>
                  <p className="font-medium">Report Lost Item</p>
                  <p className="text-sm text-muted-foreground">
                    Submit a new lost item report
                  </p>
                </div>
              </a>

              <a
                href="/report-found"
                className="flex items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted"
              >
                <Package className="h-5 w-5 text-foreground" />
                <div>
                  <p className="font-medium">Report Found Item</p>
                  <p className="text-sm text-muted-foreground">
                    Help reunite an item with its owner
                  </p>
                </div>
              </a>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="mb-4 font-semibold">Resolution Rate</h3>
            <div className="space-y-4">
              <div className="relative h-4 overflow-hidden rounded-full bg-muted">
                <div
                  className="absolute left-0 top-0 h-full bg-secondary transition-all duration-1000"
                  style={{ width: `${resolutionRate}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {stats.resolved} of {totalItems} items resolved
                </span>
                <span className="font-medium text-secondary">
                  {resolutionRate}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
