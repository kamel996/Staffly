"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { addEmployee, updateEmployee } from "../app/actions/employees"
import { useFormState } from "react-dom"
import { Employee } from "@prisma/client"
import Image from "next/image"
import SubmitButton from "@/components/SubmitButton";
import BackButton from "./BackButton"
export function EmployeeForm({ employee }: { employee?: Employee | null }) {
    const [error, action] = useFormState(
        employee == null ? addEmployee : updateEmployee.bind(null, employee.id),
        {}
    );

    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setSelectedImage(file);
        }
    };

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
                <Input type="file" onChange={handleImageChange} id="image" name="image" accept="image/*" />
                {selectedImage ? (
                    <Image
                        src={URL.createObjectURL(selectedImage)}
                        height="400"
                        width="400"
                        alt="Employee Image"
                    />
                ) : employee && (
                    <Image
                        src={employee?.imagePath as string}
                        height="400"
                        width="400"
                        alt="Employee Image"
                    />
                )}
                {error.image && <div className="text-destructive">{error.image}</div>}
            </div>
            <div>
                <BackButton />
                &nbsp;
                <SubmitButton />
            </div>
        </form>
    )
}

