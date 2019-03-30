using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class add_onModelCreating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "94d7eedc-2a7d-4b8d-a86e-b18aad9ba2f1", "b73d4bd2-fa9c-429c-a4d1-d99f7a175303", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "94d7eedc-2a7d-4b8d-a86e-b18aad9ba2f1", "b73d4bd2-fa9c-429c-a4d1-d99f7a175303" });
        }
    }
}
