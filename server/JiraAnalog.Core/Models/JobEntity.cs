using System;
using JiraAnalog.Core.Enums;

namespace JiraAnalog.Core.Models
{
    public class JobEntity
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public JobStatus Status { get; set; }
        
        public DateTime Deadline { get; set; }

        public int? EmployeeId { get; set; }

        public EmployeeEntity Employee { get; set; }
    }
}