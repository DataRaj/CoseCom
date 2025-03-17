        {/* <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 p-2">
            {["name", "email", "phoneNumber", "addressLine", "zipcode", "city", "state"].map((field) => (
              // @ts-ignore
              <FormField key={field} control={form.control} name={field} render={({ field }) => (
                <FormItem>
                  <FormLabel>{field.name.replace(/([A-Z])/g, " $1").trim()}</FormLabel>
                  <FormControl><Input placeholder={`Enter ${field.name}`} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            ))}
            <FormField disabled control={form.control} name="country" render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormDescription>Only India is supported currently</FormDescription>
                <FormMessage />
              </FormItem>
            )} />
            <Button type="submit" className="rounded-md px-4 py-2 text-white" disabled={form.formState.isSubmitting || cart.length === 0}>
              {form.formState.isSubmitting ? <div className="flex gap-2"><span>Loading</span><Loader2 className="animate-spin" /></div> : "Buy Now"}
            </Button>
          </form>
        </Form> */}
