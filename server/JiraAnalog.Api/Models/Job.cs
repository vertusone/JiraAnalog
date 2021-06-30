using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiraAnalog.Api.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string Name { get; set; }
        
        [Column(TypeName ="nvarchar(100)")]
        public string Description { get; set; }

        public ICollection<Employee> Employees { get; set; }
    }
}