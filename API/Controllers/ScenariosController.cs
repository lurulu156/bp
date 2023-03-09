using Application.Core;
using Application.Scenarios;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ScenariosController : BaseApiController
  {
    [HttpGet]
    public async Task<IActionResult> GetScenarios()
    {
      return HandleResult(await Mediator.Send(new List.Query()));
    }
    [HttpGet("{id}")]
    public async Task<IActionResult> GetScenario(Guid id)
    {
      return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
    }
    [HttpPost]
    public async Task<IActionResult> CreateScenario(Scenario scenario)
    {
      return HandleResult(await Mediator.Send(new Create.Command { Scenario = scenario }));
    }
    [Authorize(Policy = "IsScenarioHost")]
    [HttpPut("{id}")]
    public async Task<IActionResult> EditScenario(Scenario scenario, Guid id)
    {
      scenario.Id = id;
      return HandleResult(await Mediator.Send(new Edit.Command { Scenario = scenario }));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteScenario(Guid id)
    {
      return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
    }
    [HttpPost("{id}/attend")]
    public async Task<IActionResult> Attend(Guid id)
    {
      return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
    }
  }
}