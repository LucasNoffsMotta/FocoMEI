using FocoMEI_Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace FocoMEI_Backend.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<Product> Products { get; set; }


        public DbSet<Sale> Sales { get; set; }


        public DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.EnableSensitiveDataLogging(true);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Product>().HasData(
                new { Id = 1, Description = "Empadinha", Value = 10.0m },
                 new { Id = 2, Description = "Coxinha", Value = 7.0m }
                );

            modelBuilder.Entity<User>().HasData(
               new { Id = 1, Name = "Ivone" }
            );
        }
    }
}
