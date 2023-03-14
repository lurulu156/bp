using Application.Core;

namespace Application.Scenarios
{
  public class ScenarioParams : PagingParams
  {
    public bool IsHost { get; set; }
    public bool IsAttend { get; set; }
    public DateTime StartDate { get; set; } = DateTime.UtcNow;
  }
}