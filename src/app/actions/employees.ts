"use server"

import db from "@/db/db"
import { z } from "zod"
import fs from "fs/promises"
import { notFound, redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import cloudinary from "@/db/cloudinary";

const fileSchema = z.instanceof(File, { message: "Required" });

const imageSchema = fileSchema.refine(
    file => file.size === 0 || file.type.startsWith("image/")
)


const addSchema = z.object({
    name: z.string().min(1),
    department: z.string().min(1),
    email: z.string().min(1),
    location: z.string().min(1),
    image: imageSchema.refine(file => file.size > 0, "Required"),
})

export async function addEmployee(prevState: unknown, formData: FormData) {
    const result = addSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data

    const existingEmployee = await db.employee.findFirst({
        where: { email: data.email },
    });

    if (existingEmployee) {
        return { email: "Email already exists, Please use another Email" } as any
    }


    const file = data.image;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const image = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, callResult) => {
            if(err){
                reject(err);
                return
            }
            resolve(callResult);
        } ).end(buffer)

    });



    await db.employee.create({
        data: {
            isActive: true,
            name: data.name,
            department: data.department,
            email: data.email,
            location: data.location,
            // @ts-ignore
            imagePath: image.url,
        },
    })

    revalidatePath("/")

    redirect("/")
}

const editSchema = addSchema.extend({
    file: fileSchema.optional(),
    image: imageSchema.optional(),
})

export async function updateEmployee(
    id: string,
    prevState: unknown,
    formData: FormData
) {
    const result = editSchema.safeParse(Object.fromEntries(formData.entries()))
    if (result.success === false) {
        return result.error.formErrors.fieldErrors
    }

    const data = result.data
    const employee = await db.employee.findUnique({ where: { id } })

    if (employee == null) return notFound()



    let imagePath = employee.imagePath
    if (data.image != null && data.image.size > 0) {
        await fs.unlink(`public${employee.imagePath}`)
        imagePath = `/employees/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(
            `public${imagePath}`,
            Buffer.from(await data.image.arrayBuffer())
        )
    }

    await db.employee.update({
        where: { id },
        data: {
            isActive: false,
            name: data.name,
            department: data.department,
            email: data.email,
            location: data.location,
            imagePath,
        },
    })

    revalidatePath("/")

    redirect("/")
}

export async function toggleEmployeeAvailability(
    id: string,
    isActive: boolean
) {
    await db.employee.update({ where: { id }, data: { isActive } })

    revalidatePath("/")
    }

export async function deleteEmployee(id: string) {
    const employee = await db.employee.delete({ where: { id } })

    if (employee == null) return notFound()

    await fs.unlink(`public${employee.imagePath}`)

    revalidatePath("/")
}