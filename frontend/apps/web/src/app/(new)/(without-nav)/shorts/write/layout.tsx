import React from "react";
import { Pencil } from "lucide-react";
import DetailHeader from "@/components/@new/layouts/headers/DetailHeader";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DetailHeader
        {...{
          title: (
            <>
              <Pencil />
              쇼츠 작성
            </>
          ),
        }}
      />
      {children}
    </>
  );
}