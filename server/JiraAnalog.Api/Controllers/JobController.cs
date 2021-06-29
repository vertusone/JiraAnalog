using System.Collections.Generic;
using System.Threading.Tasks;
using JiraAnalog.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace JiraAnalog.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : Controller
    {
        private readonly ApplicationDbContext _context;

        public JobController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: Job
        [HttpGet]
        public async Task<ActionResult<List<Job>>> GetAll()
        {
            var jobs = await _context.Jobs.Include(x => x.Employee).ToListAsync();
            
            return jobs;
        }

        // GET: Job/Details/
        [HttpGet("{id}")]
        public async Task<ActionResult<Job>> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var job = await _context.Jobs.Include(x => x.Employee).FirstOrDefaultAsync(c => c.Id == id);
            
            if (job == null)
            {
                return NotFound();
            }

            return job;
        }

        // GET: Job/Create
        [HttpPost]
        public async Task<ActionResult<Job>> Create(Job job)
        {
            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();

            var result = CreatedAtAction("GetAll", new {Id = job.Id}, job);
            
            return result;
        }

        // GET: Job/Edit/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Edit(int id, Job job)
        {
            job.Id = id;
            
            _context.Entry(job).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: Job/Delete/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Job>> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var job = await _context.Jobs.Include(x => x.Employee).FirstOrDefaultAsync(c => c.Id == id);

            if (job == null)
            {
                return NotFound();
            }
            else
            {
                _context.Jobs.Remove(job);
            }
            
            await _context.SaveChangesAsync();
            
            return Ok();
        }
    }
}