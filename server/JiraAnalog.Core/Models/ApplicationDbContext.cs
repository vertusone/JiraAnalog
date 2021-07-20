using Microsoft.EntityFrameworkCore;

namespace JiraAnalog.Core.Models
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<EmployeeEntity> Employees { get; set; }
        public DbSet<JobEntity> Jobs { get; set; }
        public DbSet<AccountEntity> Accounts { get; set; }
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }
    }
}