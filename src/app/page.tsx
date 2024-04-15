import { Button } from "@/components/ui/button"
import Link from "next/link"
import db from "@/db/db"
import {PageHeader} from "@/components/PageHeader";
import {cache} from "@/lib/cache";
import {EmployeesTable} from "@/components/EmployeeTable";
import Pagination from "@/components/Pagination";
import {ITEMS_PER_PAGE} from "@/constants/pagination";

type SearchParams = {
    name: string;
    email: string;
    location: string;
    department: string
    page: number
}

type AdminEmployeesPageProps = {
    searchParams: SearchParams
}

export default  async  function AdminEmployeesPage({ searchParams } :AdminEmployeesPageProps) {

    const {name, email, location, department, page = 1} = searchParams;

    const getEmployees = async () => {

        const filters = {
            ...(name && { name: { contains: name } }),
            ...(email && { email: { contains: email } }),
            ...(location && { location: { contains: location } }),
            ...(department && { department: { contains: department } }),
        };

        const totalCount = await db.employee.count({ where: filters });
        const employees = await db.employee.findMany({
            orderBy: { name: "asc" },
            where: filters,
            take: ITEMS_PER_PAGE,
            skip: ITEMS_PER_PAGE * (page - 1),
        })

        return {
            employees,
            totalCount
        }
    };

    const { employees, totalCount } = await getEmployees();

  return (
      <>
        <div className="flex justify-between items-center gap-4">
          <PageHeader>Employees</PageHeader>
          <Button asChild>
            <Link href={"/new"}>Add Employee</Link>
          </Button>
        </div>
        <EmployeesTable employees={employees}  />
          <Pagination count={totalCount} />
      </>
  )
}


