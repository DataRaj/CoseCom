const salesData = [
  {
    id: 1,
    name: "Alexandra Chen",
    email: "alexandra.chen@gmail.com",
    amount: 338.0,
  },
  {
    id: 2,
    name: "Marcus Rodriguez",
    email: "m.rodriguez@gmail.com",
    amount: 169.0,
  },
  {
    id: 3,
    name: "Sophia Patel",
    email: "sophia.patel@gmail.com",
    amount: 249.0,
  },
  {
    id: 4,
    name: "Ethan Brooks",
    email: "ethan.b@gmail.com",
    amount: 379.0,
  },
  {
    id: 5,
    name: "Luna Kawasaki",
    email: "l.kawasaki@gmail.com",
    amount: 159.0,
  },
];

export function RecentSales() {
  return (
    <div className="space-y-8">
      {salesData.map(({ name, email, amount }) => (
        <div
          key={email}
          className="flex flex-1 flex-wrap items-center justify-between"
        >
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
          </div>
          <div className="font-medium">+${amount.toFixed(2)}</div>
        </div>
      ))}
    </div>
  );
}
