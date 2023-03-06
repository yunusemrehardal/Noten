using Microsoft.EntityFrameworkCore;

namespace NotenApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        public DbSet<Note> Notes => Set<Note>();

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Note>().HasData(
                new Note() { Id = 1, Title = "Grocery List", Content = "Milk, Bread, Eggs" },
                new Note() { Id = 2, Title = "Travel Plans", Content = "Buy tickets, Make hotel reservations" },
                new Note() { Id = 3, Title = "To-Do List", Content = "Schedule doctor's appointment, Read a book" },
                new Note() { Id = 4, Title = "Project Ideas", Content = "Develop a mobile app, Create AI applications" }
            );
        }
    }
}
