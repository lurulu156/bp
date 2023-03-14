using System.Text.Json.Serialization;

namespace Application.Profiles
{
  public class UserScenarioDto
  {
    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Category { get; set; }
    public string BPCycle { get; set; }
    public DateTime DueDate { get; set; }

    [JsonIgnore]
    public string HostUsername { get; set; }
  }
}