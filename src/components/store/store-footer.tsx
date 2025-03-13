import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="w-full py-10 px-4">
      <div className="border-t border-foreground/15 pt-12 pb-8">
        <div className="max-w-md mx-auto text-center">
          <h3 className="text-foreground text-lg mb-4">
            Join the CoseCom Experience
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            Subscribe to receive exclusive offers, early access to limited
            editions, and skincare insights.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-muted text-foreground/80 px-4 py-2 rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-300"
            />
            <Button className="px-6 py-2 rounded-lg">Subscribe</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-foreground/15 pt-8 mt-8 text-sm text-muted-foreground max-w-screen-lg mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* <p>© {`${new Date().getFullYear()}`} NVH®. All rights reserved.</p> */}
          <div className="flex gap-6">
            {/* <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a> */}
            {/* <a href="#" className="hover:text-foreground transition-colors">
              Shipping
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Returns
            </a> */}
            <span>
              Developed by{" "}
              <a
                target="_blank"
                href="https://dattarajdhadas.tech"
                className="underline underline-offset-4 hover:text-foreground transition-colors"
              >
                Dataraj
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
