import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { db } from "@/db";
import { formatPrice } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { notFound } from "next/navigation";
import StatusDropdown from "./StatusDropdown";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Link from "next/link";

async function page() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

  if (!user || user.email !== ADMIN_EMAIL) {
    return notFound();
  }

  const orders = await db.order.findMany({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)), //last week
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: true,
      shippingAddress: true,
      configuration: true,
    },
  });

  const lastWeekSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 7)), //last week
      },
    },
    _sum: {
      amount: true,
    },
  });
  const lastMonthSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)), //last week
      },
    },
    _sum: {
      amount: true,
    },
  });
  const lastYearSum = await db.order.aggregate({
    where: {
      isPaid: true,
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 365)), //last week
      },
    },
    _sum: {
      amount: true,
    },
  });

  const WEEKLY_GOAL = 21000;
  const MONTHLY_GOAL = 84000;
  const YEARLY_GOAL = 100000000;

  return (
    <MaxWidthWrapper>
      <div className="flex min-h-screen w-full bg-muted/40">
        <div className="mx-w-7xl w-full mx-auto flex flex-col sm:gap-4 sm:py-4">
          <div className="flex flex-col gap-16">
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>One Week</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatPrice(lastWeekSum._sum.amount! / 100 ?? 0)}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    of {formatPrice(WEEKLY_GOAL)} weekly goal
                  </div>
                </CardContent>

                <CardFooter>
                  <Progress
                    value={(lastWeekSum._sum.amount ?? 0) / WEEKLY_GOAL}
                  />
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>One Month</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatPrice(lastMonthSum._sum.amount! / 100 ?? 0)}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    of {formatPrice(MONTHLY_GOAL)} monthly goal
                  </div>
                </CardContent>

                <CardFooter>
                  <Progress
                    value={(lastMonthSum._sum.amount ?? 0) / MONTHLY_GOAL}
                  />
                </CardFooter>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardDescription>One Year</CardDescription>
                  <CardTitle className="text-4xl">
                    {formatPrice(lastYearSum._sum.amount! / 100 ?? 0)}
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <div className="text-sm text-muted-foreground">
                    of {formatPrice(YEARLY_GOAL)} yearly goal
                  </div>
                </CardContent>

                <CardFooter>
                  <Progress
                    value={((lastYearSum._sum.amount ?? 0) * 100) / YEARLY_GOAL}
                  />
                </CardFooter>
              </Card>
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Incoming orders
            </h1>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className=" sm:table-cell">
                    Purchase Date
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className=" sm:table-cell">Status</TableHead>
                  <TableHead className="text-right">Original Image</TableHead>
                  <TableHead className="text-right">Cropped Image</TableHead>
                  <TableHead className="text-right">Color</TableHead>
                  <TableHead className="text-right">Back design</TableHead>
                  <TableHead className="text-right">Fabric</TableHead>
                  <TableHead className="text-right">Fringe</TableHead>
                  <TableHead className="text-right">Order ID</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className=" md:table-cell">
                      {order.createdAt.toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium">
                        {order.shippingAddress?.name}
                      </div>
                      <div className=" text-sm text-muted-foreground md:inline">
                        {order.user.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      {formatPrice(order.amount! / 100 ?? 0)}
                    </TableCell>
                    <TableCell className=" md:table-cell">
                      <StatusDropdown
                        id={order.id}
                        orderStatus={order.status}
                      ></StatusDropdown>
                    </TableCell>
                    <TableCell className="text-right">
                      {order.configuration.imageUrl ? (
                        <Link
                          href={order.configuration.imageUrl}
                          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                          prefetch={false}
                        >
                          Go to Image
                        </Link>
                      ) : (
                        <span>No Image Available</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.configuration.croppedImageUrl ? (
                        <Link
                          href={order.configuration.croppedImageUrl}
                          className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                          prefetch={false}
                        >
                          Go to Cropped Image
                        </Link>
                      ) : (
                        <span>No Image Available</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.configuration.color}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.configuration.backDesign}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.configuration.fabric}
                    </TableCell>
                    <TableCell className="text-right">
                      {order.configuration.fringe}
                    </TableCell>
                    <TableCell className="text-right">{order.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
