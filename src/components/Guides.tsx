"use client";
import { useGetGuides } from "@/features/ai/use-get-guides";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Ellipsis, Trash } from "lucide-react";
import { useDeleteGuide } from "@/features/ai/use-delete-guide";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface GuideListProps {
  isGenerating: boolean;
}

const GuidesList = ({ isGenerating }: GuideListProps) => {
  const { data, error, isLoading, isFetching } = useGetGuides();
  const mutation = useDeleteGuide();

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault(); // Prevent the Link from being followed
    e.stopPropagation(); // Stop the click event from bubbling up
    mutation.mutate({ id });
  };

  if (isLoading || isFetching || isGenerating) {
    return (
      <div className="mt-6">
        <h2 className="text-xl font-semibold leading-none tracking-tight">
          Recent blogs
        </h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {Array.from({ length: 2 }).map((_, index: number) => (
            <Card key={index} className="w-full p-4 mb-6">
              <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-3 space-y-0">
                <div className="space-y-1">
                  <Skeleton className="w-full h-[24px] rounded" />
                  <Skeleton className="w-full h-[16px] rounded" />
                </div>
                <div className="ml-20">
                  <Skeleton className="w-[60px] h-[16px] rounded" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <Skeleton className="w-[60px] h-[16px] rounded" />
                  <Skeleton className="w-[40px] h-[16px] rounded" />
                  <Skeleton className="w-[80px] h-[16px] rounded" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold leading-none tracking-tight">
        Recent blogs
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {data?.map((blog: any) => (
          <Link href={`/guides/${blog.id}`} key={blog.id}>
            <Card
              key={blog.id}
              className="w-full max-h-[400px] h-full p-4 cursor-pointer"
            >
              <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-3 space-y-0">
                <div className="space-y-1">
                  <CardTitle>{blog.title}</CardTitle>
                  <CardDescription>{blog.description}</CardDescription>
                </div>
                <div className="ml-20">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="secondary"
                        onClick={(e) => e.preventDefault()}
                        className="shadow-none"
                      >
                        <Ellipsis className="h-4 w-4 text-secondary-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      alignOffset={-5}
                      className="w-[200px]"
                      forceMount
                      onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={(e) => handleDeleteClick(e, blog.id)}
                        className="cursor-pointer"
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                  <span>{blog.steps.length} steps</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
      {data && data.length === 0 && (
        <h1 className="mt-10 text-2xl font-semibold text-center spaace-y-1">
          No guides found.
          <br />
          Start by creating a guide by above form
        </h1>
      )}
    </div>
  );
};

export default GuidesList;
