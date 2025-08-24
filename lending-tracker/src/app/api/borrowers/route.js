import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all borrowers
export async function GET() {
  try {
    const borrowers = await prisma.borrower.findMany();
    return new Response(JSON.stringify(borrowers), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch borrowers" }), { status: 500 });
  }
}

// POST - create a borrower
export async function POST(req) {
  try {
    const body = await req.json();
    const newBorrower = await prisma.borrower.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    });
    return new Response(JSON.stringify(newBorrower), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to create borrower" }), { status: 500 });
  }
}

// PUT - update borrower
export async function PUT(req) {
  try {
    const body = await req.json();
    const updatedBorrower = await prisma.borrower.update({
      where: { id: body.id },
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
      },
    });
    return new Response(JSON.stringify(updatedBorrower), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to update borrower" }), { status: 500 });
  }
}

// DELETE - delete borrower
export async function DELETE(req) {
  try {
    const body = await req.json();
    await prisma.borrower.delete({
      where: { id: body.id },
    });
    return new Response(JSON.stringify({ message: "Borrower deleted" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to delete borrower" }), { status: 500 });
  }
}
