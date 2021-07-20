using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using JiraAnalog.Core;
using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services;

namespace JiraAnalog.Api.Tests
{
    [TestClass]
    public class EmployeeServiceTests
    {
        [TestMethod]
        public async Task AddingEmployeeReturnsOkResult()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            EmployeeService employeeService = new EmployeeService(context);

            EmployeeEntity employeeEntity = new EmployeeEntity {FirstName = "Anna", Email = "asa@fd.ru", Age = 21};

            // Act
            AddResult result = await employeeService.AddAsync(employeeEntity);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, result.ResultType);
        }
        
        [TestMethod]
        public async Task AddingDuplicateEmployeeReturnsDuplicateResult()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            EmployeeService employeeService = new EmployeeService(context);

            EmployeeEntity employeeEntity = new EmployeeEntity {FirstName = "Anna", Email = "asa@fd.ru", Age = 21};

            // Act
            await employeeService.AddAsync(employeeEntity);
            AddResult result = await employeeService.AddAsync(employeeEntity);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, result.ResultType);
        }
            
        [TestMethod]
        public async Task UpdatingEmployeeReturnsOkResult()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            EmployeeService employeeService = new EmployeeService(context);

            EmployeeEntity oldEmployeeEntity = new EmployeeEntity { FirstName = "Anna", Email = "asa@fd.ru", Age = 21};
            EmployeeEntity newEmployeeEntity = new EmployeeEntity { FirstName = "Anna", Email = "dddd@fd.ru", Age = 21};

            // Act
            await employeeService.AddAsync(oldEmployeeEntity);
            ResultTypes result = await employeeService.UpdateAsync(newEmployeeEntity.Id, newEmployeeEntity);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, result);
        }
    }
}