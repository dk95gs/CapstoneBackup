using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class modify_ContactInfo_add_PostalCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PostalCode",
                table: "ContactInfo",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "ContactInfo");
        }
    }
}
