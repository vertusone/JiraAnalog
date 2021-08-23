using System;
using System.ComponentModel.DataAnnotations;
using JiraAnalog.Core.Enums;

namespace JiraAnalog.Api.Models
{
    public class Job
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "The name is required")]
        public string Name { get; set; }
        
        public string Description { get; set; }

        public JobStatus Status { get; set; }
        
        [DataType(DataType.Date)]
        [Required(ErrorMessage = "The deadline is required")]
        public DateTime Deadline { get; set; }

        public int? EmployeeId { get; set; }

        public EmployeeType Employee { get; set; }
    }
}