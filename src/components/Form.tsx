"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { addEmployee, updateEmployee } from "../app/actions/employees"
import { useFormState, useFormStatus } from "react-dom"
import { Employee } from "@prisma/client"
import Image from "next/image"
import SubmitButton from "@/components/SubmitButton";

export function EmployeeForm({ employee }: { employee?: Employee | null }) {
    const [error, action] = useFormState(
        employee == null ? addEmployee : updateEmployee.bind(null, employee.id),
        {}
    )

    return (
        <form action={action} className="space-y-8">
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                    type="text"
                    id="name"
                    name="name"
                    required
                    defaultValue={employee?.name || ""}
                />
                {error.name && <div className="text-destructive">{error.name}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    name="email"
                    required
                    defaultValue={employee?.email || ""}
                />
                {error.email && <div className="text-destructive">{error.email}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                    type="text"
                    id="location"
                    name="location"
                    required
                    defaultValue={employee?.location || ""}
                />
                {error.location && <div className="text-destructive">{error.location}</div>}
            </div>

            <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input
                    type="text"
                    id="department"
                    name="department"
                    required
                    defaultValue={employee?.department || ""}
                />
                {error.department && <div className="text-destructive">{error.department}</div>}
            </div>


            <div className="space-y-2">
                <Label htmlFor="image">Image</Label>
                <Input type="file" id="image" name="image" required={employee == null} />
                {employee != null && (
                    <Image
                        src={employee.imagePath}
                        height="400"
                        width="400"
                        alt="Employee Image"
                    />
                )}
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <SubmitButton />
        </form>
    )
}

