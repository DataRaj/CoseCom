"use client";
import {
  Bell,
  Package,
  Star,
  AlertCircle,
  Check,
  DollarSign,
  MessageSquare,
  RefreshCcw,
  Truck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import React from "react";

type Notification = {
  id: string;
  type:
    | "order"
    | "review"
    | "stock"
    | "refund"
    | "message"
    | "restock"
    | "shipping";
  message: string;
  timestamp: Date;
  read: boolean;
};

const NotificationsPage = () => {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: "1",
      type: "order",
      message:
        "New order #1234 from Alexandra Chen - $338.00 (Silken Touch Moisturizer)",
      timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
      read: false,
    },
    {
      id: "2",
      type: "review",
      message:
        'New 5-star review for Hydrating Night Cream: "Amazing results after just one week!"',
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
      read: false,
    },
    {
      id: "3",
      type: "stock",
      message: "Low stock alert: Vitamin C Serum (5 units remaining)",
      timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      read: false,
    },
    {
      id: "4",
      type: "order",
      message:
        "New order #1235 from Michael Smith - $299.00 (Premium Cleanser Bundle)",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      read: true,
    },
    {
      id: "5",
      type: "refund",
      message:
        "Refund request #RF123 for order #1185 - Customer reported allergic reaction",
      timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      read: false,
    },
    {
      id: "6",
      type: "message",
      message: "New customer inquiry about Retinol Serum ingredients",
      timestamp: new Date(Date.now() - 1000 * 60 * 90), // 1.5 hours ago
      read: true,
    },
    {
      id: "7",
      type: "restock",
      message: "Velvet Veil Night Care has been restocked (+100 units)",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
      read: true,
    },
    {
      id: "8",
      type: "shipping",
      message: "Order #8779 delivery delayed - Weather conditions",
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
      read: true,
    },
    {
      id: "9",
      type: "review",
      message:
        'New 4-star review for Brightening Face Mask: "Good but expensive"',
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
      read: true,
    },
    {
      id: "10",
      type: "order",
      message:
        "New order #1235 from Michael Smith - $299.00 (Premium Cleanser Bundle)",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      read: true,
    },
    {
      id: "11",
      type: "stock",
      message: "Hyaluronic Acid Serum running low (15 units remaining)",
      timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
      read: true,
    },
    {
      id: "12",
      type: "order",
      message: "Bulk order #1236 from Beauty Spa LLC - $2,499.00",
      timestamp: new Date(Date.now() - 1000 * 60 * 420), // 7 hours ago
      read: true,
    },
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="h-4 w-4" />;
      case "review":
        return <Star className="h-4 w-4" />;
      case "stock":
        return <AlertCircle className="h-4 w-4" />;
      case "refund":
        return <DollarSign className="h-4 w-4" />;
      case "message":
        return <MessageSquare className="h-4 w-4" />;
      case "restock":
        return <RefreshCcw className="h-4 w-4" />;
      case "shipping":
        return <Truck className="h-4 w-4" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const formatTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({ ...notification, read: true }))
    );
  };

  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          <span className="font-medium">Notifications</span>
          <Badge variant="secondary">
            {notifications.filter((n) => !n.read).length} new
          </Badge>
        </div>
        <button
          onClick={markAllAsRead}
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          Mark all as read
        </button>
      </div>

      <div className="space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              !notification.read ? "bg-muted/40" : ""
            }`}
          >
            <div className="text-muted-foreground mt-1">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatTimeAgo(notification.timestamp)}
              </p>
            </div>
            {!notification.read && (
              <button
                onClick={() => markAsRead(notification.id)}
                className="text-blue-500 hover:text-blue-700"
              >
                <Check className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsPage;
