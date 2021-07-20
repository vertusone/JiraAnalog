using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Mapster;
using JiraAnalog.Api.Models;
using JiraAnalog.Core;
using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services.Interfaces;

namespace JiraAnalog.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JobController : Controller
    {
        private readonly IJobService _jobService;

        public JobController(IJobService jobService)
        {
            _jobService = jobService;
        }

        // GET: api/job
        [HttpGet]
        public async Task<ActionResult> GetAsync()
        {
            List<JobEntity> jobEntity = await _jobService.GetAllAsync();

            var jobs = jobEntity.Adapt<List<Job>>();

            return Ok(jobs);
        }

        // GET: api/job/{id}
        [HttpGet]
        [Route("{id:int}")]
        public async Task<ActionResult<Job>> GetAsync(int id)
        {
            JobEntity jobEntity = await _jobService.GetByIdAsync(id);

            var job = jobEntity.Adapt<Job>();

            if (job == null)
            {
                return NotFound();
            }

            return job;
        }

        // POST: api/job/
        [HttpPost]
        public async Task<ActionResult<Job>> AddAsync(Job job)
        {
            AddResult result = await _jobService.AddAsync(job.Adapt<JobEntity>());

            return result.ResultType switch
            {
                ResultTypes.Duplicate => BadRequest(),
                ResultTypes.Ok => Ok(),
                _ => StatusCode(StatusCodes.Status501NotImplemented)
            };
        }

        // PUT: api/job/{id}
        [HttpPut]
        [Route("{id:int}")]
        public async Task<ActionResult> UpdateAsync(int id, Job job)
        {
            ResultTypes result = await _jobService.UpdateAsync(id, job.Adapt<JobEntity>());

            if (result == ResultTypes.NotFound)
            {
                return NotFound();
            }

            return Ok();
        }

        // DELETE: api/job/{id}
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<ActionResult<Job>> DeleteAsync(int id)
        {
            ResultTypes result = await _jobService.DeleteAsync(id);

            if (result == ResultTypes.NotFound)
            {
                return NotFound();
            }

            return Ok();
        }
    }
}