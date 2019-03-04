using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class add_StorePage_PurchaseInfoHeading : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PurchaseInfoHeading",
                table: "StorePage",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PurchaseInfoHeading",
                table: "StorePage");
        }
    }
}
