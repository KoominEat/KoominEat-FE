"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";

type LayerPopupProps = {
  trigger?: React.ReactNode;
  title: string;
  description?: string;
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

const LayerPopup = ({
  trigger,
  title,
  children,
  open,
  onOpenChange,
}: LayerPopupProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}

      <DialogContent className="max-w-sm px-4 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-start p-2 pt-3 leading-6">
            {title}
          </DialogTitle>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default LayerPopup;
