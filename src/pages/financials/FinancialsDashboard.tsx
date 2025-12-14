import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

type TimeRange = "day" | "week" | "month";

interface ClinicFinancial {
  id: string;
  name: string;
  accountingModel: string;
  income: number;
  expenses: number;
  netProfit: number;
}

interface ProcedureBreakdown {
  name: string;
  value: number;
  color: string;
}

// Mock data - in real app, this would come from aggregated visit/payment data
const mockFinancialData = {
  day: {
    totalIncome: 850,
    totalExpenses: 120,
    netProfit: 730,
    materialPurchases: 80,
    labCosts: 40,
    otherExpenses: 0,
    clinics: [
      { id: "1", name: "Downtown Dental", accountingModel: "60:40", income: 500, expenses: 70, netProfit: 430 },
      { id: "2", name: "Smile Care Center", accountingModel: "Fixed Rate", income: 350, expenses: 50, netProfit: 300 },
    ],
    procedures: [
      { name: "Cleaning", value: 200, color: "hsl(var(--primary))" },
      { name: "Filling", value: 300, color: "hsl(var(--chart-2))" },
      { name: "Crown", value: 250, color: "hsl(var(--chart-3))" },
      { name: "Extraction", value: 100, color: "hsl(var(--chart-4))" },
    ],
  },
  week: {
    totalIncome: 4250,
    totalExpenses: 680,
    netProfit: 3570,
    materialPurchases: 420,
    labCosts: 200,
    otherExpenses: 60,
    clinics: [
      { id: "1", name: "Downtown Dental", accountingModel: "60:40", income: 2500, expenses: 400, netProfit: 2100 },
      { id: "2", name: "Smile Care Center", accountingModel: "Fixed Rate", income: 1750, expenses: 280, netProfit: 1470 },
    ],
    procedures: [
      { name: "Cleaning", value: 800, color: "hsl(var(--primary))" },
      { name: "Filling", value: 1200, color: "hsl(var(--chart-2))" },
      { name: "Crown", value: 1500, color: "hsl(var(--chart-3))" },
      { name: "Extraction", value: 450, color: "hsl(var(--chart-4))" },
      { name: "Root Canal", value: 300, color: "hsl(var(--chart-5))" },
    ],
  },
  month: {
    totalIncome: 18500,
    totalExpenses: 3200,
    netProfit: 15300,
    materialPurchases: 1800,
    labCosts: 1100,
    otherExpenses: 300,
    clinics: [
      { id: "1", name: "Downtown Dental", accountingModel: "60:40", income: 11000, expenses: 1900, netProfit: 9100 },
      { id: "2", name: "Smile Care Center", accountingModel: "Fixed Rate", income: 7500, expenses: 1300, netProfit: 6200 },
    ],
    procedures: [
      { name: "Cleaning", value: 3500, color: "hsl(var(--primary))" },
      { name: "Filling", value: 5200, color: "hsl(var(--chart-2))" },
      { name: "Crown", value: 6000, color: "hsl(var(--chart-3))" },
      { name: "Extraction", value: 2000, color: "hsl(var(--chart-4))" },
      { name: "Root Canal", value: 1800, color: "hsl(var(--chart-5))" },
    ],
  },
};

const INCOME_EXPENSE_COLORS = ["hsl(var(--primary))", "hsl(var(--muted-foreground))"];

export default function FinancialsDashboard() {
  const [timeRange, setTimeRange] = useState<TimeRange>("month");
  
  const data = mockFinancialData[timeRange];
  
  const incomeExpenseData = [
    { name: "Income", value: data.totalIncome },
    { name: "Expenses", value: data.totalExpenses },
  ];

  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()} EGP`;
  };

  const calculatePercentage = (value: number, total: number) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="gradient-header px-4 pt-6 pb-4 flex items-center gap-3">
        <Link to="/more">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-primary-foreground/20">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        <h1 className="text-xl font-bold text-primary-foreground">Earnings Dashboard</h1>
      </header>

      <div className="px-4 py-4 space-y-6">
        {/* Time Range Selector */}
        <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as TimeRange)} className="w-full">
          <TabsList className="w-full grid grid-cols-3">
            <TabsTrigger value="day">Day</TabsTrigger>
            <TabsTrigger value="week">Week</TabsTrigger>
            <TabsTrigger value="month">Month</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="shadow-card">
            <CardContent className="p-3 text-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Total Income</p>
              <p className="text-sm font-bold text-primary">{formatCurrency(data.totalIncome)}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-3 text-center">
              <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mx-auto mb-2">
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Expenses</p>
              <p className="text-sm font-bold text-foreground">{formatCurrency(data.totalExpenses)}</p>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-3 text-center">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Wallet className="h-4 w-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground mb-1">Net Profit</p>
              <p className="text-sm font-bold text-primary">{formatCurrency(data.netProfit)}</p>
            </CardContent>
          </Card>
        </div>

        {/* Income vs Expenses Pie Chart */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Income vs Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={incomeExpenseData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {incomeExpenseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={INCOME_EXPENSE_COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-6 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm text-muted-foreground">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-muted-foreground" />
                <span className="text-sm text-muted-foreground">Expenses</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Financial Breakdown */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Financial Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-border">
              <span className="text-sm text-foreground">Income</span>
              <span className="text-sm font-medium text-primary">{formatCurrency(data.totalIncome)}</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center py-2 border-b border-border">
                <span className="text-sm text-foreground">Expenses</span>
                <span className="text-sm font-medium text-foreground">{formatCurrency(data.totalExpenses)}</span>
              </div>
              <div className="pl-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Material Purchases</span>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{formatCurrency(data.materialPurchases)}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({calculatePercentage(data.materialPurchases, data.totalExpenses)}%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lab Costs</span>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{formatCurrency(data.labCosts)}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({calculatePercentage(data.labCosts, data.totalExpenses)}%)
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Other Expenses</span>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">{formatCurrency(data.otherExpenses)}</span>
                    <span className="text-xs text-muted-foreground ml-2">
                      ({calculatePercentage(data.otherExpenses, data.totalExpenses)}%)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-2 border-t-2 border-primary/20 mt-2">
              <span className="text-sm font-medium text-foreground">Net Profit</span>
              <span className="text-sm font-bold text-primary">{formatCurrency(data.netProfit)}</span>
            </div>
          </CardContent>
        </Card>

        {/* Per-Clinic Breakdown */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Per-Clinic Performance</h2>
          <div className="space-y-3">
            {data.clinics.map((clinic) => (
              <Card key={clinic.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-foreground">{clinic.name}</h3>
                      <p className="text-xs text-muted-foreground">Model: {clinic.accountingModel}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{formatCurrency(clinic.netProfit)}</p>
                      <p className="text-xs text-muted-foreground">Net Profit</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Income</p>
                      <p className="text-sm font-medium text-foreground">{formatCurrency(clinic.income)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expenses</p>
                      <p className="text-sm font-medium text-foreground">{formatCurrency(clinic.expenses)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Earnings by Procedure Type */}
        <Card className="shadow-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Earnings by Procedure Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.procedures}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={70}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {data.procedures.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {data.procedures.map((procedure) => (
                <div key={procedure.name} className="flex items-center gap-1.5">
                  <div 
                    className="w-2.5 h-2.5 rounded-full" 
                    style={{ backgroundColor: procedure.color }}
                  />
                  <span className="text-xs text-muted-foreground">{procedure.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
