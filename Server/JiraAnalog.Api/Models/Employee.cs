using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiraAnalog.Api.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string FirstName { get; set; }
        
        [Column(TypeName ="nvarchar(100)")]
        public string LastName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Email { get; set; }

        public int Age { get; set; }

        public int? JobId { get; set; }
        
        public Job Job { get; set; }
    }
}