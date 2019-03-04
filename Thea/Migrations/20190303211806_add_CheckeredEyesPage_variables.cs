using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class add_CheckeredEyesPage_variables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AttentionLowVissionBlockTitle",
                table: "CheckeredEyesPages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AttentionSightedBlockTitle",
                table: "CheckeredEyesPages",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SymbolUseBlockTitle",
                table: "CheckeredEyesPages",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AttentionLowVissionBlockTitle",
                table: "CheckeredEyesPages");

            migrationBuilder.DropColumn(
                name: "AttentionSightedBlockTitle",
                table: "CheckeredEyesPages");

            migrationBuilder.DropColumn(
                name: "SymbolUseBlockTitle",
                table: "CheckeredEyesPages");
        }
    }
}
