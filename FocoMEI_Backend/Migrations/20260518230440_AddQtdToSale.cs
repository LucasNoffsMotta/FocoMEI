using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FocoMEI_Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddQtdToSale : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Quantidade",
                table: "Sales",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Quantidade",
                table: "Sales");
        }
    }
}
