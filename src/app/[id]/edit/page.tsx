import db from "@/db/db"
import {PageHeader} from "@/components/PageHeader";
import {EmployeeForm} from "@/components/Form";

export default async function EditEmployeePage({
                                                  params: { id },
                                              }: {
    params: { id: string }
}) {
    const employee = await db.employee.findUnique({ where: { id } })

    return (
        <>
            <PageHeader>Edit Employee</PageHeader>
            <EmployeeForm employee={employee} />
        </>
    )
}