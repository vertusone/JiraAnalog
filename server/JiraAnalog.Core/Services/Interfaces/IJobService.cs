using System.Collections.Generic;
using System.Threading.Tasks;

using JiraAnalog.Core.Models;

namespace JiraAnalog.Core.Services.Interfaces
{
    public interface IJobService
    {
        Task<List<JobEntity>> GetAllAsync();
        Task<JobEntity> GetByIdAsync(int id); 
        Task<AddResult> AddAsync(JobEntity jobEntity);
        Task<ResultTypes> UpdateAsync(int id, JobEntity jobEntity);
        Task<ResultTypes> DeleteAsync(int id);
    }
}