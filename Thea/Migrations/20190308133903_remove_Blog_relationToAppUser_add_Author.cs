using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class remove_Blog_relationToAppUser_add_Author : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Blog_AspNetUsers_AppUserId",
                table: "Blog");

            migrationBuilder.DropIndex(
                name: "IX_Blog_AppUserId",
                table: "Blog");

            migrationBuilder.RenameColumn(
                name: "AppUserId",
                table: "Blog",
                newName: "Author");

            migrationBuilder.AlterColumn<string>(
                name: "Author",
                table: "Blog",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Author",
                table: "Blog",
                newName: "AppUserId");

            migrationBuilder.AlterColumn<string>(
                name: "AppUserId",
                table: "Blog",
                nullable: true,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Blog_AppUserId",
                table: "Blog",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Blog_AspNetUsers_AppUserId",
                table: "Blog",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
