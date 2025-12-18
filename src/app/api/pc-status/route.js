import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const table = searchParams.get("table");
    const pc = searchParams.get("pc");

    if (!table || !pc) {
      return NextResponse.json(
        { error: "Table and PC are required" },
        { status: 400 }
      );
    }

    const stmt = db.prepare(`
      SELECT components_name, avalibility, working
      FROM component_status
      WHERE table_name = ? AND pc_name = ?
    `);

    const rows = stmt.all(table, pc);

    return NextResponse.json({
      table,
      pc,
      components: rows,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { tableName, pcName, components } = body;

    if (!tableName || !pcName || !components || !components.length) {
      return NextResponse.json(
        { error: "Missing table, PC, or components" },
        { status: 400 }
      );
    }

    const stmt = db.prepare(`
      UPDATE component_status
      SET working = ?, avalibility = ?
      WHERE table_name = ? AND pc_name = ? AND components_name = ?
    `);

    const update = db.transaction((comps) => {
      comps.forEach((c) =>
        stmt.run(c.working, c.avalibility, tableName, pcName, c.components_name)
      );
    });

    update(components);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}