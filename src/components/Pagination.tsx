"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {Button} from "@/components/ui/button";
import {ITEMS_PER_PAGE} from "@/constants/pagination";

const Pagination = ({ count } : {count: number}) => {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    const page = searchParams.get("page") as unknown as number || 1;

    const params = new URLSearchParams(searchParams);

    const hasPrev = ITEMS_PER_PAGE * ((page) - 1) > 0;
    const hasNext = ITEMS_PER_PAGE * ((page) - 1) + ITEMS_PER_PAGE < count;

    const handleChangePage = (type: "PREV" | "NEXT" ) => {
        type === "PREV"
            // @ts-ignore
            ? params.set("page", parseInt(page) - 1)
            // @ts-ignore
            : params.set("page", (parseInt(page) + 1));
        replace(`${pathname}?${params}`);
    };

    return (
        <div className={"flex p-1 justify-between"}>
            <Button
                disabled={!hasPrev}
                onClick={() => handleChangePage("PREV")}
            >
                Previous
            </Button>
            <Button
                disabled={!hasNext}
                onClick={() => handleChangePage("NEXT")}
            >
                Next
            </Button>
        </div>
    );
};

export default Pagination;