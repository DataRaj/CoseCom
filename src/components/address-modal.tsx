import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { Building, CheckCircle, ChevronLeft, ChevronRight, Home, MapPin, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

// Define the schema
const addressFormSchema = z.object({
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  zip: z.number()
    .min(6, "Zip code must be at least 5 characters")
    .max(6, "Zip code must not exceed 10 characters"),
    // .refine((val) => /^\d{5}(-\d{4})?$/.test(val), "Invalid zip code format"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

type AddressFormValues = z.infer<typeof addressFormSchema>;

type AddressModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormStep = {
  page: number;
  title: string;
  description: string;
  fields: (keyof AddressFormValues)[];
  icon: React.ReactNode;
};

const AddressModal = ({ open, onOpenChange }: AddressModalProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);
  // const { toast } = useToast();
  const router = useRouter();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressFormSchema),
    defaultValues: {
      address: '',
      city: '',
      state: '',
      zip: 0,
      country: '',
    },
  });

  const formSteps: FormStep[] = [
    {
      page: 1,
      title: "Where do you live?",
      description: "Enter your street address where you'd like deliveries to be sent.",
      fields: ['address'],
      icon: <Home className="h-6 w-6 text-blue-400" />,
    },
    {
      page: 2,
      title: "City & State",
      description: "Tell us about your city and state of residence.",
      fields: ['city', 'state'],
      icon: <Building className="h-6 w-6 text-green-400" />,
    },
    {
      page: 3,
      title: "Postal Information",
      description: "Complete your address with ZIP code and country.",
      fields: ['zip', 'country'],
      icon: <MapPin className="h-6 w-6 text-purple-400" />,
    },
  ];

  // Check if user already has an address when modal opens
  useEffect(() => {
    if (open) {
      setCurrentPage(0);
      checkExistingAddress();
    }
  }, [open]);

  const checkExistingAddress = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/address`);
      const data = await response.json();

      if (data.addresses && data.addresses.length > 0) {
        setHasAddress(true);
        onOpenChange(false);
      } else {
        setHasAddress(false);
      }
    } catch (error) {
      console.error("Error checking address:", error);
    }
  };

  // Handle form submission
  const onSubmit = async (values: AddressFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/address`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to save address');
      }

      toast.success(
        // title: "Address saved",
        "Your address has been saved successfully.",
        // variant: "default",
      );

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      toast(
        // title: "Error",
         "Failed to save your address. Please try again."
        // variant: "destructive",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle navigation
  const goToPage = (newPage: number) => {
    const currentFields = formSteps[currentPage].fields;

    // When moving forward, validate the current fields
    if (newPage > currentPage) {
      const isValid = currentFields.every(field => {
        const fieldState = form.getFieldState(field);
        form.trigger(field);
        return !form.getFieldState(field).invalid;
      });

      if (!isValid) {
        return;
      }
    }

    if (newPage >= 0 && newPage < formSteps.length) {
      setDirection(newPage > currentPage ? 1 : -1);
      setCurrentPage(newPage);
    }
  };

  const isLastStep = currentPage === formSteps.length - 1;

  // Animation variants
  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0
    })
  };

  // Progress indicator component
  const ProgressIndicator = () => (
    <div className="flex justify-center mt-4 space-x-2">
      {formSteps.map((_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index)}
          className={`h-2 rounded-full transition-all duration-300 ${
            index === currentPage
              ? 'w-8 bg-blue-600'
              : index < currentPage
                ? 'w-2 bg-blue-400'
                : 'w-2 bg-gray-600 hover:bg-gray-500'
          }`}
          aria-label={`Go to step ${index + 1}`}
          type="button"
        />
      ))}
    </div>
  );

  // If user already has an address, don't show the modal
  if (hasAddress) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-gray-950 border-4 border-gray-700 shadow-lg shadow-card text-gray-100 p-0 overflow-hidden">
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={() => onOpenChange(false)}
            className="rounded-full bg-gray-800 p-2 hover:bg-gray-700 transition-colors"
            type="button"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="h-full w-full">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentPage}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="w-full"
              >
                <div className="relative min-h-[40vh] flex flex-col p-6 bg-gray-950">
                  {/* Step number indicator with animated background */}
                  <div className="absolute top-2 left-2 w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 bg-gray-800 opacity-70 rounded-br-3xl" />
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.3 }}
                      className="flex items-center justify-center z-10"
                    >
                      {formSteps[currentPage].icon}
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="mt-12 flex flex-col space-y-6">
                    <motion.h2
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.1, duration: 0.4 }}
                      className="text-3xl font-bold text-white"
                    >
                      {formSteps[currentPage].title}
                    </motion.h2>

                    <motion.p
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.15, duration: 0.4 }}
                      className="text-gray-400"
                    >
                      {formSteps[currentPage].description}
                    </motion.p>

                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2, duration: 0.4 }}
                      className="space-y-4 mt-4"
                    >
                      {formSteps[currentPage].fields.map((field) => (
                        <FormField
                          key={field}
                          control={form.control}
                          name={field}
                          render={({ field: fieldProps }) => (
                            <FormItem>
                              <FormLabel className="text-gray-300">
                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, " $1")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder={`Enter your ${field}`}
                                  className="bg-gray-800 border-gray-700 text-white focus:ring-blue-500 focus:border-blue-500"
                                  {...fieldProps}
                                />
                              </FormControl>
                              <FormMessage className="text-red-400" />
                            </FormItem>
                          )}
                        />
                      ))}
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Progress indicators and navigation */}
            <div className="border-t border-gray-800 p-4 bg-gray-950">
              <ProgressIndicator />

              <div className="flex justify-between mt-4">
                <Button
                  type="button"
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 0 || isSubmitting}
                  variant="outline"
                  className={`flex items-center gap-2 ${
                    currentPage === 0
                      ? 'opacity-50 cursor-not-allowed bg-gray-800 text-gray-500'
                      : 'bg-gray-800 text-gray-200 hover:bg-gray-700 border-gray-700'
                  }`}
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span>Previous</span>
                </Button>

                {isLastStep ? (
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSubmitting ? (
                      <div className="animate-spin h-5 w-5 border-2 border-gray-300 border-t-white rounded-full" />
                    ) : (
                      <CheckCircle className="h-5 w-5" />
                    )}
                    <span>Save Address</span>
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => goToPage(currentPage + 1)}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;
