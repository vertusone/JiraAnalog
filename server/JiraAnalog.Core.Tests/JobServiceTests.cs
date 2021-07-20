using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using JiraAnalog.Core;
using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services;

namespace JiraAnalog.Api.Tests
{
    [TestClass]
    public class JobServiceTests
    {
        [TestMethod]
        public async Task AddingJobReturnsOkResult()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            JobService jobService = new JobService(context);

            JobEntity jobEntity = new JobEntity {Name = "Bug", Description = "Hard"};

            //Act
            AddResult result = await jobService.AddAsync(jobEntity);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, result.ResultType);
        }
        
        [TestMethod]
        public async Task UpdatingJobReturnsOkResult()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            JobService jobService = new JobService(context);

            JobEntity oldJobEntity = new JobEntity {Name = "Feature", Description = "Hard"};
            JobEntity newJobEntity = new JobEntity {Name = "Bug", Description = "Hard"};

            // Act
            await jobService.AddAsync(oldJobEntity);
            ResultTypes result = await jobService.UpdateAsync(newJobEntity.Id, newJobEntity);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, result);
        }
    }
}