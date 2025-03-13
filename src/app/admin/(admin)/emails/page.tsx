"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Search,
  Download,
  UserPlus,
  Users,
  TrendingUp,
  Mail,
} from "lucide-react";
import { emails } from "@/lib/orders";

type Subscriber = {
  id: string;
  email: string;
  dateJoined: string;
  status: string;
  source: string;
  preferences: string[];
};

const SubscribersDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [subscribers, setSubscribers] = useState<Subscriber[]>(emails);

  const metrics = [
    {
      id: "total-subscribers",
      title: "Total Subscribers",
      value: "2,547",
      description: "+180 from last month",
      icon: Users,
    },
    {
      id: "growth-rate",
      title: "Growth Rate",
      value: "12.3%",
      description: "Increased by 7% from last month",
      icon: TrendingUp,
    },
    {
      id: "engagement-rate",
      title: "Engagement Rate",
      value: "68.5%",
      description: "Average email open rate",
      icon: Mail,
    },
  ];

  const [newEmail, setNewEmail] = useState("");
  const [newPreferences, setNewPreferences] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddSubscriber = () => {
    if (newEmail) {
      const newSubscriber: Subscriber = {
        id: Date.now().toString(),
        email: newEmail,
        dateJoined: new Date().toISOString().split("T")[0],
        status: "active",
        source: "Manual Addition",
        preferences: newPreferences,
      };

      setSubscribers([newSubscriber, ...subscribers]);
      setNewEmail("");
      setNewPreferences([]);
      setIsDialogOpen(false);
    }
  };

  const filteredSubscribers = subscribers.filter((subscriber) =>
    subscriber.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 md:p-5 pt-0 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <Card key={metric.id} className="bg-muted/10 border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <metric.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="px-0 md:flex-row justify-between gap-2 items-center">
          <CardTitle>Recent Subscribers</CardTitle>
          <div className="flex gap-3">
            <Button disabled variant="secondary" className="w-full md:w-max">
              <Download className="h-4 w-4 " />
              Export List
            </Button>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4" />
                  Add Subscriber
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Subscriber</DialogTitle>
                  <DialogDescription>
                    Add a new subscriber to your mailing list.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preferences</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="new-products"
                          checked={newPreferences.includes("New Products")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewPreferences([
                                ...newPreferences,
                                "New Products",
                              ]);
                            } else {
                              setNewPreferences(
                                newPreferences.filter(
                                  (p) => p !== "New Products"
                                )
                              );
                            }
                          }}
                        />
                        <Label htmlFor="new-products">New Products</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="promotions"
                          checked={newPreferences.includes("Promotions")}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setNewPreferences([
                                ...newPreferences,
                                "Promotions",
                              ]);
                            } else {
                              setNewPreferences(
                                newPreferences.filter((p) => p !== "Promotions")
                              );
                            }
                          }}
                        />
                        <Label htmlFor="promotions">Promotions</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddSubscriber}>Add Subscriber</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Date Joined</TableHead>
                  <TableHead className="hidden md:table-cell">Source</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Preferences
                  </TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.id}>
                    <TableCell className="font-medium">
                      {subscriber.email}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {subscriber.dateJoined}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-muted-foreground">
                      {subscriber.source}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="flex gap-1 flex-wrap">
                        {subscriber.preferences.map((pref) => (
                          <Badge
                            key={pref}
                            variant="secondary"
                            className="text-xs"
                          >
                            {pref}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          subscriber.status === "active"
                            ? "default"
                            : "secondary"
                        }
                        className="text-xs"
                      >
                        {subscriber.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SubscribersDashboard;
