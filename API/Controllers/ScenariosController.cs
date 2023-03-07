using Application.Scenarios;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class ScenariosController : BaseApiController
  {
    [HttpGet]
    public async Task<ActionResult<List<Scenario>>> GetScenarios()
    {
      return await Mediator.Send(new List.Query());
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Scenario>> GetScenario(Guid id)
    {
      return await Mediator.Send(new Details.Query { Id = id });
    }
    [HttpPost]
    public async Task<IActionResult> CreateScenario(Scenario scenario)
    {
      return Ok(await Mediator.Send(new Create.Command { Scenario = scenario }));
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> EditScenario(Scenario scenario, Guid id)
    {
      scenario.Id = id;
      return Ok(await Mediator.Send(new Edit.Command { Scenario = scenario }));
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteScenario(Guid id)
    {
      return Ok(await Mediator.Send(new Delete.Command { Id = id }));
    }
  }
}