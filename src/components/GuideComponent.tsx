import { CircleIcon, StarIcon } from "@radix-ui/react-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useDeleteGuide } from "@/features/ai/use-delete-guide";

interface GuideProps {
  id: string;
  title: string;
  description: string;
}

export function GuideComp({ title, id, description }: GuideProps) {
  return (
    <Card className="w-[400px]">
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-3 space-y-0">
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            TypeScript
          </div>
          <div className="flex items-center">
            <StarIcon className="mr-1 h-3 w-3" />
            20k
          </div>
          <div>Updated April 2023</div>
        </div>
      </CardContent>
    </Card>
  );
}
