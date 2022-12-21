using Microsoft.EntityFrameworkCore.Migrations;

namespace CPMS.Migrations
{
    public partial class third : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_Projects_Clients_ClientId",
                table: "Client_Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Client_Projects_Projects_ProjectId",
                table: "Client_Projects");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Client_Projects",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Client_Projects",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Projects_Clients_ClientId",
                table: "Client_Projects",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Projects_Projects_ProjectId",
                table: "Client_Projects",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Client_Projects_Clients_ClientId",
                table: "Client_Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_Client_Projects_Projects_ProjectId",
                table: "Client_Projects");

            migrationBuilder.AlterColumn<int>(
                name: "ProjectId",
                table: "Client_Projects",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ClientId",
                table: "Client_Projects",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Projects_Clients_ClientId",
                table: "Client_Projects",
                column: "ClientId",
                principalTable: "Clients",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Client_Projects_Projects_ProjectId",
                table: "Client_Projects",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
