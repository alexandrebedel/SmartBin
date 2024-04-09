"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/app/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/app/components/ui/card";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Email invalide",
  }),
  password: z.string().min(4, { message: "Le mot de passe doit contenir aux moins 4 caracteres" }),
});

export function LoginForm() {
  const [loginError, setLoginError] = useState("");
  const router = useRouter();
  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onLogin(values: z.infer<typeof loginFormSchema>) {
    const res = await fetch("api/login", {
      method: "POST",
      body: JSON.stringify(values),
    });

    if (res.status === 200) router.push("/stats");
    else {
      const message = await res.json();
      setLoginError(message.message);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Make changes to your account here. Click save when you&apos;re done.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-8">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mot de passe</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <p className="text-red-700">{loginError}</p>
              <Button type="submit">Connexion</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
