using System.Collections.Generic;
using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;

using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services.Interfaces;

namespace JiraAnalog.Core.Services
{
    public class JobService : IJobService
    {
        private readonly ApplicationDbContext _context;

        public JobService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<JobEntity>> GetAllAsync()
        {
            return await _context.Jobs.Include(x => x.Employee).ToListAsync();
        }

        public async Task<JobEntity> GetByIdAsync(int id)
        {
            return await _context.Jobs.Include(x => x.Employee).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<AddResult> AddAsync(JobEntity jobEntity)
        {
            _context.Jobs.Add(jobEntity);
            await _context.SaveChangesAsync();
            
            return new AddResult {ResultType = ResultTypes.Ok};
        }

        public async Task<ResultTypes> UpdateAsync(int id, JobEntity jobEntity)
        {
            jobEntity.Id = id;
            
            if (jobEntity.Id == null)
            {
                return ResultTypes.NotFound;
            }

            _context.Jobs.Update(jobEntity);
            await _context.SaveChangesAsync();

            return ResultTypes.Ok;
        }

        public async Task<ResultTypes> DeleteAsync(int id)
        {
            var job = await _context.Jobs.Include(x => x.Employee).FirstOrDefaultAsync(c => c.Id == id);
            
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();

            return ResultTypes.Ok;
        }
    }
}