using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class addHomePage_MissionStatementBlockSubHeading : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MissionStatementBlockSubHeading",
                table: "HomePage",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MissionStatementBlockSubHeading",
                table: "HomePage");
        }
    }
}
