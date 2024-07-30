"use client";
import { usePathname } from "next/navigation";
import { Heading } from "../atomic";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function Indicator() {
  const pathname = usePathname();
  return (
    <>
      <Heading $padding={"24px 0"}>{pathname}</Heading>
    </>
  );
}
