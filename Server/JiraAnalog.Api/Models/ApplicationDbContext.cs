using Microsoft.EntityFrameworkCore;

namespace JiraAnalog.Api.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Job> Jobs { get; set; }
        public DbSet<Account> Accounts { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .Entity<Job>()
                .HasOne(u => u.Employee)
                .WithOne(p => p.Job)
                .HasForeignKey<Employee>(p => p.JobId);
        }

        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }
    }
}