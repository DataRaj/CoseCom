import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, CreditCard, Globe, Mail } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="-space-y-4">
      <Card className="-mt-2">
        <CardHeader>
          <CardTitle>Payment Gateways</CardTitle>
          <CardDescription>
            Configure your payment processing integrations
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="h-6 w-6 dark:text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Stripe</h4>
                  <p className="text-sm text-muted-foreground">
                    Credit card payments
                  </p>
                </div>
              </div>
              <Badge variant="default">Connected</Badge>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Box className="h-6 w-6 dark:text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">PayPal</h4>
                  <p className="text-sm text-muted-foreground">
                    PayPal payments
                  </p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="">
        <CardHeader>
          <CardTitle>Marketing Integrations</CardTitle>
          <CardDescription>
            Connect your marketing and analytics tools
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Mail className="h-6 w-6 dark:text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Mailchimp</h4>
                  <p className="text-sm text-muted-foreground">
                    Email marketing automation
                  </p>
                </div>
              </div>
              <Button variant="outline">Connect</Button>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 dark:text-black" />
                </div>
                <div>
                  <h4 className="text-sm font-medium">Google Analytics</h4>
                  <p className="text-sm text-muted-foreground">
                    Website analytics
                  </p>
                </div>
              </div>
              <Badge variant="default">Connected</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
