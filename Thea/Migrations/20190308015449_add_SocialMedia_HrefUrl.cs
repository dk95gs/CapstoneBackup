using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class add_SocialMedia_HrefUrl : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "SrcURL",
                table: "SocialMedia",
                newName: "HrefUrl");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HrefUrl",
                table: "SocialMedia",
                newName: "SrcURL");
        }
    }
}
