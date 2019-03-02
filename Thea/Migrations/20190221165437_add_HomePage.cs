using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Thea.Migrations
{
    public partial class add_HomePage : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "HomePage",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    WelcomeBlockHeading = table.Column<string>(nullable: true),
                    WelcomeBlockSubHeading = table.Column<string>(nullable: true),
                    WelcomeBlockContent = table.Column<string>(nullable: true),
                    MissionStatementBlockHeading = table.Column<string>(nullable: true),
                    MissionStatementBlockContent = table.Column<string>(nullable: true),
                    EmbededVideoUrl = table.Column<string>(nullable: true),
                    VideoDescription = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HomePage", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "HomePage");
        }
    }
}
