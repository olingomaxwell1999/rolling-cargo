import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface CustomAlertProps {
  onClose: () => void;
}

export const CustomAlert: React.FC<CustomAlertProps> = ({ onClose }) => {
  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>ANNOUNCEMENT!</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          We're excited to announce our new service updates...
        </AlertDialogDescription>
        <Button onClick={onClose}>Close</Button>
      </AlertDialogContent>
    </AlertDialog>
  );
};
