import { TrendingUp, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

interface IncomeSummaryProps {
  todayIncome: number;
  weekIncome: number;
  currency?: string;
}

export function IncomeSummary({ todayIncome, weekIncome, currency = "EGP" }: IncomeSummaryProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-EG", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="px-4">
      <h2 className="text-lg font-bold text-foreground mb-3">Income Summary</h2>
      <Link to="/financials" className="block">
        <div className="gradient-primary rounded-2xl p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-foreground/80 text-sm font-medium">Today</p>
              <p className="text-primary-foreground text-2xl font-bold">
                {currency} {formatCurrency(todayIncome)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <Wallet className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-primary-foreground/20">
            <TrendingUp className="w-4 h-4 text-primary-foreground/80" />
            <p className="text-primary-foreground/80 text-sm">
              This week: <span className="font-semibold text-primary-foreground">{currency} {formatCurrency(weekIncome)}</span>
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
