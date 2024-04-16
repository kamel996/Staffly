import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {CheckCircle2, MoreVertical, XCircle} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {ActiveToggleDropdownItem, DeleteDropdownItem} from "@/components/Actions";
import {Employee} from "@prisma/client";
import SearchBox from "@/components/SeachBox";
import Image from "next/image";

type EmployeeTableProps = {
    employees: Employee[];
}

export function EmployeesTable({ employees }: EmployeeTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        Name
                        <SearchBox field={"name"} />
                    </TableHead>
                    <TableHead>
                        Email
                       <SearchBox field={"email"} />
                    </TableHead>
                    <TableHead>
                        Location
                        <SearchBox field={"location"} />
                    </TableHead>
                    <TableHead>
                        Department
                        <SearchBox field={"department"} />
                    </TableHead>
                    <TableHead>
                        Image
                    </TableHead>
                    <TableHead className={"w-3"}>Active</TableHead>
                    <TableHead className="w-0">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            {employees.length === 0 ?
                (
                    <TableBody>
                         <TableRow>
                        <TableCell>No employees found</TableCell>
                        </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                        {employees.map(employee => (
                            
                            <TableRow key={employee.id}>

                                <TableCell>{employee.name}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.location}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>
                                    <Image
                                        src={employee.imagePath}
                                        height="75"
                                        width="75"
                                        alt="Employee Image"
                                        style={{ width: '75px', height: '75px' }}
                                    />
                                </TableCell>
                                <TableCell>
                                    {employee.isActive ? (
                                        <>
                                            <span className="sr-only">Active</span>
                                            <CheckCircle2 />
                                        </>
                                    ) : (
                                        <>
                                            <span className="sr-only">Disabled</span>
                                            <XCircle className="stroke-destructive" />
                                        </>
                                    )}
                                </TableCell>
                                <TableCell>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical />
                                            <span className="sr-only">Actions</span>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem asChild>
                                                <Link href={`/${employee.id}/edit`}>
                                                    Edit
                                                </Link>
                                            </DropdownMenuItem>
                                            <ActiveToggleDropdownItem
                                                id={employee.id}
                                                isActive={employee.isActive}
                                            />
                                            <DropdownMenuSeparator />
                                            <DeleteDropdownItem
                                                id={employee.id}
                                            />
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
            )}

        </Table>
    )
}