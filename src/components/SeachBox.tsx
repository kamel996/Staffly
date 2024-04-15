"use client"
import React from 'react';
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useDebouncedCallback} from "use-debounce";
import {Employee} from "@prisma/client";

type SearchBoxProps = {
    field: keyof Employee
}

export default function SearchBox({field} :SearchBoxProps) {
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const {replace} = useRouter();

    const handleSearch = useDebouncedCallback((e) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", "1")
        if (e.target.value) {
          params.set(field, e.target.value);
        } else {
            params.delete(field);
        }
        replace(`${pathName}?${params}`);
    }, 250);

    return (
        <div className="mb-3 md:w-48">
            <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                <input
                    type="text"
                    className="relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                    placeholder={`Search by ${field}`}
                    onChange={e => handleSearch(e)}
                    aria-label="Search"
                    aria-describedby="search-button" />

            </div>
        </div>
    );
}