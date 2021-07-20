using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace JiraAnalog.Core.Models
{
    public class JobEntity
    {
        [Key]
        public int Id { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string Name { get; set; }
        
        [Column(TypeName ="nvarchar(100)")]
        public string Description { get; set; }

        public int? EmployeeId { get; set; }

        public EmployeeEntity Employee { get; set; }
    }
}