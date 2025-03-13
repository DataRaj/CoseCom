"use client";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import React from "react";

type NotificationSettings = {
  orderNotifications: boolean;
  stockAlerts: boolean;
  customerMessages: boolean;
  marketingUpdates: boolean;
  reviewNotifications: boolean;
  orderAlerts: boolean;
  shippingAlerts: boolean;
  restockAlerts: boolean;
  messageAlerts: boolean;
  refundAlerts: boolean;
  reviewAlerts: boolean;
};

type StoreSettings = {
  storeName: string;
  storeUrl: string;
  supportEmail: string;
  timezone: string;
  currency: string;
  language: string;
};

type ShippingSettings = {
  freeShippingThreshold: number;
  internationalShipping: boolean;
  expressDelivery: boolean;
};

const SettingsPage = () => {
  const [notifications, setNotifications] =
    React.useState<NotificationSettings>({
      orderNotifications: true,
      orderAlerts: true,
      stockAlerts: true,
      customerMessages: true,
      marketingUpdates: false,
      reviewNotifications: true,
      shippingAlerts: true,
      restockAlerts: true,
      messageAlerts: true,
      refundAlerts: true,
      reviewAlerts: true,
    });

  const [storeSettings, setStoreSettings] = React.useState<StoreSettings>({
    storeName: "CoseCom",
    storeUrl: "",
    supportEmail: "",
    timezone: "UTC-5",
    currency: "USD",
    language: "English",
  });

  const [shipping, setShipping] = React.useState<ShippingSettings>({
    freeShippingThreshold: 150,
    internationalShipping: true,
    expressDelivery: true,
  });

  const handleSave = () => {
    // Simulated save functionality
    console.log("Saving settings...");
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground">
            Manage your store preferences and configurations
          </p>
        </div>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid grid-cols-2 lg:grid-cols-6 w-full">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Store Information</CardTitle>
              <CardDescription>
                Update your store details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    disabled
                    id="storeName"
                    value={storeSettings.storeName}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        storeName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="storeUrl">Store URL</Label>
                  <Input
                    disabled
                    id="storeUrl"
                    value={storeSettings.storeUrl}
                    onChange={(e) =>
                      setStoreSettings({
                        ...storeSettings,
                        storeUrl: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Currency</Label>
                    <Select defaultValue={storeSettings.currency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD ($)</SelectItem>
                        <SelectItem value="EUR">EUR (€)</SelectItem>
                        <SelectItem value="GBP">GBP (£)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Language</Label>
                    <Select defaultValue={storeSettings.language}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem disabled value="French">
                          French
                        </SelectItem>
                        <SelectItem disabled value="German">
                          German
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Add your business details for invoices and legal documents
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label>Business Address</Label>
                  <Textarea placeholder="Enter your business address" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Tax ID</Label>
                    <Input placeholder="Enter tax ID" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Registration Number</Label>
                    <Input placeholder="Enter registration number" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {/* Order Alerts */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Order Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive updates when new orders are placed
                    </p>
                  </div>
                  <Switch
                    checked={notifications.orderAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        orderAlerts: checked,
                      })
                    }
                  />
                </div>

                {/* Review Alerts */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Review Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when customers leave reviews
                    </p>
                  </div>
                  <Switch
                    checked={notifications.reviewAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        reviewAlerts: checked,
                      })
                    }
                  />
                </div>

                {/* Stock Alerts */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Stock Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get notified when products are low in stock
                    </p>
                  </div>
                  <Switch
                    checked={notifications.stockAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        stockAlerts: checked,
                      })
                    }
                  />
                </div>

                {/* Refund Alerts */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Refund Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get updates when refunds are processed
                    </p>
                  </div>
                  <Switch
                    checked={notifications.refundAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        refundAlerts: checked,
                      })
                    }
                  />
                </div>

                {/* Message Alerts */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Message Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications when customers send messages
                    </p>
                  </div>
                  <Switch
                    checked={notifications.messageAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        messageAlerts: checked,
                      })
                    }
                  />
                </div>

                {/* Restock Alerts */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Restock Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Be notified when products are restocked
                    </p>
                  </div>
                  <Switch
                    checked={notifications.restockAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        restockAlerts: checked,
                      })
                    }
                  />
                </div>

                {/* Shipping Alerts */}
                <Separator />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Shipping Alerts</Label>
                    <p className="text-sm text-muted-foreground">
                      Get updates on shipping status and tracking information
                    </p>
                  </div>
                  <Switch
                    checked={notifications.shippingAlerts}
                    onCheckedChange={(checked) =>
                      setNotifications({
                        ...notifications,
                        shippingAlerts: checked,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize your automated email notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">
                        Order Confirmation
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sent when a customer completes their order
                      </div>
                    </div>
                    <Button disabled variant="outline">
                      Edit Template
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">
                        Shipping Confirmation
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Sent when an order ships
                      </div>
                    </div>
                    <Button disabled variant="outline">
                      Edit Template
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">Abandoned Cart</div>
                      <div className="text-sm text-muted-foreground">
                        Sent to customers who leave items in cart
                      </div>
                    </div>
                    <Button disabled variant="outline">
                      Edit Template
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Shipping Settings</CardTitle>
              <CardDescription>
                Configure your store&apos;s shipping options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label>Free Shipping Threshold</Label>
                  <div className="flex gap-2">
                    <Select defaultValue="USD">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="GBP">GBP</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      value={shipping.freeShippingThreshold}
                      onChange={(e) =>
                        setShipping({
                          ...shipping,
                          freeShippingThreshold: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>International Shipping</Label>
                    <p className="text-sm text-muted-foreground">
                      Enable shipping to international addresses
                    </p>
                  </div>
                  <Switch
                    checked={shipping.internationalShipping}
                    onCheckedChange={(checked) =>
                      setShipping({
                        ...shipping,
                        internationalShipping: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Express Delivery</Label>
                    <p className="text-sm text-muted-foreground">
                      Offer express shipping options
                    </p>
                  </div>
                  <Switch
                    checked={shipping.expressDelivery}
                    onCheckedChange={(checked) =>
                      setShipping({
                        ...shipping,
                        expressDelivery: checked,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Shipping Zones</CardTitle>
              <CardDescription>
                Set up shipping rates for different regions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <AlertDescription>
                  Configure shipping zones to set different rates and rules for
                  specific regions.
                </AlertDescription>
              </Alert>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">North America</h4>
                    <p className="text-sm text-muted-foreground">
                      United States, Canada
                    </p>
                  </div>
                  <Badge>Active</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Europe</h4>
                    <p className="text-sm text-muted-foreground">
                      EU Countries
                    </p>
                  </div>
                  <Badge variant="outline">Draft</Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled variant="outline" className="w-full">
                Add Shipping Zone
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">
                  Two-Factor Authentication
                </h4>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable 2FA</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h4 className="text-sm font-medium">API Access</h4>
                <div className="grid gap-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-0.5">
                      <div className="text-sm font-medium">API Key</div>
                      <div className="text-sm text-muted-foreground">
                        ••••••••••••••••
                      </div>
                    </div>
                    <Button variant="outline">Regenerate</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
