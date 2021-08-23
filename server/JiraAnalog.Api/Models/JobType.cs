using System;
using JiraAnalog.Core.Enums;

namespace JiraAnalog.Api.Models
{
    public class JobType
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Description { get; set; }
        
        public JobStatus Status { get; set; }
        
        public DateTime Deadline { get; set; }

        public int? EmployeeId { get; set; }
    }
}