using System.Threading.Tasks;

using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using JiraAnalog.Core;
using JiraAnalog.Core.Models;
using JiraAnalog.Core.Services;

namespace JiraAnalog.Api.Tests
{
    [TestClass]
    public class AuthServiceTests
    {
        [TestMethod]
        public async Task RegisterAccountReturnsOk()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            AuthService authService = new AuthService(context);

            EmployeeEntity accountEntity = new EmployeeEntity {Email = "fffa", Password = "passd"};

            // Act
            ResultTypes result = await authService.RegisterAsync(accountEntity);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, result);
        }

        [TestMethod]
        public async Task RegisterDuplicateAccountReturnsDuplicateResult()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            AuthService authService = new AuthService(context);

            EmployeeEntity accountEntity = new EmployeeEntity {Email = "fffa", Password = "passd"};
            
            // Act
            await authService.RegisterAsync(accountEntity);
            ResultTypes result = await authService.RegisterAsync(accountEntity);

            // Assert
            Assert.AreEqual(ResultTypes.Duplicate, result);
        }

        [TestMethod]
        public async Task LoginWithValidDataReturnsOkResult()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            AuthService authService = new AuthService(context);
            
            EmployeeEntity accountEntity = new EmployeeEntity {Email = "fffa", Password = "passd"};
            LoginEntity loginEntity = new LoginEntity {Email = "fffa", Password = "passd"};

            // Act
            await authService.RegisterAsync(accountEntity);
            AddResult result = await authService.LoginAsync(loginEntity);

            // Assert
            Assert.AreEqual(ResultTypes.Ok, result.ResultType);
        }

        [TestMethod]
        public async Task LoginWithBadDataReturnsInvalidDataResult()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "JiraDB")
                .Options;

            await using var context = new ApplicationDbContext(options);
            AuthService authService = new AuthService(context);
            
            EmployeeEntity accountEntity = new EmployeeEntity {Email = "fffa", Password = "passd"};
            LoginEntity loginEntity = new LoginEntity {Email = "fffa", Password = "asdas"};

            // Act
            await authService.RegisterAsync(accountEntity);
            AddResult result = await authService.LoginAsync(loginEntity);

            // Assert
            Assert.AreEqual(ResultTypes.InvalidData, result.ResultType);
        }
    }
}