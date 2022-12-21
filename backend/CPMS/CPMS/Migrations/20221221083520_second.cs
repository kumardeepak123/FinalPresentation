using Microsoft.EntityFrameworkCore.Migrations;

namespace CPMS.Migrations
{
    public partial class second : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Team_Employees_EmployeeId",
                table: "Team_Employees");

            migrationBuilder.DropIndex(
                name: "IX_Team_Employees_TeamId",
                table: "Team_Employees");

            migrationBuilder.CreateIndex(
                name: "IX_Team_Employees_EmployeeId",
                table: "Team_Employees",
                column: "EmployeeId");

            migrationBuilder.CreateIndex(
                name: "IX_Team_Employees_TeamId",
                table: "Team_Employees",
                column: "TeamId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Team_Employees_EmployeeId",
                table: "Team_Employees");

            migrationBuilder.DropIndex(
                name: "IX_Team_Employees_TeamId",
                table: "Team_Employees");

            migrationBuilder.CreateIndex(
                name: "IX_Team_Employees_EmployeeId",
                table: "Team_Employees",
                column: "EmployeeId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Team_Employees_TeamId",
                table: "Team_Employees",
                column: "TeamId",
                unique: true);
        }
    }
}
