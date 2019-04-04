using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class add_comment_postedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "d83861cc-a7e9-402c-bf05-3a984ce21b9f", "6a5a7c9d-7116-47b2-a0f7-6198b7c2f4b8" });

            migrationBuilder.AddColumn<DateTime>(
                name: "PostedDate",
                table: "Comment",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "c0b96b80-7c91-4cc0-9b1e-6baceece1ca6", "45c520ca-5f32-4213-9c3f-b1626501487b", "Admin", "ADMIN" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumns: new[] { "Id", "ConcurrencyStamp" },
                keyValues: new object[] { "c0b96b80-7c91-4cc0-9b1e-6baceece1ca6", "45c520ca-5f32-4213-9c3f-b1626501487b" });

            migrationBuilder.DropColumn(
                name: "PostedDate",
                table: "Comment");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[] { "d83861cc-a7e9-402c-bf05-3a984ce21b9f", "6a5a7c9d-7116-47b2-a0f7-6198b7c2f4b8", "Admin", "ADMIN" });
        }
    }
}
