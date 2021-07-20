namespace JiraAnalog.Api.Models
{
    public class JobType
    {
        public int Id { get; set; }

        public string Name { get; set; }
        
        public string Description { get; set; }

        public int? EmployeeId { get; set; }
    }
}