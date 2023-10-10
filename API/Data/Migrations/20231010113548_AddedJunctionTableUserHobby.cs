using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddedJunctionTableUserHobby : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserHobby_AspNetUsers_UserId",
                table: "UserHobby");

            migrationBuilder.DropForeignKey(
                name: "FK_UserHobby_Hobbies_HobbyId",
                table: "UserHobby");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserHobby",
                table: "UserHobby");

            migrationBuilder.RenameTable(
                name: "UserHobby",
                newName: "UserHobbies");

            migrationBuilder.RenameIndex(
                name: "IX_UserHobby_UserId",
                table: "UserHobbies",
                newName: "IX_UserHobbies_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserHobbies",
                table: "UserHobbies",
                columns: new[] { "HobbyId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserHobbies_AspNetUsers_UserId",
                table: "UserHobbies",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserHobbies_Hobbies_HobbyId",
                table: "UserHobbies",
                column: "HobbyId",
                principalTable: "Hobbies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserHobbies_AspNetUsers_UserId",
                table: "UserHobbies");

            migrationBuilder.DropForeignKey(
                name: "FK_UserHobbies_Hobbies_HobbyId",
                table: "UserHobbies");

            migrationBuilder.DropPrimaryKey(
                name: "PK_UserHobbies",
                table: "UserHobbies");

            migrationBuilder.RenameTable(
                name: "UserHobbies",
                newName: "UserHobby");

            migrationBuilder.RenameIndex(
                name: "IX_UserHobbies_UserId",
                table: "UserHobby",
                newName: "IX_UserHobby_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_UserHobby",
                table: "UserHobby",
                columns: new[] { "HobbyId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_UserHobby_AspNetUsers_UserId",
                table: "UserHobby",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserHobby_Hobbies_HobbyId",
                table: "UserHobby",
                column: "HobbyId",
                principalTable: "Hobbies",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
