"use client";
import { useGetTodos } from "@/features/todos/api/use-get-todos";
import { AlertTriangle, Loader } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import useLogout from "../../hooks/use-logout";

export const Test = () => {
  const { data, isLoading, isError } = useGetTodos();
  const { logout } = useLogout();
  return (
    <div className="space-y-4">
      {isLoading && (
        <div className="flex items-center justify-center flex-1">
          <Loader className="size-4 text-muted-foreground animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1">
          <AlertTriangle className="size-4 text-muted-foreground" />
          <p className="text-muted-foreground text-xs">
            Failed to fetch images
          </p>
        </div>
      )}
      {data?.map((todo) => (
        <div key={todo.id}>
          <p>{todo.title}</p>
        </div>
      ))}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
