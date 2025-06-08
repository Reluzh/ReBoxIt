
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Leaf, Apple, Users } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12">
      <Card className="w-full max-w-md shadow-soft-md">
        <CardHeader className="text-center">
          <Leaf className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-headline">Welcome Back!</CardTitle>
          <CardDescription>Log in to access your ReBoxIt account.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" required />
          </div>
          <div className="flex items-center justify-between text-sm">
            <Link href="#" className="text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <Button variant="outline" className="w-full">
              <Users className="mr-2 h-4 w-4" />
              Sign in with Google
            </Button>
            <Button variant="outline" className="w-full">
              <Apple className="mr-2 h-4 w-4" />
              Sign in with Apple
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full bg-primary hover:bg-primary/90">Log In</Button>
          <p className="text-sm text-center text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
