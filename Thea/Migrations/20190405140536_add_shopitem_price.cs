using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class add_shopitem_price : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "c0b96b80-7c91-4cc0-9b1e-6baceece1ca6", "45c520ca-5f32-4213-9c3f-b1626501487b" });

            migrationBuilder.AddColumn<double>(
                name: "Price",
                table: "ShopItems",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "0f65e2e5-4400-4d0b-9fa6-5d440067a03e", "fd5dd6b9-a942-4a51-aaf7-3b498a18dfd1", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "0f65e2e5-4400-4d0b-9fa6-5d440067a03e", "fd5dd6b9-a942-4a51-aaf7-3b498a18dfd1" });

            migrationBuilder.DropColumn(
                name: "Price",
                table: "ShopItems");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c0b96b80-7c91-4cc0-9b1e-6baceece1ca6", "45c520ca-5f32-4213-9c3f-b1626501487b", "Admin", "ADMIN" });
        }
    }
}
